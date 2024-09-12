// src/types/vue-cookie-accept-decline.d.ts
declare module 'vue-cookie-accept-decline' {
  const content: any;
  export default content;
}
declare module 'virtual:generated-layouts' {
  import type { Router, RouteRecordRaw } from 'vue-router'
  // need any here due to different types for vue-router versions
  export function createGetRoutes(router: Router | any, withLayout?: boolean): () => RouteRecordRaw[]
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}