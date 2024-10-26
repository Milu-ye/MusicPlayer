// vite.config.js
import { fileURLToPath, URL } from "node:url";
import Icons from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/unplugin-icons/dist/resolver.js";
import { defineConfig } from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import AutoImport from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///D:/Frontend/%E4%BB%BF%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon"
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ["ep"]
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxGcm9udGVuZFxcXFxcdTRFRkZcdTk3RjNcdTRFNTBcdTY0QURcdTY1M0VcdTU2NjhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEZyb250ZW5kXFxcXFx1NEVGRlx1OTdGM1x1NEU1MFx1NjRBRFx1NjUzRVx1NTY2OFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovRnJvbnRlbmQvJUU0JUJCJUJGJUU5JTlGJUIzJUU0JUI5JTkwJUU2JTkyJUFEJUU2JTk0JUJFJUU1JTk5JUE4L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlSnN4KCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIHByZWZpeDogJ0ljb24nXG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcbiAgICAgICAgICBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0pLFxuICAgIEljb25zKHtcbiAgICAgIGF1dG9JbnN0YWxsOiB0cnVlXG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFIsU0FBUyxlQUFlLFdBQVc7QUFDalUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFUNkcsSUFBTSwyQ0FBMkM7QUFXbE0sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1QsV0FBVztBQUFBLFFBQ1Qsb0JBQW9CO0FBQUEsUUFDcEIsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQSxRQUNULG9CQUFvQjtBQUFBLFFBQ3BCLGNBQWM7QUFBQSxVQUNaLG9CQUFvQixDQUFDLElBQUk7QUFBQSxRQUMzQixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
