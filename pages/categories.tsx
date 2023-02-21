import useCategories from "@/hooks/useCategories"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Category } from "@/utils/types"

export default function Categories() {
    const { data, loading, error } = useCategories() // to get categories

    const session = useSession()
    const supabase = useSupabaseClient()

    const handleClickAddCategory = () => {
        ;(async function () {
            try {
                const newCategory = {
                    name: "new cat",
                    user_id: session?.user.id,
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
            } catch (error) {
                console.log(`gb🚀 ~ error`, error)
            }
        })()
    }

    const handleClickDeleteCategory = () => {
        ;(async function () {
            try {
                const { error } = await supabase
                    .from("categories")
                    .delete()
                    // .eq('id', 11)
                    .eq("name", "new cat")

                if (error) {
                    console.error(error)
                    return
                }
                if (data) {
                    console.log(`gb🚀 ~ data:`, data)
                }
            } catch (error) {
                console.log(`gb🚀 ~ error`, error)
            }
        })()
    }

    return (
        <div>
            <h2>Add a category</h2>
            <input type="text" name="name" />
            <button onClick={handleClickAddCategory}>add category</button>
            <button onClick={handleClickDeleteCategory}>delete category</button>
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
            )}{" "}
        </div>
    )
}
