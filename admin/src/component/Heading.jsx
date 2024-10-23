import React from 'react';
import logo01 from '../assets/oxyVan-logo-ADMIN.png';

const Heading = () => {
  return (
    <>
      <div className="flex justify-center items-center space-x-4 border-gr pb-1 ">
        <div className='text-6xl'>OxyVan</div>
        <div className="">
          <img src={logo01} className='h-16 mt-1' alt="OxyVan Logo" />
        </div>
      </div>
    </>
  );
}

export default Heading;
