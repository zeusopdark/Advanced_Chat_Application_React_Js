import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useErrors, useSocketEvents } from "../../../src/hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  setIsDeleteMenu,
  setIsMobileMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import {
  New_Message_Alert,
  New_Request,
  Online_Users,
  Refetch,
} from "../../constants/event";
import {
  incrementNotification,
  setNewMessagesALert,
} from "../../redux/reducers/chat";
import { getSocket } from "../../socket";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import { useRef } from "react";
const AppLayOut = () => (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const socket = getSocket();

    const chatId = params.chatId;
    const deleteMenuAnchor = useRef();

    const [onlineUsers, setOnlineUsers] = useState([]);

    const { user } = useSelector((state) => state.auth);
    const { isMobileMenu } = useSelector((state) => state.misc);
    const { newMessageAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: New_Message_Alert, value: newMessageAlert });
    }, [newMessageAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = async () => {
      dispatch(setIsMobileMenu(false));
    };

    const newMessageAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesALert(data));
      },
      [chatId]
    );

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUserListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [New_Message_Alert]: newMessageAlertHandler,
      [New_Request]: newRequestHandler,
      [Refetch]: refetchListener,
      [Online_Users]: onlineUserListener,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessageAlert}
              onlineUser={onlineUsers}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessageAlert}
                onlineUser={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.75)",
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayOut;
