import "./App.css";

import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/templates/MainLayout/MainLayout";
import Home from "./components/pages/Home/Home";
import Collection from "./components/pages/Collection/Collection";
import Product from "./components/pages/Product/Product";
import FAQs from "./components/pages/FAQs/FAQs";
import Contact from "./components/pages/Contact/Contact";
import WishList from "./components/pages/WishList/WishList";
import Auth from "./components/pages/Auth/Auth";
import NotFound from "./components/pages/NotFound/NotFound";
import ScrollTop from "./components/atoms/ScrollTop";
import Profile from "./components/pages/Profile/Profile";
import Admin from "./components/pages/Admin/Admin";
import MyOrders from "./components/pages/MyOrders/MyOrders";
import AdminOrders from "./components/pages/AdminOrders/AdminOrders";

function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="/collection">
            <Route index element={<Collection />} />
            <Route path=":category" element={<Collection />} />
            <Route path=":category/:productSlug" element={<Product />} />
          </Route>

          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/wish-list" element={<WishList />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/admin/users" element={<Admin />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
