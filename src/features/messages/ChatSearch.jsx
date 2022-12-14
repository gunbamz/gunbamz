import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatSearch = () => {

  const { onlineUsers }  = useSelector((state) => state.message);
  return (
    <div className="chat-page">
        <h2>Search Staff Online</h2>
        <ul className="chat-page-ul">
            {onlineUsers && onlineUsers.map((user, i) => 
                (
                  <li key={i}>
                    <NavLink key={i} to="/panel/clinics/chat" state={{"chatSearch": user}}>
                      {user.fullName}
                    </NavLink>
                  </li>
                )
              )
            }
        </ul>
    </div>
  )
}

export default ChatSearch;
