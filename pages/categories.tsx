import useCategories from "@/hooks/useCategories"

export default function Categories() {
    const { data, loading, error } = useCategories()

    return (
        <div>
            {" "}
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
