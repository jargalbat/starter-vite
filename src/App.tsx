import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { ListCategories } from "./pages/categories/list";

import { Login } from "./pages/login";

import "antd/dist/reset.css";

export default function App(): JSX.Element {
  return (
    (<BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "protected-products",
                  list: "/products",
                  show: "/products/:id",
                  edit: "/products/:id/edit",
                  create: "/products/create",
                  meta: { label: "Products" },
                },
                {
                  name: "categories",
                  list: "/categories",
                  meta: { label: "Categories" },
                },
              ]}
              options={{
                projectId: "1K8aRi-iuEIbV-In3454"
              }}>
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-routes"
                      redirectOnFail="/login"
                    >
                      <ThemedLayoutV2
                        Title={(props) => (
                          <ThemedTitleV2 {...props} text="Awesome Project" />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={
                      <NavigateToResource resource="protected-products" />
                    }
                  />
                  <Route path="/products">
                    <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<ListCategories />} />
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
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>)
  );
}
