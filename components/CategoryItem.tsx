import { useRef } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import useDeleteCategory from "@/hooks/useDeleteCategory"
import useUpdateCategory from "./useUpdateCategory"
import { CategoryItemProps } from "@/utils/types"

function CategoryItem({ name }: CategoryItemProps) {
    const supabase = useSupabaseClient()
    const deleteCategory = useDeleteCategory(name)
    const newName = useRef<HTMLInputElement>(null)

    const updateCategory = useUpdateCategory(name, newName)

    async function handleUpdate() {
        updateCategory()
    }

    return (
        <li>
            <p>{name}</p>
            <button onClick={deleteCategory}>delete</button>

            <input type="text" ref={newName} />
            <button onClick={handleUpdate}>update</button>
        </li>
    )
}
export default CategoryItem
