import { useRef } from "react"
import useGetCategories from "@/hooks/useGetCategories"
import useAddCategory from "@/hooks/useAddCategory"
import CategoryItem from "../components/CategoryItem"

export default function Categories() {
    const { isLoading, error, data } = useGetCategories()
    const name = useRef<HTMLInputElement>(null)
    const addCategory = useAddCategory()

    if (isLoading) return "Loading..."
    if (error) return "An error has occurred: " + JSON.stringify(error)
    if (!Array.isArray(data)) return "Something went wrong."
    if (!data.length) return "There is no category"

    return (
        <div>
            <h2>Add a category</h2>
            <input type="text" name="name" ref={name} />
            <button onClick={() => addCategory(name)}>add category</button>

            <h2>Liste des categories</h2>
            {
                <ul>
                    {data.map(row => (
                        <CategoryItem key={row.id} name={row.name} />
                    ))}
                </ul>
            }
        </div>
    )
}
