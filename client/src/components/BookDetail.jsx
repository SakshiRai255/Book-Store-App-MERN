import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Checkbox, FormControlLabel, FormLabel, TextField } from '@mui/material'

function BookDetail() {

  const BASE_URL = "https://book-store-app-mern.vercel.app"
  
  const navigate = useNavigate();
  const id = useParams().id
  const[inputs,setInputs] = useState({});
  const[checked,setChecked] = useState(false);

  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
     }))
  }

  // get the data of Book by id
  const getData = async()=>{
   const result = await axios.get(`${BASE_URL}/books/${id}`)
   const data = await result.data
   return data
  }


// Update the data of Book by id
 const updateData = async()=>{
  const formData  ={
        name:inputs.name,
        description:inputs.description,
        author:inputs.author,
        price:inputs.price,
        image:inputs.image,
        available:checked,  
  }
  const result = await axios.put(`${BASE_URL}/books/${id}`,formData)
  const data = await result.data
  return data
 }
// getData
  useEffect(() => {
    getData().then((data)=>setInputs(data.book))
  }, [id])
  
// Submit 
  const handleSubmit = (e) =>{
  e.preventDefault();
  updateData()
  navigate("/books");
  }

  return (
   <div> 
      {inputs &&( 
       <form onSubmit={handleSubmit}>
         <Box display="flex" flexDirection="column" justifyContent="center" maxWidth={700} alignContent="center" alignSelf="center"margin="auto"marginTop="3y0px">
           <FormLabel>Name</FormLabel>
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
           <Button type='submit' variant='contained' sx={{mt:"22px"}}>Update Book</Button>
         </Box>
       </form>
      )}
    </div>
  )
}

export default BookDetail