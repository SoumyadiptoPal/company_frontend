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
const role = [
  { label: "Admin" },
  { label: "Senior Lead" },
  { label: "Consultant" },
];
const status = [{ label: "Active" }, { label: "Invited" }];
interface UserType {
  Name: string;
  Email: string;
  Status: string;
  Role: string;
  LastLogin: Date;
  ImageUrl:string
};

const Addform = (props: { handleClose: any, setSortedArray:  React.Dispatch<React.SetStateAction<UserType[]>>}) => {
  const { handleClose, setSortedArray } = props;
  const [name, setName] = useState("");
  const [rol, setRol] = useState("");
  const [stat, setStat] = useState("");
  const [email, setEmail] = useState("");
  const [error1, isError1] = useState(false);
  const [error2, isError2] = useState(false);
  const [error3, isError3] = useState(false);
  const [error4, isError4] = useState(false);
  const [image, setImage]=useState<string | ArrayBuffer | null>("");
  const host="https://company-backend.onrender.com";
  const handleSubmit = async () => {
    let flag = true;

    if (name.length == 0) {
      isError1(true);
      flag = false;
    }

    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
      isError2(true);
      flag = false;
    }
    if (rol.length==0) {
      isError4(true);
      flag = false;
    }
    if (stat.length==0) {
      isError3(true);
      flag = false;
    }
let imgStr:string=""
    if(typeof(image)==='string')
      imgStr=image; 
    if (flag) {
      // Adduser
      let User:UserType={
      Name: name,
      Email: email,
      Status: stat,
      Role: rol,
      LastLogin: new Date(),
      ImageUrl: imgStr
      }
      
      let Name= name
      let Email= email
      let Status= stat
      let Role= rol
      let ImageUrl= imgStr
      const response = await fetch(`${host}/api/Users/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Name,Email,Status,Role,ImageUrl})
      });
      setSortedArray(oldArray=>[...oldArray,User]);
      handleClose();
      setName("");
      setEmail("");
      setRol("");
      setStat("");
      setImage("");
      isError1(false);
      isError2(false);
      isError3(false);
      isError4(false);
    }
    
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    
      if(e.target.files && e.target.files[0]){
          var reader=new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload=()=>{
            setImage(reader.result);
          };
          reader.onerror=error=>{
            console.log("Error: ",error);
          }
      }
  }

  return (
    <Box sx={style}>
      <h2>Enter the following details</h2>
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
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        margin="normal"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
        error={error2}
        helperText={error2 ? "Invalid email" : ""}
      />
      <Autocomplete
        disablePortal
        onChange={(event, value) => {
          if (value) setStat(value?.label);
          else setStat("");
        }}
        id="status"
        options={status}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Status" />}
        style={{ margin: "10px 0px" }}
      />
      {error3 ? (
        <span style={{ fontSize: "10px", color: "red" }}>
          * Choose atlest 1
        </span>
      ) : (
        <span></span>
      )}
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
      {error4 ? (
        <span style={{ fontSize: "10px", color: "red" }}>
          * Choose atlest 1
        </span>
      ) : (
        <span></span>
      )}
      <div style={{padding:"10px"}}>
       <input type='file' onChange={handleChange}/>
       </div>
      <Button
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={handleSubmit}
      >
        Add user
      </Button>
    </Box>
  );
};

export default Addform;
