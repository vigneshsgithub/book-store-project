'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`).then(res => {
      setBook(res.data.data);
    }).catch(err => console.log(err));
  }, [id]);

  if (!book) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 space-y-2 showbook-main-container text-5xl ">
      <div className='bg-blue-500 w-4xl h-90 mx-140 rounded-4xl  '>
       <div className='mt-100 showbook content-center'>
      <h1 className="font-bold flex justify-center  m-5 mt-25 gap-3"><strong className='text-gray-950'>Title:</strong>{book.title}</h1>
      <p className=' mx-55 gap-3 '><strong className='text-gray-950'>Author:</strong> {book.author}</p>
      <p className='mx-50 justify-center m-5 gap-3'><strong className='text-gray-950'>Published Year:</strong> {book.PublishYear}</p>
      </div>
    </div>
    </div>
  );
}
