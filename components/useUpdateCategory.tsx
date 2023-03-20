import { RefObject } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { CategoryItemProps, Supabase } from "@/utils/types"

type DBDeleteCategory = CategoryItemProps & {
    supabase: Supabase
    newName: RefObject<HTMLInputElement>
}

async function dbUpdateCategory(variables: DBDeleteCategory) {
    const { supabase, name, newName } = variables
    if (!newName.current) return
    const { data, error } = await supabase
        .from("categories")
        .update({ name: newName.current.value })
        .eq("name", name)
        .select()
    return { data, error }
}

function useUpdateCategory(name: string, newName: RefObject<HTMLInputElement>) {
    const supabase = useSupabaseClient()
    const queryClient = useQueryClient()
    const mutation = useMutation(dbUpdateCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories")
        },
    })

    const updateCategory = () => {
        mutation.mutate({ supabase, name, newName })
    }

    return updateCategory
}

export default useUpdateCategory
