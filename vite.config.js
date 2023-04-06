import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        collections: resolve(__dirname, "src/views/collections.html"),
        collectionsPage: resolve(__dirname, "src/views/collectionsPage.html"),
        recipeSearch: resolve(__dirname, "src/views/recipeSearch.html"),
        recipeListing: resolve(__dirname, "src/views/recipeListing.html"),
      },
    },
  },
});
