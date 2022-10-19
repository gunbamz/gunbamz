import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatRecent = () => {

  const { conversations }  = useSelector((state) => state.message);
  const convLength = conversations.length > 0;

  return (
    <div className="chat-page">
        <h2>Recent Chats</h2>
        {convLength ? (
          <ul className="chat-page-ul">
              {conversations.map((conv, i) => 
                  (
                    <li key={i}>
                      <NavLink key={i} to="/panel/clinics/chat" state={{"chatRecent": conv}}>
                        {conv._id}
                      </NavLink>
                    </li>
                  )
                )
              }
          </ul>
        ) : (
          <div> No conversations yet</div>
        )
      }
    </div>
  )
}

export default ChatRecent;