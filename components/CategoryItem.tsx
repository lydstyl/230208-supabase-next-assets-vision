import { SupabaseClient, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useMutation, useQueryClient } from "react-query"

type CategoryItemProps = {
    name: string
}

async function deleteCategory(
    supabase: SupabaseClient<any, "public", any>,
    name: string // to do change it with id ?
) {
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("name", name)
    if (error) {
        console.error(error)
        return
    }
}

function CategoryItem({ name }: CategoryItemProps) {
    const supabase = useSupabaseClient()
    const queryClient = useQueryClient()
    const mutation = useMutation(() => deleteCategory(supabase, name), {
        onSuccess: () => {
            queryClient.invalidateQueries("categories")
        },
    })

    const handleClickDeleteCategory = () => {
        mutation.mutate()
    }

    return (
        <li>
            <p>{name}</p>
            <button onClick={handleClickDeleteCategory}>delete</button>
        </li>
    )
}
export default CategoryItem
