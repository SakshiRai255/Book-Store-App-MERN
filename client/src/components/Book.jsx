import React from "react";
import { Button } from "@mui/material";
import "./Book.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Book(props) {

  const BASE_URL = "https://book-store-app-mern.vercel.app"

  const navigate = useNavigate();
  const { _id, name, author, description, price, image } = props.book;

  const handleDelete = async()=>{
    const Delete = await axios.delete(`${BASE_URL}/books/${_id}`)
    .then((res)=>res.data)
    .then(()=>navigate("/"))
    .then(()=>navigate("/books"))
  }
  return (
    <div className="card-container">
      <div className="card">
        <img src={`${BASE_URL}/${image}`} alt={name} />
        <p>By {author}</p>
        <h4>{name}</h4>
        <p>{description}</p>
        <h3>Rs {price}</h3>
        <Button color="primary" sx={{paddingTop:"5px"}} LinkComponent={Link} to={`/books/${_id}`} >Update</Button>
        <Button color="error" sx={{paddingTop:"5px"}} onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}

export default Book;
