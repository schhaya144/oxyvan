// import React, { useState } from 'react';

// const AddTreeCategory = () => {
//     const [categoryData, setCategoryData] = useState({
//         uniqueId: '',
//         name: '',
//         description: '',
//         image: '',
//         stock: 0
//     });

//     const handleChange = (e) => {
//         setCategoryData({
//             ...categoryData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:8080/api/category', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(categoryData)
//             });

//             if (response.ok) {
//                 alert('Tree category added successfully!');
//                 setCategoryData({
//                     uniqueId: '',
//                     name: '',
//                     description: '',
//                     image: '',
//                     stock: 0
//                 });
//             } else {
//                 const errorData = await response.json();
//                 alert(`Error: ${errorData.message}`);
//             }
//         } catch (err) {
//             console.error(err);
//             alert('An error occurred while adding the tree category.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 name="uniqueId"
//                 value={categoryData.uniqueId}
//                 onChange={handleChange}
//                 placeholder="Unique ID"
//                 required
//                 className='w-full py-2 font-semibold '
//             />
//             <input
//                 type="text"
//                 name="name"
//                 value={categoryData.name}
//                 onChange={handleChange}
//                 placeholder="Tree Name"
//                 required
//                 className='w-full py-2 font-semibold '
//             />
//             <textarea
//                 name="description"
//                 value={categoryData.description}
//                 onChange={handleChange}
//                 placeholder="Description"
//                 required
//             />
//             <input
//                 type="text"
//                 name="image"
//                 value={categoryData.image}
//                 onChange={handleChange}
//                 placeholder="Image URL"
//                 required
//                 className='w-full py-2 font-semibold '
//             />
//             <input
//                 type="number"
//                 name="stock"
//                 value={categoryData.stock}
//                 onChange={handleChange}
//                 placeholder="Stock"
//                 required
//                 className='w-full py-2 font-semibold '
//             />
//             <button type="submit">Add Tree Category</button>
//         </form>
//     );
// };

// export default AddTreeCategory;



import React, { useState, useEffect } from 'react';

const AddTreeCategory = () => {
    const [userType, setUserType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');

    // Fetch all users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/getuser');
            const data = await response.json();
            setUsers([...data.donors, ...data.volunteers]); // Combine both donors and volunteers
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { type: userType, name, email };

        try {
            const response = await fetch('http://localhost:8080/api/getuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            setResponseMessage(result.message);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error adding user:', error);
            setResponseMessage('Error adding user');
        }

        // Clear form fields
        setUserType('');
        setName('');
        setEmail('');
    };

    return (
        <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-2xl font-bold text-center text-green-700 mb-5">Donor/Volunteer Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                    className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="" disabled>Select User Type</option>
                    <option value="donor">Donor</option>
                    <option value="volunteer">Volunteer</option>
                </select>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Submit
                </button>
            </form>
            {responseMessage && <div className="mt-3 text-center text-green-600">{responseMessage}</div>}
            <h2 className="text-xl font-semibold text-green-700 mt-5">All Users</h2>
         
                {users.map((user, index) => (
                       <ul className="mt-3 space-y-2">
                    <li key={index} className="p-2 bg-green-50 border border-green-200 rounded-lg">
                        {user.name} ({user.type})
                    </li>
                    <li key={index} className="p-2 bg-green-50 border border-green-200 rounded-lg">
                        {user.email} ({user.type})
                    </li>
                    </ul>
                ))}
           
        </div>
    );
};

export default AddTreeCategory;
