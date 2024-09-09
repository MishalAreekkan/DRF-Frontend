import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Employee() {
  const baseUrl = "http://127.0.0.1:8000/"
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    email: '',
    image: null
  });

  const userprofile = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/profile/`);
      setProfile(response.data);
      setForm({
        first_name: response.data.emp.first_name || '',
        email: response.data.emp.email || '',
        image: response.data.image || '',
      });
    } catch (error) {
      console.error(error, "Can't fetch");
    }
  };

  useEffect(() => {
    userprofile();
  }, []);

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
    if (form.image) {
      formData.append('image', form.image);
    }

    console.warn(form);

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/profile/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted:', response.data);
      userprofile();
      setVisible(false);
      toast.success('Successfully Updated')
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <>
      {!visible ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <div className="relative max-w-[30rem] w-full bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-800">Welcome Back, {profile?.emp?.first_name}</h1>
              <button
                onClick={() => setVisible(!visible)}
                className="bg-black text-white py-2 px-4 rounded-lg text-xs font-semibold uppercase shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Update
              </button>
            </div>
            <div className="text-sm text-gray-700">
              <p className="mb-2"><span className="font-medium">Name:</span> {profile?.emp?.first_name}</p>
              <p className="mb-2"><span className="font-medium">Email:</span> {profile?.emp?.email}</p>
              <p className="mb-2"><span className="font-medium">Profile Image:</span></p>
              <img
                src={`${baseUrl + profile?.image}`}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            </div>
          </div>
        </div>

      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full rounded-md border py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-blue-500 focus:shadow-md"
                type="text"
                placeholder="First Name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
              />

              <input
                className="w-full rounded-md border py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-blue-500 focus:shadow-md"
                type="file"
                name="image"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Update
              </button>
            </form>
            <button
              className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setVisible(!visible)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Employee;
