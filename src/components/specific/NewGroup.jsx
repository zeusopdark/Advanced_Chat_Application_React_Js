import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampledata";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvialableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
const NewGroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);
  const [newGroup, newGroupLoading] = useAsyncMutation(useNewGroupMutation);
  const { isError, isLoading, error, data } = useAvialableFriendsQuery();
  const groupname = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);
  const selectMemberHandling = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupname.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("Atleast 2 members are required ");
    newGroup("Creating New Group...",{ name: groupname.value, members: selectedMembers });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} spacing={"2rem"} width={"25rem"}>
        <DialogTitle textAlign={"center"} variant={"h4"}>
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupname.value}
          onChange={groupname.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandling}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            varaiant="contained"
            size="large"
            onClick={submitHandler}
            disabled={newGroupLoading}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
