import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
    const {
        tableQuery: { data, isLoading },
        current,
        setCurrent,
        pageCount,
        sorters,
        setSorters
    } = useTable({
        resource: "products",
        pagination: { current: 1, pageSize: 10 },
        sorters: { initial: [{ field: "id", order: "asc" }] },
    });

    const { data: categories } = useMany({
        resource: "categories",
        ids: data?.data?.map((product) => product.category?.id) ?? [],
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const onPrevious = () => {
        if (current > 1) {
            setCurrent(current - 1);
        }
    };

    const onNext = () => {
        if (current < pageCount) {
            setCurrent(current + 1);
        }
    };

    const onPage = (page: number) => {
        setCurrent(page);
    };

    // We'll use this function to get the current sorter for a field.
    const getSorter = (field: string): "asc" | "desc" | undefined => {
        const sorter = sorters?.find((sorter) => sorter.field === field);
        return sorter ? sorter.order : undefined;
    };

    // We'll use this function to toggle the sorters when the user clicks on the table headers.
    const onSort = (field: string) => {
        const sorter = getSorter(field);
        setSorters(
            sorter === "desc" ? [] : [
                {
                    field,
                    order: sorter === "asc" ? "desc" : "asc",
                },
            ]
        );
    }

    // We'll use this object to display visual indicators for the sorters.
    const indicator = { asc: "⬆️", desc: "⬇️" };


    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => onSort("id")}>
                            ID {indicator[getSorter("id") as "asc" | "desc"] ?? ""}
                        </th>
                        <th onClick={() => onSort("name")}>
                            Name {indicator[getSorter("name") as "asc" | "desc"] ?? ""}
                        </th>
                        <th>Category</th>
                        <th onClick={() => onSort("material")}>
                            Material {indicator[getSorter("material") as "asc" | "desc"] ?? ""}
                        </th>
                        <th onClick={() => onSort("price")}>
                            Price {indicator[getSorter("price") as "asc" | "desc"] ?? ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                                {
                                    categories?.data?.find(
                                        (category) => category.id == product.category?.id,
                                    )?.title
                                }
                            </td>
                            <td>{product.material}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button type="button" onClick={onPrevious}>
                    {"<"}
                </button>
                <div>
                    {current - 1 > 0 && (
                        <span onClick={() => onPage(current - 1)}>{current - 1}</span>
                    )}
                    <span className="current">{current}</span>
                    {current + 1 < pageCount && (
                        <span onClick={() => onPage(current + 1)}>{current + 1}</span>
                    )}
                </div>
                <button type="button" onClick={onNext}>
                    {">"}
                </button>
            </div>
        </div>
    );
};