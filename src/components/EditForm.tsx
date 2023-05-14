import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  type UserType = {
    Name: string,
    Email: string,
    Status: string,
    Role: string,
    LastLogin: Date,
    ImageUrl:string
  };
  const role = [
    { label: "Admin" },
    { label: "Senior Lead" },
    { label: "Consultant" },
  ];
const EditForm = (props: {handleClose:any, user: UserType, sortedArray:UserType[], setSortedArray:  React.Dispatch<React.SetStateAction<UserType[]>>}) => {
 const {handleClose, user, sortedArray, setSortedArray}=props;
    const [name, setName] = useState(user.Name);
    const [rol,setRol]=useState("");
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        let flag = true;

    if (name.length == 0) {
      setError1(true);
      flag = false;
    }
    if (rol.length==0) {
      setError2(true);
      flag = false;
    }
    if(flag)
    {
      const host="https://company-backend.onrender.com";
      let Name=name,Role=rol;
      const response= await fetch(`${host}/api/Users/editUser/${user.Email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Name,Role})
      });
        setSortedArray(updateItemById(user.Email, sortedArray));
        handleClose();
        setRol("");
    }
    }
    const updateItemById = (email:string, items: UserType[]): UserType[] => {
      return items.map(item => {
        if (item.Email === email) {
          return {
            ...item,
            Name: name,
            Role: rol
          };
        } else {
          return item;
        }
      });
    };
    

    return (
        <Box sx={style}>
          <h2>Edit Details</h2>
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            error={error1}
            helperText={error1 ? "Empty Text" : ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          />
          <Autocomplete
        disablePortal
        id="role"
        onChange={(event, value) => {
          if (value) setRol(value?.label);
          else setRol("");
        }}
        options={role}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Role" />}
        style={{ margin: "10px 0px" }}
      />
      {error2 ? (
        <span style={{ fontSize: "10px", color: "red" }}>
          * Choose atlest 1
        </span>
      ) : (
        <span></span>
      )}
          <div>
          <Button
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={handleSubmit}
      >
        Edit user
      </Button>
      </div>
          </Box>
  )
}

export default EditForm