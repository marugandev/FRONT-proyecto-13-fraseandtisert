import type { ReactNode } from "react";

import { ModalProvider } from "../context/Modal/ModalProvider";
import { AuthProvider } from "../context/Auth/AuthProvider";
import { CartProvider } from "../context/Cart/CartProvider";
import { FavoritesProvider } from "../context/Favorites/FavoritesProvider";
import { ScrollLockProvider } from "../context/ScrollLock/ScrollLockProvider";
import OrderProvider from "../context/order/OrderProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ModalProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <FavoritesProvider>
              <ScrollLockProvider>{children}</ScrollLockProvider>
            </FavoritesProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ModalProvider>
  );
};

export default Providers;
