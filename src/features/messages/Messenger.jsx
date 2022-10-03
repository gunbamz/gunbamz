import { useCallback, useEffect, useRef } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ChatSearch from "./ChatSearch";
import ChatCurrent from "./ChatCurrent";
import ChatRecent from "./ChatRecent"; 
import { io } from "socket.io-client";
import {
   useSendMessageMutation,
   useGetConversationsMutation,
   } from './messageApiSlice';
import "./Messenger.css";
import { useDispatch, useSelector } from "react-redux";
import { setMessenger } from "../../redux/modeRedux";
import { setNewMessage, setOnlineUsers, setConversations, setReceiver, setArrival } from "./messageSlice";

const Messenger = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const { arrivalMessage, senderCounter, currentChat, newMessage, messages } = useSelector((state) => state.message);
    const socket = useRef();
    const [sendMessage, { isLoading }] = useSendMessageMutation();
    const [getConversations] = useGetConversationsMutation();
    console.log(isLoading);
    const handleSubmit = useCallback(
      async (e) => {
        const message = {
          sender: currentUser._id,
          text: newMessage,
          conversationId: currentChat?._id,
        };
        const receiverId = currentChat?.members.find(
          (member) => member !== currentUser._id
        );
        try {
          const res = await sendMessage(message).unwrap();
          dispatch(setArrival(res.data));
          socket.current.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId,
            text: newMessage,
          });
          dispatch(setNewMessage(""));
        } catch (err) {
          console.log(err);
        }
      },
      [currentChat, currentUser, sendMessage, newMessage, dispatch]
    );
  
    useEffect(() => {
      const users = [];
      socket.current = io("ws://localhost:5000", {
        withCredentials: true,
      });
      socket.current.emit("addUser", currentUser._id);
      socket.current.on("getUsers", (socUser) => {
        let temp =  users.filter((f) => socUser.some((u) => u.userId === f._id));
        dispatch(setOnlineUsers(temp));
      });
      socket.current.on("getMessage", (data) => {
        console.log("getmessag");
        dispatch(setArrival({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        }))
      });
      return () => {
          if (socket.current) {
              socket.current.disconnect();
              dispatch(setMessenger(false));
          }
      }
    }, [currentUser._id, dispatch]);

    useEffect(() => {
      let isMounted = true;
      const getConv = async () => {
          try {
            const res = await getConversations(currentUser._id).unwrap();
              isMounted && dispatch(
                setConversations(res.data)
              );
            } catch (err) {
                console.log(err.response);
                //Navigate("/login", { replace: true });
            }
      }
      getConv(); 
      
      return () => {
          isMounted = false;
      }
    }, [currentUser._id, getConversations, dispatch]); 
    
    useEffect(() => {
      currentChat && handleSubmit();
    }, [senderCounter, currentChat, handleSubmit]);

    useEffect(() => { 
    const temp = [...messages, arrivalMessage];
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        dispatch(setReceiver(temp));
        dispatch(setArrival(null));
    }, [arrivalMessage, currentChat, dispatch, messages]);

    return (
        <div className="chat__wrapper">
           <ul className="chat-links">
              <li className="chat-link">
                  <NavLink className={(navData) => navData.isActive ? "active" : "" } to="recent">
                      Recent
                  </NavLink>
              </li>
              <li className="chat-link">
                  <NavLink className={(navData) => navData.isActive ? "active" : "" } to="chat">
                     Chat
                  </NavLink>
              </li>
              <li className="chat-link">
                  <NavLink className={(navData) => navData.isActive ? "active" : "" } to="search">
                    Search
                  </NavLink>
              </li>
            </ul>
            <Routes>
              {/* messenger routes */}
              <Route index element={<ChatRecent />} /> 
              <Route path="recent" element={<ChatRecent />} />
              <Route path="chat" element={<ChatCurrent />} />
              <Route path="search" element={<ChatSearch />} />
            </Routes>
        </div>
    )
}

export default Messenger;