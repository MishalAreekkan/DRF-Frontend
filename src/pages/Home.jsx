import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function Home() {
    const [listdata, setListdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [form, setForm] = useState({
        firstname: '',
        email: '',
        password: '',
        password2: ''
    });

    const Listing = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/list');
            setListdata(response.data);
            console.log('listing:', response.data);
        } catch (error) {
            console.error('Error fetching list data:', error);
        }
    };

    useEffect(() => {
        Listing();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/register', {
                first_name: form.firstname,
                email: form.email,
                password: form.password,
                password2: form.password2
            });
            console.log('Form submitted:', response.data);
            setForm({
                firstname: '',
                email: '',
                password: '',
                password2: ''
            });
            Listing();
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again.');
        }
        console.log('Form submitted:', form);
    };

    const handleDelete = async () => {
        if (selectedId === null) return;
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/rud/${selectedId}/`);
            console.log('User deleted successfully:', response.data);
            setOpen(false);
            setSelectedId(null);
            Listing();
        } catch (error) {
            console.error("Can't delete:", error);
        }
    };

    const openModal = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    return (
        <>
            <div>
                <h1>Home Page</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listdata?.map((i) => (
                            <tr key={i.id}>
                                <td>{i.id}</td>
                                <td>{i.email}</td>
                                <td>{i.first_name}</td>
                                <td>
                                    <button >Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => openModal(i.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={form.password2}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Sign in</button>
                </form>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
                <DialogBackdrop
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-100 sm:mx-0">
                                        <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Delete User?
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this account? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
export default Home;
