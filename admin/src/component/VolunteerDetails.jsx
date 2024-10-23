import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import moment from 'moment';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineModeEdit } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const VolunteerDetails = () => {
  const [volunteerData, setVolunteerData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.volunteersAll.url, {
        method: SummaryApi.volunteersAll.method,
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setVolunteerData(data.data);
        console.log('Volunteer data:', data.data);
      } else {
        console.error('Failed to fetch volunteer details');
      }
    } catch (error) {
      console.error('Error fetching volunteer data:', error);
      alert('Something went wrong while fetching volunteer details.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e, id) => {
    setEditData({
      ...editData,
      [id]: {
        ...editData[id],
        [e.target.name]: e.target.value,
      },
    });
  };

  const UpdateData = async (id) => {
    try {
      const response = await fetch(
        SummaryApi.volunteersUpdate.url.replace(':id', id),
        {
          method: SummaryApi.volunteersUpdate.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData[id]),
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
    if (!editData[id]) {
      setEditData({ [id]: volunteerData.find((data) => data._id === id) });
    }
  };

  const deleteData = async (id) => {
    if (!window.confirm('Are you sure you want to delete this volunteer?')) {
      return;
    }
    try {
      const response = await fetch(
        SummaryApi.volunteersDelete.url.replace(':id', id),
        {
          method: SummaryApi.volunteersDelete.method,
        }
      );
      const result = await response.json();
      if (result.success) {
        fetchData();
      } else {
        console.error('Failed to delete volunteer:', result.message);
      }
    } catch (error) {
      console.error('Error deleting volunteer:', error);
    }
  };

  const viewProfile = (id) => {
    navigate(`/sidebar/profile/${id}`);
  };

  return (
    <div className="bg-white pb-4">
      <div className="overflow-x-auto h-screen overflow-y-auto custom-scrollbar ">
        <table className="min-w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-2 text-center  whitespace-nowrap">S.No.</th>
              <th className="p-2 text-center  whitespace-nowrap">Name</th>
              <th className="p-2 text-center  whitespace-nowrap">Email</th>
              <th className="p-2 text-center  whitespace-nowrap">Contact No</th>
              <th className="p-2 text-center  whitespace-nowrap">Address</th>
              <th className="p-2 text-center  whitespace-nowrap">Age</th>{' '}
              <th className="p-2 text-center  whitespace-nowrap">Occupation</th>
              <th className="p-2 text-center  whitespace-nowrap">Reason for Volunteering</th>
              <th className="p-2 text-center  whitespace-nowrap">Prior Experience</th>
              <th className="p-2 text-center  whitespace-nowrap">Training Session</th>
              <th className="p-2 text-center  whitespace-nowrap">Note</th>
              <th className="p-2 text-center  whitespace-nowrap">Pan Card</th>
              <th className="p-2 text-center  whitespace-nowrap">Aadhar Card</th>
              <th className="p-2 text-center  whitespace-nowrap">Passbook</th>
              <th className="p-2 text-center  whitespace-nowrap">Created Date</th>
              <th className="p-2 text-center  whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteerData.length === 0 ? (
              <tr>
                <td colSpan="15" className="text-center p-4">
                  No Volunteer Data Available
                </td>
              </tr>
            ) : (
              volunteerData.map((detail, i) => (
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
                        value={editData[detail._id]?.email || detail.email}
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
                        name="phoneNumber"
                        value={
                          editData[detail._id]?.phoneNumber ||
                          detail.phoneNumber
                        } // Fallback to original value
                        onChange={(e) => handleChange(e, detail._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      detail.phoneNumber
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
                        type="number"
                        name="age"
                        value={editData[detail._id]?.age || detail.age} // Fallback to original value
                        onChange={(e) => handleChange(e, detail._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      detail.age
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {editMode === detail._id ? (
                      <input
                        type="text"
                        name="occupation"
                        value={
                          editData[detail._id]?.occupation || detail.occupation
                        } // Fallback to original value
                        onChange={(e) => handleChange(e, detail._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      detail.occupation
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {editMode === detail._id ? (
                      <input
                        type="text"
                        name="reasonForVolunteering"
                        value={
                          editData[detail._id]?.reasonForVolunteering ||
                          detail.reasonForVolunteering
                        } // Fallback to original value
                        onChange={(e) => handleChange(e, detail._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      detail.reasonForVolunteering
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {editMode === detail._id ? (
                      <input
                        type="text"
                        name="priorExperience"
                        value={
                          editData[detail._id]?.priorExperience ||
                          detail.priorExperience
                        } // Fallback to original value
                        onChange={(e) => handleChange(e, detail._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      detail.priorExperience
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {editMode === detail._id ? (
                      <input
                        type="text"
                        name="trainingSession"
                        value={
                          editData[detail._id]?.trainingSession ||
                          detail.trainingSession
                        } // Fallback to original value
                        onChange={(e) => handleChange(e, detail._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      detail.trainingSession
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {detail.note ? 'Accepted' : 'Not Accepted'}
                  </td>
                  <td className="p-2">
                    <a
                      href={`${apiBaseUrl}/files/${detail.panCardImage}`}
                      target="_blank"
                      download
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`${apiBaseUrl}/files/${detail.panCardImage}`}
                        alt="Pan Card"
                        className="w-20 cursor-pointer"
                      />
                    </a>
                  </td>
                  <td className="p-2 text-center">
                    <a
                      href={`${apiBaseUrl}/files/${detail.aadharImage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`${apiBaseUrl}/files/${detail.aadharImage}`}
                        alt="Aadhar Card"
                        className="w-20 cursor-pointer"
                      />
                    </a>
                  </td>
                  <td className="p-2 text-center">
                    <a
                      href={`${apiBaseUrl}/files/${detail.passbookImage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`${apiBaseUrl}/files/${detail.passbookImage}`}
                        alt="Passbook"
                        className="w-20 cursor-pointer"
                      />
                    </a>
                  </td>
                  <td className="p-2 text-center">
                    {moment(detail.createdAt).format('LL')}
                  </td>
                  <td className="p-2 text-center">
                    {editMode === detail._id ? (
                      <button
                        onClick={() => UpdateData(detail._id)}
                        className="bg-green-500 text-white p-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewProfile(detail._id)}
                          className="bg-yellow-500 text-white p-1 rounded"
                        >
                          <CgProfile />
                        </button>
                        <button
                          onClick={() => toggleEditMode(detail._id)}
                          className="bg-blue-500 text-white p-1 rounded"
                        >
                          <MdOutlineModeEdit />
                        </button>
                        <button
                          onClick={() => deleteData(detail._id)}
                          className="bg-red-500 text-white p-1 rounded"
                        >
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerDetails;
