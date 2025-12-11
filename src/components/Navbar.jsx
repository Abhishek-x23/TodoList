import React from 'react'




const Navbar = ({onClear}) => {
  return (
    <div className="w-full bg-blue-900 text-white flex justify-between items-center px-8 py-2">
        <div className="1 font-bold text-2xl cursor-pointer ">My Todo</div>
        <div className="2 flex gap-5 text-[18px] ">
            <div className="11 hover:text-[20px] hover:font-semibold cursor-pointer">Home</div>
            <div className="12 hover:text-[20px] hover:font-semibold cursor-pointer">Your Tasks</div>
          <button onClick={onClear} className="clear hover:text-[20px] hover:font-semibold cursor-pointer">Clear All</button>
        </div>
      
    </div>
  )
}

export default Navbar
