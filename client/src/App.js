import "./App.css";
import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./components/AddBook";
import BookDetail from "./components/BookDetail"
import { Route, Routes, } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetail/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
