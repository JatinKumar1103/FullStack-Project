import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" bg-green-100 px-12 h-screen lg:h-[89vh] flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-between ">
        <div className="w-full lg:w-5/6">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center lg:text-start">
            Create & listen the <br />
            <h1 className="flex items-end justify-center lg:justify-start mt-2 lg:mt-0">
              p
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2113/2113324.png"
                  alt="headphone"
                  className="h-11 md:h-12 lg:h-20 mx-1"
                />
              </span>
              dcast
            </h1>
          </h1>
        </div>
        <div className="hidden lg:block w-1/6">
        <div className="py-4 border border-black text-xl font-semibold rounded-full text-center -rotate-90 bg-white">
          Scroll Down
        </div>
        </div>
      </div>
      <div className="mt-12 w-full flex flex-col items-end justify-between lg:flex-row">
        <div className="flex flex-col items-center lg:items-start justify-center">
          <p className="text-xl font-semibold text-center lg:text-start">
            Listen to the most popular podcasts on just one platform -{" "}
            <b>PODFLOW</b>
          </p>
          <Link className="px-6 py-4 bg-green-900 text-white font-semibold rounded-full mt-6 lg:mt-8"
          to="/login">
            Login to listen
          </Link>
        </div>
        <div className="mt-6 lg:mt-0 ">
          <p className="text-zinc-600 font-bold text-center  lg:text-end ">Our app contains more than 2000 podcasts for you</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
