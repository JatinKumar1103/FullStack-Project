import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios';
import PodcastCard from '../components/PodcastCard/PodcastCard';

const CategoriesPages = () => {
    const {cat} = useParams();
    const[podcast, setPodcast] = useState([]);
    useEffect(() => {
        const fetch = async()=>{
            const res = await axios.get(`http://localhost:4000/api/v1/podcast/category/${cat}`
              ,{withCredentials:true})
            setPodcast(res.data.data);
            
        }
        fetch();
    },[])
    
  return (
    <div className='px-4 py-4 lg:px-12'>
      <h1 className='text-xl font-semibold'>{cat}</h1>
      <div>
      <div className='w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {podcast && podcast.map((items,i) => ( 
            <div key={i}>
                <PodcastCard items= {items}/>{" "}
            </div>
        ))}
        {podcast && podcast.length === 0 && (
            <div className='text-3xl font-bold h-screen text-zinc-700 flex items-center justify-center'> 
            {" "}
            No Podcasts Rigth Now{" "}
            </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default CategoriesPages
