import React from "react";


const baseURL = `http://${window.location.hostname}:3001/`;

const RingBell: React.FC = () => {
  const handleClick = async () => {
    try {
      const response = await fetch(`${baseURL}ringbell`, {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (data.success) {
        console.log(data);
        
      }
    } catch (error) {
      console.error("Error ringing the bell:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl mb-4">Click the bell button</h2>
      <button 
        onClick={handleClick} 
        className="p-2 bg-blue-500 text-white rounded">
        Ring Bell
      </button>
    </div>
  );
};

export default RingBell;
