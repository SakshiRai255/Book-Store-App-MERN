import React,{useState} from 'react';
import { Button, FormControlLabel, FormLabel, TextField,Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBook() {

  const BASE_URL = "https://book-store-app-mern.vercel.app"

  const intialState = {
    name:"",
    description:"",
    author:"",
    price:"",
    available:false,
    image:""
  }
  const navigate = useNavigate();
  const[inputs,setInputs] = useState({intialState});
  const[checked,setChecked] = useState(false);
  
 
  // Grabing the input value
  const handleChange = (e)=>{
  setInputs((prevState)=>({
    ...prevState,
    [e.target.name] : e.target.value
   }))
  }

  // function to send the Data

const submitData = async()=>{

   const formData  = {
         name:inputs.name,
         description:inputs.description,
         author:inputs.author,
         price:inputs.price,
         available:checked,
         image:inputs.image,
   }
   const result = await axios.post(`${BASE_URL}/books/add`,formData)
   const data = await result.data
   return data
  }


  // Submit Function
  const handleSubmit = (e)=>{
    e.preventDefault()
    submitData().then((data)=>console.log(data))
    navigate("/books")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" justifyContent="center" maxWidth={700} alignContent="center" alignSelf="center"margin="auto"marginTop="30px">
        <FormLabel>Book Name</FormLabel>
        <TextField value={inputs.name} onChange={handleChange} margin="normal" fullWidth variant='outlined' name='name'></TextField>
        <FormLabel>Author</FormLabel>
        <TextField value={inputs.author} onChange={handleChange} margin="normal" fullWidth variant='outlined' name='author'></TextField>
        <FormLabel>Description</FormLabel>
        <TextField value={inputs.description} onChange={handleChange} margin="normal" fullWidth variant='outlined' name='description'></TextField>
        <FormLabel>Price</FormLabel>
        <TextField value={inputs.price} onChange={handleChange} type="number" margin="normal" fullWidth variant='outlined' name='price'></TextField>
        <FormLabel>Image URL</FormLabel>
        <TextField value={inputs.image} onChange={handleChange} margin="normal" fullWidth variant='outlined' name='image'></TextField>
        
        <FormControlLabel control={<Checkbox Checked={checked} onChange={()=>setChecked(!checked)}/>} label="Available"/>
        <Button type='submit' variant='contained' sx={{mt:"22px"}}>Add Book</Button>
      </Box>
    </form>
  )
}

export default AddBook