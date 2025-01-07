import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Description = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/podcast/getPodcast/${id}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data.data.frontImage)
        setPodcast(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      ;
    };
    fetch();
    
    
    
    
  }, []);
 

  if (loading) {
    return (
      <div className="text-center text-2xl font-bold w-full">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-2xl font-bold w-full text-red-500">
        Error: {error}
      </div>
    );
  }

  
  return (
    <div className="px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4">
      {podcast && (
        <>
          <div className="w-2/6 flex items-center justify-center md:justify-start md:items-start">
            <img
              src={`http://localhost:4000/uploads/${podcast.frontImage
              .split("\\")
              .pop()}`}
              alt="/"
              className="rounded w-full h-[50vh] object-contain "
            />
          </div>
          <div className="w-4/6">
            <div className="text-4xl font-semibold">{podcast.title}</div>
            <h4 className="mt-4">{podcast.description}</h4>
            <div className="mt-2 w-fit bg-slate-300 text-black border border-black rounded-full px-4 py-2 text-center">
              {podcast?.category?.categoryName}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Description;
