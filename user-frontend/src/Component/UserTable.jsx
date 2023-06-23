import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';

import "../Styles/UserTable.css"

const UserTable = () => {
  // states to manage
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("") ;
  const [created_at, setCreated_at] = useState("") ;
  const [downloadLink, setDownloadLink] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  //Mount phase
  useEffect(() => {
    fetchData();
  }, []);

  //Fetching all data
  const fetchData = async () => {
    try {
      const response = await axios.get('https://white-agouti-hem.cyclic.app/fetch/users');
      console.log('response.data:', response.data.Users)
      setUsers(response.data.Users);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  
  // Updating data
  const handleUpdate = async (user) => {
    console.log('user:', user)
    onOpen();
    setId(user._id);
    setName(user.name);
    setEmail(user.email)
    setGender(user.gender)
    setStatus(user.status)
    setCreated_at(user.Created_at)
 
  };


  //save the edited data
  const handleSave = async(e) => {
    e.preventDefault();

    let date =  new Date().toLocaleString();
    
    console.log(date);

    try {
      const obj = {
        name,
        email,
        gender,
        status,
        Created_at:created_at,
        Updated_at:date
      }

      console.log('obj:', obj);

      await axios.put(`https://white-agouti-hem.cyclic.app/update/${id}`,obj);
      onClose();
      window.location.reload();
      alert('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data', error);
    }
   
  }

  //CSV File download
  const csvDownloadFile = () => {
    axios
    .get('https://white-agouti-hem.cyclic.app/csv', { responseType: 'blob' })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log('url:', url)
      setDownloadLink(url);
    })
    .catch((error) => {
      console.error('Error downloading CSV:', error);
    });
  }

 

  return (
    <Box>
      <Heading>Users Details</Heading>
      <div style={{display:'flex', justifyContent:'flex-start', alignItems:'left'}}>
    
       <Button onClick={csvDownloadFile}> <a href={downloadLink} download="users.csv">
       Download File (CSV)
     </a></Button>
      </div>
      <br/>
    <Table variant='striped' colorScheme='teal' size='sm'>
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Gender</Th>
          <Th>Status</Th>
          <Th>Created At</Th>
          <Th>Updated At</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users?.map((user) => (
          <Tr key={user._id}>
            <Td>{user._id}</Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.gender}</Td>
            <Td>{user.status}</Td>
            <Td>{user.Created_at}</Td>
            <Td>{user.Updated_at}</Td>
            <Td>
              <Button onClick={() => handleUpdate(user)}>Update</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>

    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Data</ModalHeader>
          <ModalCloseButton />
          <form id="editForm" onSubmit={handleSave}> 
              <div>
              <label>Name :</label>
              <input ref={initialRef} placeholder='Name' id='name' value={name} onChange={(e)=> setName(e.target.value)}/>
              </div>
              <br/>
              <div>
              <label>Email : </label>
              <input ref={initialRef} placeholder='Email'  id='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
              </div>
              <br/>
              <div>
            <label>Gender : </label>
            <select placeholder='Select gender ' id='gender' value={gender} onChange={(e)=> setGender(e.target.value)}>
               <br/>
            <option value=''>Select Gender</option>
              <option value='female'>Male</option>
              <option value='male'>Male</option>
            </select>
            </div>
            <br/>
            <div>
            <label>Status : </label>
            <select placeholder='Select Status' id='status' value={status} onChange={(e)=> setStatus(e.target.value)}>
              
            <option value=''>Select Status</option>
              <option value='active'>Active</option>
              <option value='inactive'>InActive</option>
            </select>
            </div>
            <br/>
            <div id='divSave'>
            <input id="editBtn" type="submit" value="Save"></input>
            <Button onClick={onClose}>Cancel</Button>
            </div>
          </form>
          <br/>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserTable;
