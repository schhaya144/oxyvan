import React, { useState } from 'react';
import SummaryApi from '../common/SummaryApi';

const UserRecordForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    ammount: '',
    utrNumber: '',
    landArea: '',
    landAddress: '',
  });

  // State to handle tree donations
  const [trees, setTrees] = useState([{ treeType: '', numberOfTrees: '' }]);
  const [donationType, setDonationType] = useState('');

  // Get all selected tree types
  const selectedTreeTypes = trees.map(tree => tree.treeType);

  // Handler for form inputs
  const handleinputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for tree inputs
  const handleTreeInputs = (index, e) => {
    const { name, value } = e.target;
    const updatedTrees = [...trees];
    updatedTrees[index] = { ...updatedTrees[index], [name]: value };
    setTrees(updatedTrees);
  };

  // Add more tree inputs (max 6 additional)
  const addMoreTrees = () => {
    if (trees.length < 7) {
      setTrees([...trees, { treeType: '', numberOfTrees: '' }]);
    }
  };

  // Remove tree input
  const removeTree = (index) => {
    const updatedTrees = trees.filter((_, idx) => idx !== index);
    setTrees(updatedTrees);
  };

  // Handler for dropdown change
  const handleDonationTypeChange = (e) => {
    setDonationType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedData = { ...formData, trees };
    console.log(combinedData);

    try {
      const postData = await fetch(SummaryApi.postUserRecordDetails.url, {
        method: SummaryApi.postUserRecordDetails.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });
      console.log(postData);
      if (postData.ok) {
        const result = await postData.json();
        console.log('response', result);
        alert('Submitted successfully');
        // Reset the form data after successful submission
        setFormData({
          name: '',
          number: '',
          ammount: '',
          utrNumber: '',
          landArea: '',
          landAddress: '',
        });
        setTrees([{ treeType: '', numberOfTrees: '' }]); // Reset tree fields
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Options for tree types
  const treeTypeOptions = [
    'Sandalwood Tree',
    'Jamun Tree',
    'Arjuna Tree',
    'Neem Tree',
    'Bamboo Tree',
    'Peepal Tree',
    'Banyan Tree',
  ];

  return (
    <>
      <div className="p-6 w-full mx-auto shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-gray-700">Name: </label>
            <input 
              type="text" 
              name="name" 
              className="p-2 border border-gray-300 rounded" 
              onChange={handleinputs}
              value={formData.name}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="number" className="mb-1 text-gray-700">Number: </label>
            <input 
              type="phone" 
              name="number" 
              className="p-2 border border-gray-300 rounded" 
              onChange={handleinputs}
              value={formData.number}
            />
          </div>

          {/* Donation Type Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="donationType" className="mb-1 text-gray-700">Donation Type: </label>
            <select 
              name="donationType" 
              id="donationType" 
              className="p-2 border border-gray-300 rounded"
              value={donationType}
              onChange={handleDonationTypeChange}
            >
              <option value="">-- Select Donation Type --</option>
              <option value="tree">Tree</option>
              <option value="money">Money</option>
              <option value="land">Land</option>
            </select>
          </div>

          {donationType === 'tree' && (
            <>
              {trees.map((tree, index) => (
                <div key={index} className="border border-emerald-800 p-5 rounded shadow-sm space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor={`treeType_${index}`} className="mb-1 text-gray-700">Select Tree Type: </label>
                    <select 
                      name="treeType" 
                      id={`treeType_${index}`}
                      className="p-2 border border-gray-300 rounded"
                      value={tree.treeType}
                      onChange={(e) => handleTreeInputs(index, e)}
                    >
                      <option value="">-- Select Tree Type --</option>
                      {treeTypeOptions.map((option, i) => (
                        <option 
                          key={i} 
                          value={option} 
                          disabled={selectedTreeTypes.includes(option) && option !== tree.treeType}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor={`numberOfTrees_${index}`} className="mb-1 text-gray-700">Number of Trees: </label>
                    <input 
                      type="number" 
                      name="numberOfTrees" 
                      className="p-2 border border-gray-300 rounded"
                      value={tree.numberOfTrees}
                      onChange={(e) => handleTreeInputs(index, e)}
                    />
                  </div>
                  {index > 0 && (
                    <button 
                      type="button" 
                      onClick={() => removeTree(index)} 
                      className="bg-red-600 text-white rounded-lg p-2 mt-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {trees.length < 7 && (
                <button 
                  type="button" 
                  onClick={addMoreTrees} 
                  className="bg-blue-600 text-white rounded-lg p-2 mt-2"
                >
                  Add More +
                </button>
              )}
            </>
          )}

          {/* Money and Land fields (same as before) */}

          {donationType === 'money' && (
            <>
              <div className="flex flex-col">
                <label htmlFor="ammount" className="mb-1 text-gray-700">Amount: </label>
                <input 
                  type="number" 
                  name="ammount" 
                  className="p-2 border border-gray-300 rounded" 
                  onChange={handleinputs}
                  value={formData.ammount}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="utrNumber" className="mb-1 text-gray-700">UTR Number: </label>
                <input 
                  type="text" 
                  name="utrNumber" 
                  className="p-2 border border-gray-300 rounded" 
                  onChange={handleinputs}
                  value={formData.utrNumber}
                />
              </div>
            </>
          )}

          {donationType === 'land' && (
            <>
              <div className="flex flex-col">
                <label htmlFor="landArea" className="mb-1 text-gray-700">Land Area (in sq. ft): </label>
                <input 
                  type="number" 
                  name="landArea" 
                  className="p-2 border border-gray-300 rounded" 
                  onChange={handleinputs}
                  value={formData.landArea}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="landAddress" className="mb-1 text-gray-700">Land's Full Address: </label>
                <textarea 
                  name="landAddress" 
                  className="p-2 border border-gray-300 rounded" 
                  rows="3"
                  onChange={handleinputs}
                  value={formData.landAddress}
                ></textarea>
              </div>
            </>
          )}

          {/* Submit button */}
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white p-3 rounded-lg"
          >
            Submit
          </button>

        </form>
      </div>
    </>
  );
};

export default UserRecordForm;
