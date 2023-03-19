import { RefObject } from "react"
import { useQueryClient, useMutation } from "react-query"
import {
    SupabaseClient,
    useSession,
    useSupabaseClient,
} from "@supabase/auth-helpers-react"

async function dbAddCategory(vars: {
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

function useAddCategory() {
    const queryClient = useQueryClient()
    const session = useSession()
    const supabase = useSupabaseClient()

    const mutation = useMutation(dbAddCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories")
        },
    })

    const addCategory = (name: RefObject<HTMLInputElement>) => {
        const userId: string = session?.user.id || ""
        let category = "new category"

        if (name.current) {
            category = name.current.value ? name.current.value : "cat"
            name.current.value = ""
        }

        mutation.mutate({ supabase, userId, name: category })
    }

    return addCategory
}

export default useAddCategory
