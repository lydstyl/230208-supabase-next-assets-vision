import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "../utils/database.types"

export default function Categories() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>([])
    const supabase = useSupabaseClient<Database>()

    useEffect(() => {
        ;(async function () {
            try {
                const { data, error } = await supabase
                    .from("categories")
                    .select("id, name")

                if (error) console.error(error)

                setData(data)
                setLoading(false)
            } catch (error) {
                console.log(`gb🚀 ~ error`, error)
            }
        })()

        return () => {
            console.log("useEffect clean up return func.")
        }
    }, [])

    return (
        <div>
            <h2>Liste des categories</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    <p>Les data :</p>
                    {data.map(row => (
                        <li key={row.id}>{row.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
