import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import cls from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Layout = ({ children, storyMode }) => {
  const mainSectionClasses =  cls["mainSection"] + " " + (storyMode ? cls["disable-scroll"] : "");
  const { chatsVisible } = useSelector(state => state.chat);
  const location = useLocation(); 
  const { modal, modalActive } = useSelector(state => state.ui);

  return (
    <>
      {modalActive && modal} 
      <Navbar />
      <div className={mainSectionClasses}>
        {(chatsVisible || !location.pathname.startsWith('/chat/')) && 
          <div className={cls["leftSection"]}>
            <Sidebar />
          </div>
        }
        <div className={cls['rightSection']}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout