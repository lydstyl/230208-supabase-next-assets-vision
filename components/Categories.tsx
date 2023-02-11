import { useState, useEffect } from "react"
import {
    useUser,
    useSupabaseClient,
    Session,
} from "@supabase/auth-helpers-react"
import { Database } from "../utils/database.types"
import { log } from "console"

export default function Categories() {
    const supabase = useSupabaseClient<Database>()
    // const user = useUser()
    const [loading, setLoading] = useState(true)

    const [data, setData] = useState<any[]>([])
    // const [username, setUsername] = useState<Profiles["username"]>(null)
    // const [website, setWebsite] = useState<Profiles["website"]>(null)

    useEffect(() => {
        async function gett() {
            try {
                const { data, error } = await supabase.from("profiles").select()
                if (error) {
                    console.log(`gb🚀 ~ gett ~ error`, error)
                }

                return data
            } catch {}
        }

        gett()
            .then(data => {
                console.log(`gb🚀 ~ .then ~ data`, data)
                setData(data)
            })
            .catch(console.error)

        setLoading(false)

        return () => {
            console.log("useEffect clean up return func.")
        }
    }, [])

    return (
        <div>
            <p>Liste des categories:</p>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    Les data:{" "}
                    {data.map(row => (
                        <p key={row.id}>{row.id}</p>
                    ))}
                </div>
            )}
        </div>
    )
}
