'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateBook() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    PublishYear: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/books', formData);
      toast.success('Book added successfully!', {
        style: {
          border: '1px solid #4ade80',
          padding: '16px',
          color: '#166534',
          backgroundColor: '#dcfce7',
          fontWeight: '500',
          borderRadius: '8px',
        },
        iconTheme: {
          primary: '#22c55e',
          secondary: '#ecfdf5',
        },
      });
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" required />
      <input name="author" placeholder="Author" onChange={handleChange} className="border p-2 w-full" required />
      <input name="PublishYear" placeholder="Publish Year" type="number" onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Book</button>
    </form>
  );
}
