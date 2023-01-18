import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Checkbox, FormControlLabel, FormLabel, TextField } from '@mui/material'

function BookDetail() {
  const navigate = useNavigate();
  const id = useParams().id
  const[inputs,setInputs] = useState({});
  const[checked,setChecked] = useState(false);
  const [image, setImage] = useState(null);

  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
     }))
  }

  // get the data of Book by id
  const getData = async()=>{
   const result = await axios.get(`/books/${id}`)
   const data = await result.data
   return data
  }

 // Image Change
  const ImageChange = (event) =>{
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  }


// Update the data of Book by id
 const updateData = async()=>{
  const formData  = new FormData()
        formData.append('name',inputs.name)
        formData.append('description',inputs.description)
        formData.append('author',inputs.author)
        formData.append('price',inputs.price)
        formData.append('available',checked)
        formData.append('image',image)
  const result = await axios.put(`/books/${id}`,formData)
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
           <FormLabel>Image</FormLabel>
           <TextField type="file" onChange={ImageChange} margin="normal" fullWidth variant='outlined' name='image'></TextField>
           <FormControlLabel control={<Checkbox Checked={checked} onChange={()=>setChecked(!checked)}/>} label="Available"/>
           <Button type='submit' variant='contained' sx={{mt:"22px"}}>Update Book</Button>
         </Box>
       </form>
      )}
    </div>
  )
}

export default BookDetail