import {
    SupabaseClient,
    useSession,
    useSupabaseClient,
} from "@supabase/auth-helpers-react"
import { PostgrestError } from "@supabase/supabase-js"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Category } from "../utils/types"
import CategoryItem from "../components/CategoryItem"
import { useRef } from "react"

type GetCategories = Category[] | PostgrestError

async function getCategories(
    supabase: SupabaseClient<any, "public", any>
): Promise<GetCategories> {
    const { data, error } = await supabase.from("categories").select("id, name")

    if (error) {
        console.error(error)
        return error
    }
    if (!data) return []

    return data
}
async function addCategory(vars: {
    supabase: SupabaseClient<any, "public", any>
    userId: string
    name: string
}) {
    const { supabase, userId, name } = vars
    const newCategory = {
        name,
        user_id: userId,
    }
    const { data, error } = await supabase
        .from("categories")
        .insert(newCategory)
    if (error) {
        console.error(error)
        return
    }
    if (data) {
        console.log(`gb🚀 ~ data:`, data)
    }
}

export default function Categories() {
    const session = useSession()
    const supabase = useSupabaseClient()
    const name = useRef<HTMLInputElement>(null)
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery("categories", () => {
        return getCategories(supabase)
    })
    const mutation = useMutation(addCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories")
        },
    })

    const handleClickAddCategory = () => {
        const userId: string = session?.user.id || ""

        let category = "cat"

        if (name.current) {
            category = name.current.value ? name.current.value : "cat"
        }

        mutation.mutate({ supabase, userId, name: category })
    }

    if (isLoading) return "Loading..."
    if (error) return "An error has occurred: " + JSON.stringify(error)
    if (!Array.isArray(data)) return "Something went wrong."
    if (!data.length) return "There is no category"

    return (
        <div>
            <h2>Add a category</h2>
            <input type="text" name="name" ref={name} />
            <button onClick={handleClickAddCategory}>add category</button>
            <h2>Liste des categories</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    <p>Les data :</p>

                    {data.map(row => (
                        <CategoryItem key={row.id} name={row.name} />
                    ))}
                </ul>
            )}
        </div>
    )
}
