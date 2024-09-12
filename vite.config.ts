import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import ViteSSGOptions from "vite-ssg";
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts';
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import imageminPlugin from '@macropygia/vite-plugin-imagemin-cache'
import viteCompression from 'vite-plugin-compression';
import Markdown from 'unplugin-vue-markdown/vite'
import autoprefixer from 'autoprefixer'

const hostname = "https://example.com";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: [
        'src/pages',
        {
          src: 'src/docs',
          // override the global extensions to **only** accept markdown files
          extensions: ['.md'],
        },
      ],
      /* options */
    }),
    vue({
      include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      pagesDirs: 'src/pages',
      defaultLayout: 'default'
    }),
    Pages({
      extensions: ['vue', 'md'],
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      headEnabled: true,
      markdownItSetup(md) {
      },
    }),
    imageminPlugin(),
    viteCompression(),
  ],
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        autoprefixer({}),
      ]
    }
  },
  ssgOptions: {
    dirStyle: "nested",
    script: "async",
    formatting: "minify",
    format: "esm",
    onFinished: () => {
      generateSitemap({
        hostname: hostname,
        exclude: []
      })
    },
    crittersOptions: {
      preload: 'media',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
