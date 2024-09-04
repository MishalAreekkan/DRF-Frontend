import React from 'react'

function Employee() {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div data-popover="profile-info-popover"
                    className="relative max-w-[30rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <h1>Welcome Back {}</h1>
                        <button
                            className="select-none rounded-lg bg-gray-900 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button" data-ripple-light="true">
                            Update
                        </button>
                    </div>
                    <div className="flex items-center gap-8 pt-4 mt-6 border-t border-blue-gray-50"></div>
                    <div className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                        <p>Name of the Employee :</p>
                        <p>Email of the Employee :</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Employee
