import { RefObject } from "react"
import { useQueryClient, useMutation } from "react-query"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Supabase } from "@/utils/types"

async function dbAddCategory(vars: {
    supabase: Supabase
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
