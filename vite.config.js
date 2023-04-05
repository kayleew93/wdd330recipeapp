import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        collections: resolve(__dirname, "src/collections.html"),
        collectionsPage: resolve(__dirname, "src/collectionsPage.html"),
        recipeSearch: resolve(__dirname, "src/recipeSearch.html"),
        recipeListing: resolve(__dirname, "src/recipeListing.html"),
      },
    },
  },
});
