import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { MdSubscriptions } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { MdFeaturedPlayList } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeUserRes = await axios.get(
          "http://localhost:3000/api/user/getActiveUser"
        );

        console.log(activeUserRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <button className="flex gap-2">
          <PiVideoFill className="text-slate-400 text-5xl shadow-md shadow-gray-400" />
          <p className="text-slate-400 text-4xl font-bold">Pi Video</p>
        </button>
        <div className="flex">
          <input
            type="text"
            name=""
            placeholder="Search..."
            className="font-semibold focus:outline-none border-2 w-[600px] h-12 px-10 text-lg rounded-tl-3xl rounded-bl-3xl"
          />
          <button className="bg-black h-12 w-16 flex items-center justify-center rounded-tr-3xl rounded-br-3xl">
            <CiSearch className="text-3xl text-white" />
          </button>
        </div>
        <div className="flex gap-6">
          <button
            className="flex items-center justify-center gap-1 bg-slate-400 h-12 w-48 text-lg font-semibold rounded-lg"
            onClick={() => navigate("/upload")}>
            <FaCloudUploadAlt className="text-3xl" />
            Upload Video
          </button>
          <img
            src="profile.jpg"
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
        </div>
      </div>
      <div className="flex mt-10 gap-10 justify-end">
        <button
          className="flex items-center justify-center gap-1 font-bold text-lg bg-slate-400 px-2 py-1 rounded-2xl shadow-md shadow-black hover:scale-95 active:scale-105"
          onClick={() => navigate("/")}>
          <FaHome />
          Home
        </button>
        <button className="flex items-center justify-center gap-1 font-bold text-lg bg-slate-400 px-2 py-1 rounded-2xl shadow-md shadow-black hover:scale-95 active:scale-105">
          <IoMdTrendingUp />
          Trending
        </button>
        <button className="flex items-center justify-center gap-1 font-bold text-lg bg-slate-400 px-2 py-1 rounded-2xl shadow-md shadow-black hover:scale-95 active:scale-105">
          <MdSubscriptions />
          Subscription
        </button>
        <button className="flex items-center justify-center gap-1 font-bold text-lg bg-slate-400 px-2 py-1 rounded-2xl shadow-md shadow-black hover:scale-95 active:scale-105">
          <AiFillLike />
          Liked Videos
        </button>
        <button className="flex items-center justify-center gap-1 font-bold text-lg bg-slate-400 px-2 py-1 rounded-2xl shadow-md shadow-black hover:scale-95 active:scale-105">
          <MdWatchLater />
          Watch Later
        </button>
        <button className="flex items-center justify-center gap-1 font-bold text-lg bg-slate-400 px-2 py-1 rounded-2xl shadow-md shadow-black hover:scale-95 active:scale-105">
          <MdFeaturedPlayList />
          PlayList
        </button>
      </div>
    </div>
  );
}

export default Navbar;
