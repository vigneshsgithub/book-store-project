import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGODB_URL } from './config.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

//Cross Origin Resource Sharing in 2 ways:

//1. Using cors package
app.use(cors());

// 2. Using middleware
// app.use(cors(
//     {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     }
// ));

//creating a middleware to parse request body
app.use(express.json());




// Correct POST route
app.get('/', (req, res) => {
    console.log('Hello World');  // Console log
    res.status(200).send('<h1>hello world</h1><a href="/books"><button>Hello Beta</button></a>');  // Send response to client
});
app.use('/books', bookRoutes);

try {
    await mongoose.connect(MONGODB_URL)
    console.log('Connected to MongoDB');
} catch (err) {
    console.log(err);
}

// mongoose.connect(MONGODB_URL).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.log('Failed to connect to MongoDB', err);
// })




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});