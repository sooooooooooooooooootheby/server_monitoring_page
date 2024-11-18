import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { oml2d } from "vite-plugin-oh-my-live2d";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        // oml2d({
        //     models: [
        //         {
        //             path: "/v2a3_310502_zxqe/v2a3_310502_zxqe.model3.json",
        //             position: [-40, 400],
        //             scale: 0.12,
        //         }
        //     ],
        //     tips: {
        //         style: {
        //             display: "none"
        //         },
        //         message: ["你复制了什么内容呢?记得注明出处哦~123"],
        //         idleTips: {
        //             wordTheDay: (wordTheDayData) => {
        //                 return wordTheDayData.hitokoto;
        //             },
        //         },
        //     },
        //     menus: {
        //         disable: true,
        //     }
        // }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
