import { useTable, useMany, useNavigation } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQuery: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const { show, edit } = useNavigation();

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

  const getSorter = (field: string) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);

    if (sorter) {
      return sorter.order;
    }
  };

  const onSort = (field: string) => {
    const sorter = getSorter(field);
    setSorters(
      sorter === "desc"
        ? []
        : [
            {
              field,
              order: sorter === "asc" ? "desc" : "asc",
            },
          ],
    );
  };

  // const indicator = { asc: "⬆️", desc: "⬇️" };
  const indicator: { asc: string; desc: string; default: string } = {
    asc: "⬆️",
    desc: "⬇️",
    default: "",
  };

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>
              ID {indicator[getSorter("id") ?? "default"]}
            </th>
            <th onClick={() => onSort("name")}>
              Name {indicator[getSorter("name") ?? "default"]}
            </th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material") ?? "default"]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price") ?? "default"]}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (
            <tr key={product.id ?? "default-id"}>
              <td>{product.id ?? "N/A"}</td>
              <td>{product.name}</td>
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id === product.category?.id,
                  )?.title
                }
              </td>
              <td>{product.material}</td>
              <td>{product.price}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    show("protected-products", product.id ?? "default-id")
                  }
                >
                  Show
                </button>
                <button
                  type="button"
                  onClick={() =>
                    edit("protected-products", product.id ?? "default-id")
                  }
                >
                  Edit
                </button>
              </td>
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
