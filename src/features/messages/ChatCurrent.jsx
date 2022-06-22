import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMessageMutation } from './messageApiSlice';
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import { setSenderMessage, setCounter, setNewMessage, setCurrentChat } from "./messageSlice";


const ChatCurrent = () => {
  const [getMessages, getTwoConversation, createConversation, { isLoading }] = useMessageMutation();
  console.log(isLoading);
  const scrollRef = useRef();
  const location = useLocation();
  const [text, setText] = useState("");
  const dispatch = useDispatch(); 
  const { currentUser }  = useSelector((state) => state.user);
  let { messages, currentChat } = useSelector((state) => state.message);

  const handleSend = async (e) => {
    e.preventDefault();
    dispatch(setNewMessage(text));
    dispatch(setCounter(1));
    setText("");
  };
  const handleNav = (e) => {
    e.preventDefault();
    console.log("navigated");
    
  };
  useEffect(() => {
      const onlineUserObj = location.state?.chatSearch;
      const conversationObj = location.state?.chatRecent;
      let isMounted = true;
      const createConv = async () => {
          try {
            const res = await createConversation({ senderId: currentUser._id, receiverId: onlineUserObj._id}).unwrap();
              isMounted && dispatch(
                setCurrentChat(res.data)
              );
            } catch (err) {
                console.log(err.response);
            }
      }
      const getTwoConv = async () => {
        try {
          const res = await getTwoConversation(`${conversationObj.members[0]}/${conversationObj.members[1]}`).unwrap();
            isMounted && dispatch(
              setCurrentChat(res.data)
            );
          } catch (err) {
              console.log(err.response);
          }
      }
      const getMes = async () => {
        try {
          const res = await getMessages(conversationObj._id).unwrap();
            isMounted && dispatch(
              setSenderMessage(res.data)
            );
        } catch (err) {
            console.log(err.response);
        }
      }
      onlineUserObj && createConv(); 
      conversationObj && getTwoConv(); 
      conversationObj && getMes();
  
      return () => {
          isMounted = false;
      }
      
  }, [createConversation, getMessages, getTwoConversation, currentUser._id, dispatch, location]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatBox">
        {currentChat ? (
          <>
            <div className="chatBoxTop">
              {messages.map((m, i) => (
                <div key={i} ref={scrollRef}>
                  <Message key={i} message={m} own={m.sender === currentUser._id} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setText(e.target.value)} 
                value={text ? text : ""}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSend}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div>
            <span className="noConversationText">
            Open a conversation to start a chat.
            </span>
            <button className="chatSubmitButton" onClick={handleNav}>
            open
          </button>
          </div>
        )}
    </div>
  )
}

export default ChatCurrent;