import express from 'express';
import mongoose  from 'mongoose';
import { PORT, MONGODB_URL } from './config.js';
import { Book } from './models/bookModel.js';

const app = express();


//creating a middleware to parse request body
app.use(express.json());

try {
    await mongoose.connect(MONGODB_URL)
    console.log('Connected to MongoDB');
} catch(err) {
    console.log(err);
}

// mongoose.connect(MONGODB_URL).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.log('Failed to connect to MongoDB', err);
// })




// Correct POST route
app.get('/', (req, res) => {
    console.log('Hello World');  // Console log
    res.status(200).send('<h1>hello world</h1> <a href="/books"><button>Hello Beta</button></a>');  // Send response to client
});


//giving conditions as if the input fileds are not filled it will send a message
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.PublishYear) {
            return res.status(400).send({
                message: 'Please fill in all the fields '
            })
        }

        //creating a new book (object)
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            PublishYear: req.body.PublishYear
        };

        //adding this newBook to the database

        const book = await Book.create(newBook);
     

        //now that it is created now we are sending it as a response

        return res.status(201).json(book);

        //if any occurs it will send a message
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//Route for getting all books(i.e writing the code here itself using mongoose to write queries in Mongo Db);

//to get all books use - Find({});
//also dynamic routes using id use- findById;
// to update the book use -
app.get('/books/:id',async(req,res)=>{
    try{
        const {id }= req.params;
        const books= await Book.findById(id);

       return res.status(200).json({
        count:books.length,
        data:books
       });

    }catch(err){
        console.log("this is the error",err);
        res.send({message:err.message});
    }
});

//update a book
app.put('/books/:id',async(req,res)=>{
    try{
        const {id }= req.params;
        const result= await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).send("couldn't update the book");
        }
        return res.status(200).send({message:"error updated successfully"})
    }catch(err){
        console.log ({message:err.message});
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});