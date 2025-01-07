import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {playerActions} from "../../store/player"

const PodcastCard = ({ items }) => {
  const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    // console.log(items._id)
    const handlePlay = (e) => {
      if(isLoggedIn) {
        e.preventDefault();
      dispatch(playerActions.setDiv());
      dispatch(playerActions.changeImage(`http://localhost:4000/uploads/${items.frontImage
              .split("\\")
              .pop()}`));
      dispatch(playerActions.changeSong(`http://localhost:4000/uploads/${items.audioFile .split("\\")
              .pop()}`))
      }
    };
  return (
    <div>
      <Link
        to={`/description/${items._id}`}
        className="border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 size-fit"
      >
        <div>
          <img
            src={`http://localhost:4000/uploads/${items.frontImage
              .split("\\")
              .pop()}`}
            className="rounded size-[42vh] object-cover"
          />
        </div>
        <div className="mt-2 text-xl font-bold">{items.title.slice(0, 20)}</div>
        <div className="mt-2 leading-5 text-slate-500">
          {items.description.slice(0, 50)}
        </div>
        <div className="mt-2 bg-slate-300 text-black border border-black rounded-full px-4 py-2 text-center">{items.category.categoryName}</div>
        <div className="mt-2">
            <Link 
            to={isLoggedIn ? "#" : "/signup"}
            className="bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300 "
            onClick={handlePlay}>Play Now</Link>
        </div>
      </Link>
    </div>
  );
};

export default PodcastCard;