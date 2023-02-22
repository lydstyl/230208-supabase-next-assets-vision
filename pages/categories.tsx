import {
    SupabaseClient,
    useSession,
    useSupabaseClient,
} from "@supabase/auth-helpers-react"
import { PostgrestError } from "@supabase/supabase-js"
import { useQuery, useQueryClient } from "react-query"
import { Category } from "../utils/types"

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
async function addCategory(
    supabase: SupabaseClient<any, "public", any>,
    userId: string,
    name: string
) {
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
async function deleteCategory(
    supabase: SupabaseClient<any, "public", any>,
    name: string // to do change it with id
) {
    const { error } = await supabase
        .from("categories")
        .delete()
        // .eq('id', 11)
        .eq("name", name)
    if (error) {
        console.error(error)
        return
    }
}

export default function Categories() {
    const session = useSession()
    const supabase = useSupabaseClient()

    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery("categories", () => {
        return getCategories(supabase)
    })
    const handleClickAddCategory = () => {
        const userId: string = session?.user.id || ""
        addCategory(supabase, userId, "new category")
    }
    const handleClickDeleteCategory = () => {
        deleteCategory(supabase, "new category")
    }

    queryClient.invalidateQueries("categories")

    if (isLoading) return "Loading..."
    if (error) return "An error has occurred: " + JSON.stringify(error)

    return (
        <div>
            <h2>Add a category</h2>
            <input type="text" name="name" />
            <button onClick={handleClickAddCategory}>add category</button>
            <button onClick={handleClickDeleteCategory}>delete category</button>
            <h2>Liste des categories</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    <p>Les data :</p>
                    {Array.isArray(data)
                        ? data.map(row => <li key={row.id}>{row.name}</li>)
                        : "There is no category"}
                </ul>
            )}
        </div>
    )
}
