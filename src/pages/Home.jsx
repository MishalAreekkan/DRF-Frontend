import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Home() {
    const nav = useNavigate()
    const [listdata, setListdata] = useState([]);
    const [searching, setSearching] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [form, setForm] = useState({
        firstname: '',
        email: '',
        password: '',
        password2: ''
    });

    const Listing = async (query = '') => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/list/', {
                params: { first_name: query }
            });
            setListdata(response.data);
        } catch (error) {
            console.error('Error fetching list data:', error);
        }
    };

    useEffect(() => {
        Listing(searching);
    }, [searching]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        setSearching(e.target.value);
    };

    const handleSearchSubmit = () => {
        Listing(searching);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/list/', {
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
            setOpen(false);
            setSelectedId(null);
            Listing();
            toast.success("User deleted successfully")
        } catch (error) {
            toast.success("Can't delete")
        }
    };

    const openModal = (id) => {
        setSelectedId(id);
        setOpen(true);
        Listing();
    };

    return (
        <>
            <div className=" p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={searching}
                        onChange={handleSearch}
                        placeholder="Search by name..."
                        className="block w-full p-3 mb-4 text-sm text-gray-700 placeholder-gray-500 border-2 border-[#9CA986] rounded-lg focus:ring-[#5F6F65] focus:border-[#5F6F65] focus:outline-none"
                    />
                    <button
                        onClick={handleSearchSubmit}
                        className="px-4 py-2 bg-[#020202] text-white font-medium rounded-lg shadow hover:bg-[#5F6F65] transition-all duration-300"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div>
                <div className="flex mt-8 justify-center items-center ">
                    <table className="w-full max-w-md mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Edit
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listdata?.map((i) => (
                                <tr key={i.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {i.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {i.first_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {i.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => nav(`/update/${i.id}`)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => openModal(i.id)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex mt-14 justify-center items-center ">
                <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                    <div className="relative z-0 w-full mb-5 group ">
                        <input
                            type="text"
                            name="firstname"
                            value={form.firstname}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="firstname"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            First Name
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password2"
                            value={form.password2}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="password2"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Confirm Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Register
                    </button>
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