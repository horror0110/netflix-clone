import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black py-8 px-4 sm:px-3 lg:px-4 w-full mt-10  ">
      <div className=" mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/logo.jpg" alt="Netflix Logo" className="h-8" />
          <span className="text-gray-400 mx-2 text-[10px] md:text-sm">
            Netflix Clone
          </span>
        </div>
        <div className="text-gray-400 text-[10px] md:text-sm">
          <span className="mr-4">Home</span>
          <span className="mr-4">Series</span>
          <span className="mr-4">Films</span>
          <span className="mr-4">New & Popular</span>
          <span className="mr-4">My List</span>
          <span className="mr-4">Browse by langages</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
