import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import moment from 'moment';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ProfilePage = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        SummaryApi.volunteerDetails.url.replace(':id', id),
        {
          method: SummaryApi.volunteerDetails.method,
        }
      );
      const data = await response.json();
      console.log('API Response:', data);
      if (data.success) {
        setProfileData(data.data);
      } else {
        console.error('Failed to fetch profile details');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  if (!profileData) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">Volunteer Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <strong className="text-gray-600">Name:</strong>
            <p className="text-lg text-gray-800">{profileData.name}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Email:</strong>
            <p className="text-lg text-gray-800">{profileData.email}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Are you a donor also:</strong>
            <p className="text-lg text-gray-800">
              {profileData.isDonor ? 'Yes' : 'No'}
            </p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Contact No:</strong>
            <p className="text-lg text-gray-800">{profileData.phoneNumber}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Address:</strong>
            <p className="text-lg text-gray-800">{profileData.address}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Age:</strong>
            <p className="text-lg text-gray-800">{profileData.age}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Occupation:</strong>
            <p className="text-lg text-gray-800">{profileData.occupation}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Reason for Volunteering:</strong>
            <p className="text-lg text-gray-800">{profileData.reasonForVolunteering}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Prior Experience:</strong>
            <p className="text-lg text-gray-800">{profileData.priorExperience}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Training Session:</strong>
            <p className="text-lg text-gray-800">{profileData.trainingSession}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Note:</strong>
            <p className="text-lg text-gray-800">{profileData.note ? 'Accepted' : 'Not Accepted'}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-600">Created Date:</strong>
            <p className="text-lg text-gray-800">{moment(profileData.createdAt).format('LL')}</p>
          </div>
        </div>
        <div className="flex flex-col font-bold text-gray-700 mt-4">
            <a
              href={`${apiBaseUrl}/files/${profileData.panCardImage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:underline text-sm"
            >
              View PAN Card
            </a>
          </div>
        <div className="flex flex-col font-bold text-gray-700 mt-4">
            <a
              href={`${apiBaseUrl}/files/${profileData.aadharImage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:underline text-sm"
            >
              View Adhar Card
            </a>
          </div>
        <div className="flex flex-col font-bold text-gray-700 mt-4">
            <a
              href={`${apiBaseUrl}/files/${profileData.passbookImage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:underline text-sm"
            >
              View Passbook Image
            </a>
          </div>
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <img
              src={`${apiBaseUrl}/files/${profileData.panCardImage}`}
              alt="Pan Card"
              className="w-32 h-auto rounded-md shadow-md"
            />
            <span className="text-gray-600 mt-2">Pan Card</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`${apiBaseUrl}/files/${profileData.aadharImage}`}
              alt="Aadhar Card"
              className="w-32 h-auto rounded-md shadow-md"
            />
            <span className="text-gray-600 mt-2">Aadhar Card</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`${apiBaseUrl}/files/${profileData.passbookImage}`}
              alt="Passbook"
              className="w-32 h-auto rounded-md shadow-md"
            />
            <span className="text-gray-600 mt-2">Passbook</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
