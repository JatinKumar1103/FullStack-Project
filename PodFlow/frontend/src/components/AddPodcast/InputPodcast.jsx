import React, { useState } from "react";
import axios from "axios"
import {toast,ToastContainer} from 'react-toastify'
const InputPodcast = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [audioFile, setAudioFile] = useState();
  const [inputValues, setInputValues] = useState({
    title:"",
    description:"",
    category:""
  })

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFrontImage(file);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  }
  const handleDropChange = (e) => {
    console.log("Dropped")
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    console.log(file)
    if (file) setFrontImage(file);
  };
  
  const handleAudioFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAudioFile(file)
  }
  const onChangeInputs = (e) => {
    const {name, value} = e.target;
    setInputValues({
     ...inputValues,
      [name]:value
    })
  }
  const handleSubmitPodcast = async (e) => {
    e.preventDefault();
    // console.log(inputValues, frontImage, audioFile)
    const data = new FormData();
    
    data.append("title", inputValues.title);
    data.append("description", inputValues.description);
    data.append("category", inputValues.category);
    data.append("frontImage", frontImage);
    data.append("audioFile", audioFile);
    try{
      const res = await axios.post("http://localhost:4000/api/v1/podcast/addpodcast",
        data,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          },
          withCredentials:true,
        }
      )
      
      toast.success(res.data.data)
        

    }
    catch(error){
      console.log(error.response)
      const errorMessage = error.response?.data.match(/Error: (.*?)<br>/)?.[1];
      if (errorMessage) {
          toast.error(errorMessage);
      } else {
          toast.error('An unexpected error occurred');
      }
    }finally{
      setInputValues({
        title:"",
        description:"",
        category:""
      });
      setFrontImage(null);
      setAudioFile(null);
    }
    
  }
  
  
  return (
    <div className="my-4 px-4 lg:px-12">
      <ToastContainer/>
      <h1 className="text-2xl font-semibold">Create your podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-2/6 flex items-center justify-center lg:justify-start">
          <div
            className="size-[20vh] lg:size-[60vh] flex items-center justify-center hover:bg-slate-100 transition-all duration-300"
            style={{ border: "1px dashed black" }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDropChange}
          >
            <input
              type="file"
              accept="image/*"
              id="file"
              name="frontImage"
              className="hidden"
              onChange={handleChange}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="thumbnail"
                className="h-[100%] w-[100%] object-cover"
              />
            ) : (
              <label
                htmlFor="file"
                className={`text-xl p-4 h-[100%] w-[100%] hover:cursor-pointer flex items-center justify-center ${
                  dragging ? "bg-blue-200" : ""
                } hover:bg-zinc-200 transition-all duration-300`}
              >
                <div className="text-center lg:text-lg sm:text-sm">
                  Drag and drop the thumbnail or Click to browse
                </div>
              </label>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title for your podcast"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
              value={inputValues.title}
              onChange={onChangeInputs}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="title">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Description for your podcast"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
              rows={4}
              value={inputValues.description}
              onChange={onChangeInputs}

            />
          </div>
          <div className="flex  mt-4">
            <div className="felx flex-col w-2/6">
              <label htmlFor="audioFile">Select Audio</label>
              <input
                type="file"
                accept=".mp3, .wav, .m4a, .ogg "
                id="audioFile"
                className="mt-4"
                // value={audioFile}
                onChange={handleAudioFile}
              />
            </div>
            <div className="flex flex-col w-4/6">
              <label htmlFor="category">Select Category</label>
              <select
                name="category"
                id="category"
                className="border border-zinc-900 rounded mt-4 outline-none px-4 py-2"
                value={inputValues.category}
              onChange={onChangeInputs}
              >
                <option value="">Select category</option>
                <option value="Comedy">Comedy</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Government">Government</option>
              </select>
            </div>
          </div>
          <div className="mt-8 lg:mt-6 flex">
            <button className="bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zince-800 transition-all duration-300" onClick={handleSubmitPodcast}>
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
