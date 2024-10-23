import React, { useState, useEffect } from 'react';
import moment from 'moment';
import SummaryApi from '../common/SummaryApi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Samples = () => {
  const [donorData, setDonorData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const fetchData = async () => {
    try {
      const responseData = await fetch(SummaryApi.donorAll.url, {
        method: SummaryApi.donorAll.method,
        credentials: 'include',
      });
      const response = await responseData.json();
      if (response.success) {
        setDonorData(response.data);
        console.log('Fetched data:', response.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Something went wrong while fetching data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e, id) => {
    setEditData({
      ...editData,
      [id]: {
        ...editData[id],
        [e.target.name]: e.target.value,
      },
    });
  };

  // Update volunteer data
  const updateData = async (id) => {
    try {
      const response = await fetch(
        SummaryApi.donorUpdate.url.replace(':id', id),
        {
          method: SummaryApi.donorUpdate.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData[id]), // Send updated data
        }
      );

      const result = await response.json();
      if (result.success) {
        setEditData({});
        setEditMode(null);
        fetchData();
      } else {
        console.error('Failed to update volunteer data:', result.message);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    // Initialize editData if it doesn't exist
    if (!editData[id]) {
      setEditData({ [id]: donorData.find((data) => data._id === id) });
    }
  };

  // Delete volunteer data
  const deleteData = async (id) => {
    if (!window.confirm('Are you sure you want to delete this volunteer?')) {
      return;
    }
    try {
      const response = await fetch(
        SummaryApi.donorDelete.url.replace(':id', id),
        {
          method: SummaryApi.donorDelete.method,
        }
      );
      const result = await response.json();
      if (result.success) {
        fetchData(); // Refresh the data after deletion
      } else {
        console.error('Failed to delete volunteer:', result.message);
      }
    } catch (error) {
      console.error('Error deleting volunteer:', error);
    }
  };

  const viewProfile = (id) => {
    navigate(`/sidebar/profile-donor/${id}`);
  };

  return (
    <div className="bg-white pb-4">
      <table className="w-auto">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-2 text-center whitespace-nowrap">S.No.</th>
            <th className="p-2 text-center whitespace-nowrap">Name</th>
            <th className="p-2 text-center whitespace-nowrap">Email</th>
            <th className="p-2 text-center whitespace-nowrap">Address</th>
            <th className="p-2 text-center whitespace-nowrap">Contact No</th>
            <th className="p-2 text-center whitespace-nowrap">Pan Card</th>
            <th className="p-2 text-center whitespace-nowrap">Donation Amount</th>
            <th className="p-2 text-center whitespace-nowrap">Donation Type</th>
            <th className="p-2 text-center whitespace-nowrap">Payment Method</th>
            <th className="p-2 text-center whitespace-nowrap">Card Number</th>
            <th className="p-2 text-center whitespace-nowrap">Card Expiry Date</th>
            <th className="p-2 text-center whitespace-nowrap">Cheque Number</th>
            <th className="p-2 text-center whitespace-nowrap">Bank Details</th>
            <th className="p-2 text-center whitespace-nowrap">Donation Purpose</th>
            <th className="p-2 text-center whitespace-nowrap">Anonymous</th>
            <th className="p-2 text-center whitespace-nowrap">Stay Updated</th>
            <th className="p-2 text-center whitespace-nowrap">Created Date</th>
            <th className="p-2 text-center whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donorData.map((detail, i) => (
            <tr key={detail._id} className={`border-b ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="p-2 text-center">{i + 1}</td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData[detail._id]?.name || detail.name} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  detail.name
                )}
              </td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editData[detail._id]?.email || detail.email} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  detail.email
                )}
              </td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="text"
                    name="address"
                    value={editData[detail._id]?.address || detail.address} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  detail.address
                )}
              </td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="text"
                    name="phone"
                    value={editData[detail._id]?.phone || detail.phone} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  detail.phone
                )}
              </td>
              <td className="p-2 text-center">
                <a
                  href={`${apiBaseUrl}/files/${detail.panCard}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${apiBaseUrl}/files/${detail.panCard}`}
                    alt=""
                    className="w-20"
                  />
                </a>
              </td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="number"
                    name="donationAmount"
                    value={editData[detail._id]?.donationAmount || detail.donationAmount} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  detail.donationAmount
                )}
              </td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="text"
                    name="donationType"
                    value={editData[detail._id]?.donationType || detail.donationType} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  detail.donationType
                )}
              </td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="text"
                    name="paymentMethod"
                    value={editData[detail._id]?.paymentMethod || detail.paymentMethod} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  detail.paymentMethod
                )}
              </td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="text"
                    name="cardNumber"
                    value={editData[detail._id]?.cardNumber || detail.cardNumber} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  detail.cardNumber
                )}
              </td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <input
                    type="text"
                    name="cardExpiryDate"
                    value={editData[detail._id]?.cardExpiryDate || moment(detail.cardExpiryDate).format('YYYY-MM-DD')} // Fallback to original value
                    onChange={(e) => handleChange(e, detail._id)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  moment(detail.cardExpiryDate).format('YYYY-MM-DD')
                )}
              </td>
              <td className="p-2 text-center">{detail.chequeNumber}</td>
              <td className="p-2 text-center">{detail.bankDetails}</td>
              <td className="p-2 text-center">{detail.donationPurpose}</td>
              <td className="p-2 text-center">{detail.anonymous ? 'Yes' : 'No'}</td>
              <td className="p-2 text-center">{detail.stayUpdated ? 'Yes' : 'No'}</td>
              <td className="p-2 text-center">{moment(detail.createdAt).format('YYYY-MM-DD')}</td>
              <td className="p-2 text-center">
                {editMode === detail._id ? (
                  <>
                    <button onClick={() => updateData(detail._id)} className="text-green-500 hover:underline">Save</button>
                    <button onClick={() => setEditMode(null)} className="text-red-500 hover:underline">Cancel</button>
                  </>
                ) : (
                  <div className='flex gap-1'>
                       <button onClick={() => viewProfile(detail._id)} className="bg-yellow-500 p-1 rounded-sm  text-white"><CgProfile /></button>
                    <button onClick={() => toggleEditMode(detail._id)} className="bg-blue-500 p-1 rounded-sm text-white"><MdOutlineModeEdit /></button>
                    <button onClick={() => deleteData(detail._id)} className="bg-red-500 p-1 rounded-sm  text-white "><RiDeleteBinLine /></button>
                 
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Samples;
