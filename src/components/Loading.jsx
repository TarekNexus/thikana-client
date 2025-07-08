import React from 'react';

const Loading = () => {
    return (
      <div className="min-h-screen flex justify-center items-center">
      <span
        className="loading loading-infinity text-[#00aeff]"
        style={{ width: "4rem", height: "4rem" }}
      ></span>
    </div>
    );
};

export default Loading;