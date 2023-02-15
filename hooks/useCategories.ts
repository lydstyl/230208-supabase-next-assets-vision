import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Category } from "@/utils/types"

export default function useCategories() {
    const supabase = useSupabaseClient()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Category[]>([])

    useEffect(() => {
        ;(async function () {
            try {
                const { data, error } = await supabase
                    .from("categories")
                    .select("id, name")

                if (error) {
                    console.error(error)
                    setError(error + "")
                    return
                }
                if (data) {
                    setData(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(`gb🚀 ~ error`, error)
                setError(error + "")
            }
        })()

        return () => {
            console.log("useEffect clean up return func.")
        }
    }, [supabase])

    return { data, loading, error }
}
