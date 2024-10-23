import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/SummaryApi';
import moment from 'moment';
import { MdOutlineCancel } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineModeEdit } from 'react-icons/md'; 
const ContactForm = () => {
  const [datas, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    numberMobile: '',
    msg: '',
  });

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const fetchContactData = await fetch(SummaryApi.contactAll.url, {
        method: SummaryApi.contactAll.method,
        credentials: 'include',
      });
      const responseData = await fetchContactData.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (err) {
      console.log('Something went wrong', err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle update contact
  const handleUpdate = async (id) => {
    try {
      const updateResponse = await fetch(SummaryApi.updateContactDetails.url.replace(':id', id), {
        method: SummaryApi.updateContactDetails.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const updateResult = await updateResponse.json();
      if (updateResult.success) {
        alert('Contact updated successfully');
        fetchData(); // Refresh the data after update
        setEditIndex(null); // Reset edit index
      } else {
        alert('Failed to update contact');
      }
    } catch (err) {
      console.log('Error updating contact:', err);
    }
  };

  // Handle delete contact
  const handleDelete = async (id) => {
    try {
      const deleteResponse = await fetch(SummaryApi.deleteContactDetails.url.replace(':id', id), {
        method: SummaryApi.deleteContactDetails.method,
        credentials: 'include',
      });

      const deleteResult = await deleteResponse.json();
      if (deleteResult.success) {
        alert('Contact deleted successfully');
        fetchData(); // Refresh the data after deletion
      } else {
        alert('Failed to delete contact');
      }
    } catch (err) {
      console.log('Error deleting contact:', err);
    }
  };

  // Handle edit mode
  const handleEditClick = (details, index) => {
    setEditIndex(index);
    setFormData({
      name: details.name,
      email: details.email,
      numberMobile: details.numberMobile,
      msg: details.msg,
    });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormData({
      name: '',
      email: '',
      numberMobile: '',
      msg: '',
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='bg-white pb-4'>
      <table className="w-full">
        <thead>
          <tr className="bg-primary text-white">
            <th className='p-2 text-left'>S.No.</th>
            <th className='p-2 text-left'>Name</th>
            <th className='p-2 text-left'>Email</th>
            <th className='p-2 text-left'>Contact No</th>
            <th className='p-2 text-left'>Message</th>
            <th className='p-2 text-left'>Created Date</th>
            <th className='p-2 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((details, index) => (
            <tr key={index} className='border-b'>
              <td className='p-2'>{index + 1}</td>
              <td className='p-2'>
                {editIndex === index ? (
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  details.name
                )}
              </td>
              <td className='p-2'>
                {editIndex === index ? (
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  details.email
                )}
              </td>
              <td className='p-2'>
                {editIndex === index ? (
                  <input
                    type='text'
                    name='numberMobile'
                    value={formData.numberMobile}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  details.numberMobile
                )}
              </td>
              <td className='p-2'>
                {editIndex === index ? (
                  <input
                    name='msg'
                    value={formData.msg}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  details.msg
                )}
              </td>
              <td className='p-2'>{moment(details.createdAt).format('LL')}</td>
              <td className='p-2'>
                {editIndex === index ? (
                  <>
                    <button
                      className='mr-2 p-1 bg-green-500 text-white'
                      onClick={() => handleUpdate(details._id)}
                    >
                     <CiSaveDown2 />
                    </button>
                    <button
                      className='p-1 bg-gray-500 text-white'
                      onClick={handleCancelEdit}
                    >
                     <MdOutlineCancel />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className='mr-2 p-1 bg-blue-500 text-white'
                      onClick={() => handleEditClick(details, index)}
                    >
                      <MdOutlineModeEdit/>
                    </button>
                    <button
                      className='p-1 bg-red-500 text-white'
                      onClick={() => handleDelete(details._id)}
                    >
                      <RiDeleteBinLine/>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactForm;
