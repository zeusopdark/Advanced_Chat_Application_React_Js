import { useInfiniteScrollTop } from "6pp";
import { AttachFile, Send } from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayOut from "../components/layout/AppLayOut";
import { TypingLoader } from "../components/layout/Loaders";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponent";
import { grayColor, orange } from "../constants/color";
import { Alert, New_Message, Start_Typing, Stop_Typing } from "../constants/event";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../socket";
import { useNavigate } from "react-router-dom";
const Chat = ({ chatId }) => {
  const navigate=useNavigate();
  const disptach = useDispatch();
  const containerRef = useRef(null);
  const { _id, name } = useSelector((state) => state.auth.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fielMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const bottomRef = useRef(null);

  const myUser = { _id, name };
  const socket = getSocket();

  const oldeMessagesChunk = useGetMessagesQuery({ chatId, page });
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId }); ///if the chatId is not present it will not run this will simply skip it

  const members = chatDetails?.data?.chat?.members;
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldeMessagesChunk.isError, error: oldeMessagesChunk.error },
  ];

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldeMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldeMessagesChunk?.data?.messages
  );

  const allMessages = [...oldMessages, ...messages];

  const handleFileOpen = (e) => {
    disptach(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    //emmiting message to the server
    socket.emit(New_Message, { chatId, members, message });
    setMessage("");
  };
  const startTypingListener = useCallback(
    (data) => {
      if(data.chatId!==chatId)return;
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if(data.chatId!==chatId)return;
      setUserTyping(false);
    },
    [chatId]
  );
  const newMessageHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  ); //to stop this function from recreating again and again when the component rerender we use usecallBack here
  const alertListner=useCallback((data)=>{
    if (data.chatId !== chatId) return;
    const messageForAlert={
      content:data,
      sender:{
        _id:"adadads",
        name:"Admin"
      },
      chat:chatId,
      createdAt:new Date().toISOString(),
    }
    setMessage(prev=>[...prev,messageForAlert])
  },[chatId])


  const eventHandler = {
    [Alert]:alertListner,
    [New_Message]: newMessageHandler,
    [Start_Typing]: startTypingListener,
    [Stop_Typing]: stopTypingListener,
  };
  useSocketEvents(socket, eventHandler);

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(Start_Typing, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(Stop_Typing, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  useEffect(() => {
    //as we want that this only runs after another mount not the initial one
    disptach(removeNewMessagesAlert(chatId));
    return () => {
      setMessage("");
      setMessages([]);
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"});
  }, [messages]);

  useErrors(errors);
  useEffect(()=>{
    if(!chatDetails.data?.chat){
      return navigate("/");
    }
  })
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={myUser} />
        ))}
        <div ref={bottomRef}>{userTyping && <TypingLoader />}</div>
      </Stack>
      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFile />
          </IconButton>

          <InputBox
            placeholder="Send Messages"
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": { bgcolor: "error.dark" },
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchoree1={fielMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayOut()(Chat);
