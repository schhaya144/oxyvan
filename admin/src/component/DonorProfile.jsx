import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const DonorProfile = () => {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [volunteerDetails, setVolunteerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDonorData = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/donors-profile/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        setDonor(result.data.donor);
        if (result.data.isVolunteer) {
          setVolunteerDetails(result.data.volunteerDetails);
        }
      } else {
        alert('Error fetching donor data');
      }
    } catch (error) {
      console.error('Error fetching donor:', error);
      alert('Something went wrong while fetching donor data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonorData();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!donor) {
    return <div className="text-center text-gray-500">No donor found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Donor Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1 ">
            <strong className="block font-medium text-gray-700">Name:</strong>
            <p className="text-gray-900">{donor.name}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Email:</strong>
            <p className="text-gray-900">{donor.email}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Address:</strong>
            <p className="text-gray-900">{donor.address}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Contact No:</strong>
            <p className="text-gray-900">{donor.phone}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Donation Amount:</strong>
            <p className="text-gray-900">{donor.donationAmount}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Donation Type:</strong>
            <p className="text-gray-900">{donor.donationType}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Payment Method:</strong>
            <p className="text-gray-900">{donor.paymentMethod}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Card Number:</strong>
            <p className="text-gray-900">{donor.cardNumber}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Card Expiry Date:</strong>
            <p className="text-gray-900">{moment(donor.cardExpiryDate).format('YYYY-MM-DD')}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Cheque Number:</strong>
            <p className="text-gray-900">{donor.chequeNumber}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <strong className="block font-medium text-gray-700">Bank Details:</strong>
            <p className="text-gray-900">{donor.bankDetails}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <a
              href={`${apiBaseUrl}/files/${donor.panCard}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block   hover:underline"
            >
              View PAN Card
            </a>
          </div>
          <div className="col-span-2">
            <strong className="block font-medium text-gray-700">Donation Purpose:</strong>
            <p className="text-gray-900">{donor.donationPurpose}</p>
          </div>
         
          <div className="col-span-2">
            <strong className="block font-medium text-gray-700">Is Volunteer:</strong>
            <p className="text-gray-900">{volunteerDetails ? 'Yes' : 'No'}</p>
          </div>
          {volunteerDetails && (
            <>
              <h3 className="col-span-2 text-2xl font-bold mt-8 text-green-600">Volunteer Details</h3>
              <div className="col-span-2 md:col-span-1">
                <strong className="block font-medium text-gray-700">Volunteer Name:</strong>
                <p className="text-gray-900">{volunteerDetails.name}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <strong className="block font-medium text-gray-700">Address:</strong>
                <p className="text-gray-900">{volunteerDetails.address}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <strong className="block font-medium text-gray-700">Phone Number:</strong>
                <p className="text-gray-900">{volunteerDetails.phoneNumber}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <strong className="block font-medium text-gray-700">Occupation:</strong>
                <p className="text-gray-900">{volunteerDetails.occupation}</p>
              </div>
              <div className="col-span-2">
                <strong className="block font-medium text-gray-700">Reason for Volunteering:</strong>
                <p className="text-gray-900">{volunteerDetails.reasonForVolunteering}</p>
              </div>
            </>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
