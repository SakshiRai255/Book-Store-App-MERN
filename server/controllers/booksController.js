import BookModel from "../models/BookModel.js";

// getAllBooks

export const getAllBooks = async (_req, res) => {
  try {
    const books = await BookModel.find();
    if (!books) {
      return res.status(404).json({
        message: "No Products Found",
      });
    }
    return res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Add Books

export const addBook = async (req, res) => {
  const{name,author,description,price,image,available} = req.body

  // const image = req.file.path;

  try {
    const book = new BookModel({
      name,
      author,
      description,
      price,
      available,
      image,
    });

    if (!book) {
      return res.status(500).json({
        message: "Unable to add",
      });
    }

    await book.save();
    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//  Get books by ID

export const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({
        message: "No Products Found",
      });
    }

    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update a Book

export const updateBook = async (req, res) => {
  const id = req.params.id;
  const { name, author, description, price,image,available} = req.body;

  // const image = req.file.path;

  try {
    const book = await BookModel.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
    });
    if (!book) {
      return res.status(404).json({
        message: "Unable to updated by this Id",
      });
    }
    // save in database

    await book.save();
    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Book

export const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await BookModel.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({
        message: "Unable to delete by this Id",
      });
    }
    await book.save();
    return res.status(200).json({ message: "Product Successfully Deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
