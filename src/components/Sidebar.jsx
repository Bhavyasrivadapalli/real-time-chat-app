import React from "react";
import Navbar from "./navbar";
import Search from "./Search";
import Chats from "./chats";

const Sidebar=()=>{
  return <>
  <div className="sidebar"><Navbar></Navbar>
 <Search></Search>
 <Chats></Chats>
  </div>
  </>
}
export default Sidebar;