import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Employee() {
    const [profile, setProfile] = useState(null);
    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState({
        first_name: '',
        email: '',
        image: null
    });

    // Fetch user profile
    const userprofile = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/profile/`);
            console.log(response.data, 'ppppppppppppp');
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

    // Fetch profile data when the component mounts
    useEffect(() => {
        userprofile();
    }, []);

    // Handle input changes
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', form.first_name);
        formData.append('email', form.email);
        if (form.image) {
            formData.append('image', form.image);
        }

        try {
            const response = await axios.patch(`http://127.0.0.1:8000/profile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted:', response.data);
            // Optionally, refetch profile or handle navigation
            userprofile();
            setVisible(false); // Close form after successful update
        } catch (error) {
            console.error('Error during update:', error);
            alert('An error occurred during the update. Please try again.');
        }
    };

    return (
        <>
            {!visible ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="relative max-w-[30rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                        <div className="flex items-center justify-between gap-4 mb-2">
                            <h1>Welcome Back {profile?.emp?.first_name}</h1>
                            <button
                                onClick={() => setVisible(!visible)}
                                className="rounded-lg bg-gray-900 py-2 px-3 text-center text-xs font-bold uppercase text-white shadow-md hover:shadow-lg"
                            >
                                Update
                            </button>
                        </div>
                        <div className="block text-sm text-gray-700">
                            <p>Name: {profile?.emp?.first_name}</p>
                            <p>Email: {profile?.emp?.email}</p>
                            <p>Profile Image: <img src={profile?.image} alt="Profile" /></p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="w-full rounded-md border py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full rounded-md border py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full rounded-md border py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                type="file"
                                name="image"
                                onChange={handleChange}
                            />
                            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Update</button>
                        </form>
                        <button
                            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
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
