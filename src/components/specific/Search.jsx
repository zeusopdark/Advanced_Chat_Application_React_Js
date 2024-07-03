import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
const Search = () => {
  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend request...", { userId: id });
  };
  const handleClose = () => {
    dispatch(setIsSearch(false));
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err));
    }, 1000);
    return () => {
      // cleanup function when again the useEffect will run the first thing is that this cleanup function will run first
      clearTimeout(timeoutId);
    };
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={handleClose}>
      <Stack p={"2rem"} width={"25rem"} direction={"column"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users?.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
