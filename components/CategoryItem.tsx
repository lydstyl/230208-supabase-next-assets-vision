import useDeleteCategory from "@/hooks/useDeleteCategory"

type CategoryItemProps = {
    name: string
}

function CategoryItem({ name }: CategoryItemProps) {
    const deleteCategory = useDeleteCategory(name)

    return (
        <li>
            <p>{name}</p>
            <button onClick={deleteCategory}>delete</button>
        </li>
    )
}
export default CategoryItem
