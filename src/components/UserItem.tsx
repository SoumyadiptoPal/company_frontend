import Avatar from '@mui/material/Avatar';
import React, { FC } from 'react'
// import "../stylesheets/userItem.css"
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Modal from '@mui/material/Modal';
import EditForm from './EditForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
type UserType = {
    Name: string,
    Email: string,
    Status: string,
    Role: string,
    LastLogin: Date,
    ImageUrl:string
  };
  interface UserProps {
    user: UserType,
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const UserItem= (props: { user: UserType, setSortedArray:  React.Dispatch<React.SetStateAction<UserType[]>>, sortedArray:UserType[]}): JSX.Element => {
  const {user,setSortedArray, sortedArray}=props;
    function getDate(date:Date):string
    {
      var dt = new Date(date);
      let yyyy = dt.getFullYear();
      let mm = dt.getMonth() + 1; // Months start at 0!
      let dd = dt.getDate();
      let ans:string=yyyy+"/"+mm+"/"+dd;
      return ans;
    }
    const [open, setOpen] = React.useState(false);
    const [open2,setOpen2]= React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
    function getTime(dt:Date):string
    {
      let date=new Date(dt);
      var hr = date.getHours();
      var min = date.getMinutes();
      var ampm = "am";
      if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
      }
      let ans:string=hr+":"+min+" "+ampm;
      if (min < 10) {
        ans=hr+":0"+min+" "+ampm;
      }
      return ans;
    }
    const removeItemByEmail = (email: string, items: UserType[]): UserType[] => {
      return items.filter(item => item.Email !== email);
    };
  async function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    setOpen2(true);
    const host="https://company-backend.onrender.com";
    const response = await fetch(`${host}/api/Users/deleteUser/${user.Email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    setSortedArray(removeItemByEmail(user.Email,sortedArray));
  }
    
    return (
    <div className='Cont4'>
      <div className='avatar'>
        <Avatar
        className='image'
            alt={user.Name}
            src={user.ImageUrl}
            // src='logo.png'
        />
        <div className='details'>
          <div className='userName'>{user.Name}</div>
          <div className='userEmail'>{user.Email}</div>
          </div>

        </div>
        <div className='Status'><div className={(user.Status==="Active")?"active_badge":"inactive_badge"}>&#x2022; {user.Status}</div></div>
        <div className='Role'> {user.Role}</div>
        <div className='LastLogin'>
          <div className='date'>{getDate(user.LastLogin)}</div> 
          <div className='time'>{getTime(user.LastLogin)}</div>
        </div>
        

        <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }}/>
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      User{" "}deleted{" "}successfully
    </Typography>
  </Box>

      </Modal>
        <div className='Delete'><IconButton aria-label="delete" onClick={handleDelete}>
  <DeleteOutlineOutlinedIcon/>
</IconButton></div>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditForm handleClose={handleClose} user={user} sortedArray={sortedArray} setSortedArray={setSortedArray}/>
      </Modal>
        <div className='Edit'>
        <IconButton aria-label="delete" onClick={handleOpen}>
  <EditOutlinedIcon/>
</IconButton>
        </div>
    </div>
    );
  };

export default UserItem