import React from 'react';

const Modal = ({ isOpen, onClose, treeDetails }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50'>
      <div className='bg-white p-4 rounded shadow-lg px-8 py-3 w-2/6'>
        <h2 className='text-xl font-bold mb-2 underline '>Tree Details</h2>
        {treeDetails.length > 0 ? (
          treeDetails.map((tree, index) => (
            <div key={index} className='mb-2 my-4 text-2xl'>
              <strong>{tree.treeType}</strong>: {tree.numberOfTrees}
            </div>
          ))
        ) : (
          <p>No trees found for this user.</p>
        )}
        <button onClick={onClose} className='mt-2 bg-red-500 text-white p-1 rounded'>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
