import type { RouteItem } from "../types/routes/route-item";

export const wishListRoute: RouteItem = {
  path: "/wish-list",
  label: "🖤 Lista de deseos"
};

export const profileRoutes: RouteItem[] = [
  {
    path: "/profile",
    label: "Mi perfil"
  },
  {
    path: "/my-orders",
    label: "📦 Mis pedidos"
  }
];
