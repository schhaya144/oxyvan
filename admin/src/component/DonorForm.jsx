import React, { useState } from 'react';

const DonorForm = () => {
  const [data, setData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    donationAmount: '',
    donationType: 'one-time',
    paymentMethod: 'online',
    paymentFrequency: 'monthly',
    cardNumber: '',
    expiryDate: '',
    chequeNumber: '',
    bankDetails: '',
    donationPurpose: '',
    anonymous: 'no',
    updates: 'no',
    panCard: null, // Updated to handle file upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({
      ...data,
      panCard: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload and form data
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    console.log('Donor Form submitted:', data);

    try {
      const fetchResponse = await fetch(
        'http://localhost:8080/api/upload-files',
        {
          method: 'POST',
          body: formData, // Send FormData directly
        }
      );

      if (!fetchResponse.ok) {
        const errordata = await fetchResponse.json();
        console.error('Error details:', errordata);
      } else {
        alert('Form submitted successfully');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Form not submited');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Donor Information */}
      <div className="mb-4">
        <label className="block text-green-700">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-green-700">Address</label>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-green-700">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-green-700">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* PAN Card Upload */}
      <div className="mb-4">
        <label className="block text-green-700">Upload PAN Card</label>
        <input
          type="file"
          name="panCard"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Donation Details */}
      <h2 className="text-2xl font-bold mb-6 text-green-900">Donation Details</h2>
      <div className="mb-4">
        <label className="block text-green-700">Donation Amount (₹)</label>
        <input
          type="number"
          name="donationAmount"
          value={data.donationAmount}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-green-700">Donation Type</label>
        <select
          name="donationType"
          value={data.donationType}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="one-time">One-time donation</option>
          <option value="recurring">Recurring donation</option>
        </select>
      </div>

      {/* Payment Information */}
      <h2 className="text-2xl font-bold mb-6 text-green-900">Payment Information</h2>
      <div className="mb-4">
        <label className="block text-green-700">Payment Method</label>
        <select
          name="paymentMethod"
          value={data.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="online">Online payment</option>
          <option value="cheque">Cheque</option>
          <option value="bank">Bank transfer</option>
        </select>
      </div>
      {data.paymentMethod === 'online' && (
        <>
          <div className="mb-4">
            <label className="block text-green-700">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={data.cardNumber}
              onChange={handleChange}
              className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-700">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={data.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </>
      )}
      {data.paymentMethod === 'cheque' && (
        <div className="mb-4">
          <label className="block text-green-700">Cheque Number</label>
          <input
            type="text"
            name="chequeNumber"
            value={data.chequeNumber}
            onChange={handleChange}
            className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
      )}
      {data.paymentMethod === 'bank' && (
        <div className="mb-4">
          <label className="block text-green-700">Bank Account Details</label>
          <input
            type="text"
            name="bankDetails"
            value={data.bankDetails}
            onChange={handleChange}
            className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
      )}

      {/* Donation Purpose */}
      <h2 className="text-2xl font-bold mb-6 text-green-900">Donation Purpose</h2>
      <div className="mb-4">
        <label className="block text-green-700">
          Specify the purpose of your donation (optional)
        </label>
        <textarea
          name="donationPurpose"
          value={data.donationPurpose}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        ></textarea>
      </div>

      {/* Additional Information */}
      <h2 className="text-2xl font-bold mb-6 text-green-900">Additional Information</h2>
      <div className="mb-4">
        <label className="block text-green-700">
          Would you like to remain anonymous?
        </label>
        <select
          name="anonymous"
          value={data.anonymous}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-green-700">
          Would you like to receive updates from us?
        </label>
        <select
          name="updates"
          value={data.updates}
          onChange={handleChange}
          className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DonorForm;
