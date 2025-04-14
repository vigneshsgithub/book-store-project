'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EditBook = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    PublishYear: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/books/${id}`);
        if (res.data && res.data.data) {
          setFormData({
            title: res.data.data.title,
            author: res.data.data.author,
            PublishYear: res.data.data.PublishYear,
          });
          toast.success('Book Successfully Edited!', {
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
        } else {
          setError('Book not found!');
        }
      } catch (err) {
        setError('Failed to fetch book.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${id}`, formData);
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Failed to update book.');
    }
  };

  if (loading) return <p>Loading book...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="PublishYear"
          placeholder="Publish Year"
          value={formData.PublishYear}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
