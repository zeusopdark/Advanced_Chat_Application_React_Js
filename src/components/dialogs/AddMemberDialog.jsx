import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampledata";
import UserItems from "../shared/UserItem";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMemberMutation,
  useAvialableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const { isLoading, isError, error, data } = useAvialableFriendsQuery(chatId);
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  const [addMembers, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMemberMutation
  );

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandling = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding members", { members: selectedMembers, chatId });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const errors = [{ isError, error }];
  useErrors(errors);
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          { isLoading?<Skeleton/>:data?.availableFriends.length> 0 ? (
            data?.availableFriends?.map((i) => (
              <UserItems
                key={i.id}
                user={i}
                handler={selectMemberHandling}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button onClick={closeHandler} color="error">
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMember}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
