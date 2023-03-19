import { Category } from "@/utils/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js"
import { useQuery } from "react-query"

type GetCategories = Category[] | PostgrestError

async function dbGetCategories(
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

function useGetCategories() {
    const supabase = useSupabaseClient()

    const { isLoading, error, data } = useQuery("categories", () => {
        return dbGetCategories(supabase)
    })

    return { isLoading, error, data }
}

export default useGetCategories
