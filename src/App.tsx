import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { ThemedLayoutV2 } from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

import "antd/dist/reset.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                  <Route index element={<ListProducts />} />
                  <Route path=":id" element={<ShowProduct />} />
                  <Route path=":id/edit" element={<EditProduct />} />
                  <Route path="create" element={<CreateProduct />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="protected-products" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}