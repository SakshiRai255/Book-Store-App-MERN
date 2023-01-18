import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        author:{
            type: String,
            required :true,  
        },
        description:{
            type: String,
            required :true,
        },
        price:{
            type: Number,
            required :true,
        },
        available:{
            type: Boolean,
            required :true,
        },
        image:{
            type: String,
            required :true,
        }
});

const BookModel = mongoose.model("Book",BookSchema)

export default BookModel;