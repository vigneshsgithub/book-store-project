'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { MdOutlineAddBox } from 'react-icons/md';
import Link from "next/link";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 main-container">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl my-8 ">Book List</h1>
        <Link href="/books/CreateBook" className="flex bg-indigo-900 p-3 rounded-2xl">
        <h1 className="text-3xl">Add Book</h1>
          <MdOutlineAddBox className="text-green-500 text-4xl" />
        </Link>
      </div>

      <table className="w-full border-separate border-spacing-2 second-main-container">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md">Title</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
            <th className="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
              <td className="border border-slate-700 rounded-md text-center">{book.title}</td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.author}</td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.PublishYear}</td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link href={`/books/ShowBook/${book._id}`}>
                    <button className="text-blue-600 ">Show</button>
                  </Link>
                  <Link href={`/books/EditBook/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link href={`/books/DeleteBook/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
