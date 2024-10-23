import React from 'react';
import { FaTree, FaDonate, FaHandHoldingHeart } from 'react-icons/fa'; // Icons
import { Link, Outlet } from 'react-router-dom';
import StatsCard from './StatsCard';
import { GiFruitTree } from "react-icons/gi";





const HorizontalCards = () => {
  return (
    <>  
    
      <div className="container mx-auto mt-10">
      <div className="flex justify-between space-x-4">
        <Link className='w-full' to={'totaltrees'}>
        <StatsCard
          icon={FaTree}
          title="Trees in inventory"
          number="1,234"
        />
        </Link>
        <StatsCard
          icon={FaHandHoldingHeart}
          title="Total Doner"
          number="567"
        />
        <StatsCard
          icon={FaDonate}
          title="Total Volunteer"
          number="$10,000"
        />
        <StatsCard
          icon={GiFruitTree}
          title="Total Planted Trees"
          number="890"
        />
      </div>
    </div>
      <div className="container mx-auto mt-10">
      {/* <div className="flex justify-between space-x-4">
        <StatsCard
          icon={FaTree}
          title="Trees Donated"
          number="1,234"
        />
        <StatsCard
          icon={FaLandmark}
          title="Lands Donated"
          number="567"
        />
        <StatsCard
          icon={FaDonate}
          title="Money Donated"
          number="$10,000"
        />
        <StatsCard
          icon={FaHandHoldingHeart}
          title="Volunteer Hours"
          number="890"
        />
      </div> */}
<hr className='my-6 ' />

      <main className='mt-10'>
        <Outlet/>
      </main>
    </div>
    </>

  );
};




export default HorizontalCards;
