import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: "named",
          ref: true,
          svgo: true,
          titleProp: true,
        },
        include: "**/*.svg",
      }),
    ],
    server: {
      // CarbonSutra returns Access-Control-Allow-Origin: https://carbonsutra.com, so the
      // browser cannot call it directly. Credentials are attached here, server-side.
      proxy: {
        "/carbonsutra": {
          target: "https://carbonsutra1.p.rapidapi.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/carbonsutra/, ""),
          headers: {
            "X-RapidAPI-Key": env.VITE_RAPID_API_KEY,
            "X-RapidAPI-Host": env.VITE_RAPID_API_HOST,
            Authorization: `Bearer ${env.VITE_RAPID_API_AUTHORIZATION}`,
          },
        },
      },
    },
  };
});
