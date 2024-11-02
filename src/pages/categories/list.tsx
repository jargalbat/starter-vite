import { AntdInferencer } from "@refinedev/inferencer/antd";

export const ListCategories = () => {
  return (
    <AntdInferencer
    // resource="categories" // We're omitting this prop because it's inferred from the route
    // action="list" // We're omitting this prop because it's inferred from the route
    />
  );
};
