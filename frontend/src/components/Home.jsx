import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/video/getAllVideos"
        );
        console.log(res.data.videos);
        setVideos(res.data.videos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, []);
  return (
    <div className="p-10 grid grid-cols-3 grid-flow-row gap-10">
      {videos.map((video) => {
        return (
          <div key={video._id} className="h-[450px]">
            <video
              src={video.url}
              controls
              poster={video.thumbnail}
              className="h-[300px]"></video>
            <p className="text-white text-2xl font-bold">{video.title}</p>
            <p className="text-white text-2xl font-bold">{video.description}</p>
            <h1>{video.createdBy}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
