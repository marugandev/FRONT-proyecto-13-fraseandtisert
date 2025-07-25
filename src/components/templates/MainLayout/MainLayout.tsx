import "./MainLayout.css";

import Header from "../../organisms/Header/Header";
import { Outlet } from "react-router-dom";
import SuscribeForm from "../../molecules/SuscribeForm/SuscribeForm";
import Footer from "../../organisms/Footer/Footer";
import Modal from "../../molecules/Modal/Modal";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <SuscribeForm />
      <Footer />
      <Modal />
    </>
  );
};

export default MainLayout;
