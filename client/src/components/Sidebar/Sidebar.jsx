import React from 'react'
import cls from "./Sidebar.module.css";
import NewFeeds from "./NewFeeds";
import MorePages from "./MorePages";
import AccountSettings from "./AccountSettings";

const Sidebar = () => {
  return (
      <div className={cls["sidebar"]}>
        <NewFeeds /> 
        <MorePages />
        <AccountSettings />
      </div>
  )
}

export default Sidebar