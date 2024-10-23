import React from 'react'
import { Link } from 'react-router-dom';
import StatsCard from './StatsCard';
import { FaTree, FaLandmark, FaDonate, FaHandHoldingHeart } from 'react-icons/fa'; // Icons
import treeGIF from '../../assets/tree.gif'

const TotalTrees = () => {
    return (
        <>  
        <div className="">
<h2 className='text-3xl text-center font-bold underline'>Trees Categories<img className='inline h-24 mb-3'src={treeGIF} alt="" />  </h2>
        <div className="container mx-auto mt-10">
            <div className="flex justify-between space-x-4">
              {/* First Row */}
              <StatsCard
                icon={FaTree}
                title="Banyan Tree"
                number="1,234"
                className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
              />
              <StatsCard
                icon={FaTree}
                title="Peepal Tree"
                number="567"
                className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
              />
              <StatsCard
                icon={FaTree}
                title="Bamboo Tree"
                number="$10,000"
                className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
              />
              <StatsCard
                icon={FaTree}
                title="Neem Tree"
                number="890"
                className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
              />
            </div>
          </div>
    
          <div className="container mx-auto mt-10">
            <div className="flex justify-between space-x-4">
              {/* Second Row */}
              <StatsCard
                icon={FaTree}
                title="Arjuna Tree"
                number="1,234"
                className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
              />
              <StatsCard
                icon={FaTree}
                title="Jamun Tree"
                number="567"
                classNameColor="text-white"
                className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
              />
              <StatsCard
                icon={FaTree}
                title="Sandalwood Tree"
                number="$10,000"
                className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
              />
              {/* <StatsCard
                icon={FaTree}
                title="Volunteer Hours"
                number="890"
                className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
              /> */}
            </div>
          </div>                                                                                                            

        </div>
        </>
      );
  
}

export default TotalTrees