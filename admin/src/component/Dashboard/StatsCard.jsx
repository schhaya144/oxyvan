import React from 'react';

const StatsCard = ({ icon: Icon, title, number, className }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition transform hover:-translate-y-2 hover:shadow-xl duration-300 w-full  ${className}`}
    >
      <div className={`flex items-center text-slate-50`}>
        <Icon className={`text-green-700 text-4xl mr-4 `} />
        <div >
          <h4 className={`text-xl font-semibold text-gray-700 `}>{title}</h4>
          <p className={`text-3xl font-bold text-gray-900 `}>{number}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
