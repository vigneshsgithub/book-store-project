'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

export default function DeleteBook(propsPromise) {
  const { id } = use(propsPromise.params);
  const router = useRouter();
  const hasRun = React.useRef(false); // 👈 track if effect ran

  React.useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const confirmAndDelete = async () => {
      const confirmed = confirm("Are you sure you want to delete this book?");
      if (confirmed) {
        try {
          await axios.delete(`http://localhost:5000/books/${id}`);
          toast.success('Book Deleted successfully!', {
            style: {
              border: '1px solid #4ade80',
              padding: '16px',
              color: '#fff',
              backgroundColor: 'red',
              fontWeight: '500',
              borderRadius: '8px',
            },
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ecfdf5',
            },
          });
        } catch (error) {
          console.error("Error deleting book:", error);
          toast.success('Book added successfully!', {
            style: {
              border: '1px solid #4ade80',
              padding: '16px',
              color: '#166534',
              backgroundColor: 'red',
              fontWeight: '500',
              borderRadius: '8px',
            },
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ecfdf5',
            },
          });
        }
      }
      router.push('/');
    };

    confirmAndDelete();
  }, [id, router]);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Deleting book...</h1>
    </div>
  );
}
