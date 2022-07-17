import React from "react";
import { RootProvider } from "./src/utils/rootContext";
import Layout from "./src/components/Layout";
import "./src/styles/reset.css";

const wrapRootElement = ({ element }) => <RootProvider>{element}</RootProvider>;

const wrapPageElement = ({ element: page, props }) => {
  return <Layout {...props}>{page}</Layout>;
};

export { wrapRootElement, wrapPageElement };
