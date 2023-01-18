import React,{useState} from 'react';
import { Button, FormControlLabel, FormLabel, TextField,Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBook() {
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
  const [image, setImage] = useState(null);
  
  // Image Change
  const ImageChange = (event) =>{

    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  }
  // Grabing the input value
  const handleChange = (e)=>{
  setInputs((prevState)=>({
    ...prevState,
    [e.target.name] : e.target.value
   }))
  }

  // function to send the Data

const submitData = async()=>{

   const formData  = new FormData()
         formData.append('name',inputs.name)
         formData.append('description',inputs.description)
         formData.append('author',inputs.author)
         formData.append('price',inputs.price)
         formData.append('available',checked)
         formData.append('image',image)
   const result = await axios.post(`/books/add`,formData)
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
        <FormLabel>Image</FormLabel>
        <TextField type="file" onChange={ImageChange} margin="normal" fullWidth variant='outlined' name='image'></TextField>
        
        <FormControlLabel control={<Checkbox Checked={checked} onChange={()=>setChecked(!checked)}/>} label="Available"/>
        <Button type='submit' variant='contained' sx={{mt:"22px"}}>Add Book</Button>
      </Box>
    </form>
  )
}

export default AddBook