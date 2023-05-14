import React, { useEffect, useState } from "react";
// import "../stylesheets/users.css";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import UserItem from "./UserItem";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Modal from "@mui/material/Modal";
import Addform from "./Addform";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "react-query";
import { utils, writeFileXLSX } from "xlsx";
const Users = () => {
  let arr= [
    {
      Name: "",
      Email: "",
      Status: "",
      Role: "",
      LastLogin: new Date('0000/00/00'),
      ImageUrl: "",
    }
  ];
  const [sortedArray,setSortedArray]=useState(sortArrayByAsc(arr, "Name"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = React.useState(0);
  const [sort,setSort]=React.useState("Name");
  const [order,setOrder]=React.useState("asc");
  React.useEffect(()=>{
    sortArray();
  },[order,sort])

  interface UserType {
    Name: string;
    Email: string;
    Status: string;
    Role: string;
    LastLogin: Date;
    ImageUrl:string
  };
  

  function sortArrayByAsc(array: UserType[], field: keyof UserType): UserType[] {
    return array.sort((a, b) =>{
      if(a[field]>b[field])
      return 1;
      else if(a[field]<b[field])
      return -1;
      else
      return 0;
    });
  }
  function sortArrayByDesc(array: UserType[], field: keyof UserType): UserType[] {
    return array.sort((a, b) =>{
      if(a[field]>b[field])
      return -1;
      else if(a[field]<b[field])
      return 1;
      else
      return 0;
    });
  }

  function sortArray():void{
    if(sort==="Name")
    {
      if(order==="asc")
      setSortedArray(sortArrayByAsc(sortedArray, "Name"));
      else
      setSortedArray(sortArrayByDesc(sortedArray, "Name"));
    }
    if(sort==="Role")
    {
      if(order==="asc")
      setSortedArray(sortArrayByAsc(sortedArray, "Role"));
      else
      setSortedArray(sortArrayByDesc(sortedArray, "Role"));
    }
    if(sort==="Status")
    {
      if(order==="asc")
      setSortedArray(sortArrayByAsc(sortedArray, "Status"));
      else
      setSortedArray(sortArrayByDesc(sortedArray, "Status"));
    }
    if(sort==="Date")
    {
      if(order==="asc")
      setSortedArray(sortArrayByAsc(sortedArray, "LastLogin"));
      else
      setSortedArray(sortArrayByDesc(sortedArray, "LastLogin"));
    }
  }
  function sortName(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if(sort==="Name")
    {
      if(order==="asc")
      setOrder("des");
      else
      setOrder("asc")
    }
    else
    {
      setSort("Name");
      setOrder("asc");
    }
    
    sortArray();
  }

  function sortStatus(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if(sort==="Status")
    {
      if(order==="asc")
      setOrder("des");
      else
      setOrder("asc")
    }
    else
    {
      setSort("Status");
      setOrder("asc");

    }
    sortArray();
  }

  function sortRole(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if(sort!=="Role")
    {
      setSort("Role");
      setOrder("asc");
    }
    else
    {
      if(order==="asc")
      setOrder("des");
      else
      setOrder("asc")
      
    }
    sortArray();
  }

  function sortDate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if(sort==="Date")
    {
      if(order==="asc")
      setOrder("des");
      else
      setOrder("asc")
    }
    else
    {
      setSort("Date");
      setOrder("asc");
    }
    sortArray();
  }
  function importData(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
      var xlsx= require("xlsx");
      var ws = xlsx.utils.json_to_sheet(sortedArray);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, "UserDetails.xlsx");
    
  }
  const host="https://company-backend.onrender.com";
  const { isLoading, isError, data, error, refetch } = useQuery("Users",async()=>{
    // API Call 
    const response = await fetch(`${host}/api/Users/getUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
     }
    });
    const json = await response.json()
    setSortedArray(json);
    return json;
  });
  if(isLoading || !data)
  return (<h2>Loading...;</h2>) 
  // setSortedArray(data);
  if(error)
  return (<h2>An Error has Occured</h2>)
  else{
  return (
    <div className="container">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Addform handleClose={handleClose} setSortedArray={setSortedArray} />
      </Modal>
      <div className="cont1">
        <div className="cont2">
          <h3 className="header">Users</h3>
          <span className="header2">
            Manage your team members and their account permissions here
          </span>
        </div>
        <div className="cont3">
          <Button
            variant="outlined"
            startIcon={<CloudDownloadOutlinedIcon />}
            style={{ textTransform: "none" }}
            onClick={importData}
          >
            {" "}
            Download CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            style={{ textTransform: "none" }}
            onClick={handleOpen}
          >
            {" "}
            Add user
          </Button>
        </div>
      </div>
      <div className="cont4">
        <div className="name">
          <Button
            variant="text"
            color="info"
            endIcon={(sort!=="Name")?(<RemoveIcon />):((order==="des")?(<ArrowDownwardIcon/>):(<ArrowUpwardIcon/>))}
            style={{ textTransform: "none", color: "black" }}
            size="small"
            onClick={sortName}
          >
            Name
          </Button>{" "}
        </div>
        <div className="status">
          <Button
            variant="text"
            endIcon={(sort!=="Status")?(<RemoveIcon />):((order==="des")?(<ArrowDownwardIcon/>):(<ArrowUpwardIcon/>))}
            style={{ textTransform: "none", color: "black" }}
            size="small"
            onClick={sortStatus}
          >
            Status
          </Button>
        </div>
        <div className="role">
          {" "}
          <Button
            variant="text"
            endIcon={(sort!=="Role")?(<RemoveIcon />):((order==="des")?(<ArrowDownwardIcon/>):(<ArrowUpwardIcon/>))}
            style={{ textTransform: "none", color: "black" }}
            size="small"
            onClick={sortRole}
          >
            Role
          </Button>
        </div>
        <div className="lastLogin">
          <Button
            variant="text"
            endIcon={(sort!=="Date")?(<RemoveIcon />):((order==="des")?(<ArrowDownwardIcon/>):(<ArrowUpwardIcon/>))}
            style={{ textTransform: "none", color: "black" }}
            size="small"
            onClick={sortDate}
          >
            Last Login
          </Button>
        </div>
        <div className="delete"> </div>
        <div className="edit"> </div>
      </div>
      <div className="userItems">
        {sortedArray.slice(page, page + 5).map((user:any) => {
          return <UserItem user={user} setSortedArray={setSortedArray} sortedArray={sortedArray} />;
        })}
        {/* {data.map((use: any)=>{
          console.log(use);
        })} */}
        
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
      <Pagination count={Math.ceil(sortedArray.length/5)} page={page} 
                    onChange={(event,value)=>{setPage((value-1)*5)}} />
                    </div>
    </div>
  );
      }
};

export default Users;
