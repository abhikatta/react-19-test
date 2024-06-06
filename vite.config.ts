import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler"],

            // the following is to check for how the app behaves in previous react versions.
            // OR
            // add 'use memo' on top of the component or file to use the new react with compilationMode being anotation
            // basically adding this compilationMode means not having all the code to be memoized automatically, so
            // manual memoization is required

            // [
            //   "babel-plugin-react-compiler",
            //   { compilationMode: "annotation" },
            // ],
          ],
        },
      }),
    ],
  };
});
