import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const nav = useNavigate()
  const [retrieve, setRetrieve] = useState({});
  const [form, setForm] = useState({
    first_name: '',
    email: '',
    image: null
  });
  const { id } = useParams();

  const Listing = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/rud/${id}/`);
      setRetrieve(response.data);
      setForm({
        first_name: response.data.first_name || '',
        email: response.data.email || '',
        image: response.data.image || '',
      });
    } catch (error) {
      console.error('Error fetching list data:', error);
    }
  };

  useEffect(() => {
    Listing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({
        ...form,
        image: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', form.first_name);
    formData.append('email', form.email);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/rud/${id}/`, {
        first_name: form.first_name,
        email: form.email,
        image: form.image,
      });
      console.log('Form submitted:', response.data);
      nav('/home')
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Update Profile
          </h2>

          <div className="mb-4">
            <input
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              type="text"
              placeholder="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <input
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <input
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>

    </>
  );
}

export default Update;
