import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const nav = useNavigate()
  const [retrieve, setRetrieve] = useState({});
  const [form, setForm] = useState({
    first_name: '',
    email: '',
  });
  const { id } = useParams();

  const Listing = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/rud/${id}/`);
      setRetrieve(response.data);
      setForm({
        first_name: response.data.first_name || '',
        email: response.data.email || '',

      });
    } catch (error) {
      console.error('Error fetching list data:', error);
    }
  };

  useEffect(() => {
    Listing();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/rud/${id}/`, {
        first_name: form.first_name,
        email: form.email,
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
      <h1>Update Employee</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            type="text"
            placeholder="First Name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <input
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <button 
          type="submit">Update</button>
        </form>
      </div>
    </>
  );
}

export default Update;
