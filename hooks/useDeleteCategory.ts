import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useMutation, useQueryClient } from "react-query"
import { Supabase } from "@/utils/types"

type DBDeleteCategory = {
    name: string
    supabase: Supabase
}

async function dbDeleteCategory(variables: DBDeleteCategory) {
    const { supabase, name } = variables
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("name", name)
    if (error) {
        console.error(error)
        return
    }
}

function useDeleteCategory(name: string) {
    const supabase = useSupabaseClient()
    const queryClient = useQueryClient()
    const mutation = useMutation(dbDeleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories")
        },
    })

    const deleteCategory = () => {
        mutation.mutate({ supabase, name })
    }

    return deleteCategory
}

export default useDeleteCategory
