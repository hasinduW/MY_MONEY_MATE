import React from 'react';
import CARD_2 from "../../assets/images/card2.png";
import {LuTrendingUpDown} from "react-icons/lu";

const Authlayout = ({ children }) => {
  return <div className="flex">
    <div className="w-screen h-screen md:w-[60vw] px-8 pb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black"> My Money Mate</h2>
        {children}
    </div>

    <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5]" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />


        <div className="grid grid-cols-1 z-20">
            <StatsInfoCard
             icon={<LuTrendingUpDown />}
             label="Track Your Income & Expenses"
             value="Rs. 230,000"
             color="bg-primary"
        />
        </div>

        <img
        src={CARD_2}
        className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
        />

    </div>

    </div>;
};

export default Authlayout

const StatsInfoCard = ({icon, label, value, color}) =>{
    return <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md sahdow-purple-400/10 border border-gray-200/50 z-10">
        <div 
          className={'w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl'}
          >
          {icon}  
    </div>
    <div>
       <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
       <span className="text-[20px]">{value}</span>
    </div>
    </div>  
}
