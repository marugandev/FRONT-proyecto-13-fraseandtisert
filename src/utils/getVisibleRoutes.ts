import type { User } from "../types/auth/user";
import type { RouteItem } from "../types/routes/route-item";
import type { RoutesConfig } from "../types/routes/routes-config";

export const getVisibleRoutes = (
  user: User | null,
  config: RoutesConfig
): RouteItem[] => {
  const { wishListRoute, profileRoutes, adminRoutes } = config;

  const visibleRoutes: RouteItem[] = [wishListRoute];

  if (!user) return visibleRoutes;

  visibleRoutes.push(...profileRoutes);

  if (user.role === "admin") visibleRoutes.push(...adminRoutes);

  return visibleRoutes;
};
