import React, { useState, useEffect } from "react";
import Book from "./Book";
import axios from "axios";
import './Book.css'

function Books() {
  
  const {BASE_URL} = "https://book-store-app-mern.vercel.app";

  const [books, setBooks] = useState();

  const fetchBooks = async () => {
    const result = await axios.get(`${BASE_URL}/books/`);
    const data = await result.data;
    return data;
  };

  useEffect(() => {
    fetchBooks().then((data) => setBooks(data.books));
  }, []);

  return (
    <div>
      <ul>
        {books &&
          books.map((book, index) => (
            <li key={index}>
              <Book book={book} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Books;
