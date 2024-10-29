import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}