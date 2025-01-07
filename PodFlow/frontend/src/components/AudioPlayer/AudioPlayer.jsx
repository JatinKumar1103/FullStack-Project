import React, { useEffect, useRef, useState } from "react";
import { IoIosSkipBackward } from "react-icons/io";
import { IoIosSkipForward } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player";
import { current } from "@reduxjs/toolkit";
import { IoPlaySharp } from "react-icons/io5";

const AudioPlayer = () => {
  const[duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState();
  
 
  const [isSongPlaying,setIsSongPlaying] = useState(false)
  const dispatch = useDispatch();
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const img = useSelector((state) => state.player.img);
  // console.log(PlayerDivState);
  const closeAudioPlayerDiv = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
  };

  const audioRef = useRef(null);
  const formatTime = (time) => {
    const minute = Math.floor(time/60);
    const second = Math.floor(time % 60);
    return `${minute}:${second < 10 ? '0' : ""}${second}`

  }
  const handleTimeUpdate = () => {
    if(audioRef.current){
      setCurrentTime(audioRef.current.currentTime);
    }
  }
  const handleLoadedMetaData = () => {
    if(audioRef.current){
      setDuration(audioRef.current.duration);
    }
  }

  useEffect(() => {
    handlePlayPodcast()
    const currentAudio = audioRef.current;
    if(currentAudio){
      currentAudio.addEventListener("timeupdate",handleTimeUpdate);
      currentAudio.addEventListener("loadedmetadata",handleLoadedMetaData)
    }
    
  },[songPath])

  const handlePlayPodcast = () => {
    // e.preventDefault();
    setIsSongPlaying(!isSongPlaying)
    if(isSongPlaying){
      audioRef.current.pause();
    } else{
      audioRef.current.play();
    }
  }
  const handleBackward = () => {
    if(audioRef.current){
      let newTime = Math.max(currentTime - 10, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      audioRef.current.play();
    }
  }
  const handleForward = () => {
    if(audioRef.current){
      let newTime = Math.min(currentTime +10, duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      audioRef.current.play();
    }
  }
  const handleRange = (e) => {
    if(audioRef.current){
      const newTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      audioRef.current.play();
    }
  }

  return (
    <div
      className={`${
        PlayerDivState ? "fixed" : "hidden"
      } bottom-0 left-0 w-[100%]  bg-zinc-900 text-zinc-300 p-4 rounded flex items-center gap-4 `}
    >
      <div className="hidden md:block w-1/3">
        <img
          src={img}
          alt=""
          className={`size-12 rounded-full object-cover`}
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-4 text-xl">
          <button onClick={handleBackward}>
            <IoIosSkipBackward />
          </button>
          <button onClick={handlePlayPodcast}>
            {isSongPlaying ? <IoIosPause /> : <IoPlaySharp/>}
          </button>
          <button onClick={handleForward}>
            <IoIosSkipForward />
          </button>
        </div>
        <div className="w-full flex items-center justify-center mt-3">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime/duration) * 100 || 0}
            className="w-full hover:cursor-pointer"
            onChange = {handleRange}
          />
        </div>
        <div className="w-full flex items-center justify-between text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-1/3 flex  items-center justify-end">
        <button onClick={closeAudioPlayerDiv}>
          <ImCross />
        </button>
      </div>
      <audio ref={audioRef} src={songPath} ></audio>
    </div>
  );
};

export default AudioPlayer;
