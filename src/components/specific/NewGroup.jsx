import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampledata";
import UserItem from "../shared/UserItem";
const NewGroup = () => {
  const groupname = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandling = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  };
  console.log(selectedMembers);
  const submitHandler = () => {};
  const closeHandler = () => {};
  return (
    <Dialog open>
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
          {members?.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandling}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="text" color="error" size="large">
            Cancel
          </Button>
          <Button varaiant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
