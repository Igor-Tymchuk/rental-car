import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Outlet />
    </div>
  );
};
export default Layout;
