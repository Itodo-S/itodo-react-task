import React from "react";

const Table = ({ data }) => {
  return (
    <div className="w-full">
        <div className="grid gap-1 grid-cols-12 w-full">
          <div className="col-span-1 ml-2">#</div>
          <div className="text-left col-span-5">title</div>
          <div className="text-left col-span-3">author</div>
          <div className="text-right col-span-3 mr-3">most Liked</div>
        </div>

        {data.map((item, index) => (
          <div className="grid grid-cols-12 gap-1 w-full content-center border-[2px] rounded-xl mt-2 border-[#1D1D1D]" key={item.id}>
            <div className="col-span-1 ml-2 flex items-center"><p>{++index}</p></div>

            <div className="flex items-center p-1 col-span-5">
              <img
                className="w-[118px] h-16 rounded-lg"
                src={item.photo}
                alt=""
              />
              <p className="font-thin text-xl ml-2">{item.title}</p>
            </div>

            <div className="flex items-center col-span-3">
              <p className="font-thin text-[#DBFD51]">{item.username}</p>
            </div>

            <div className="col-span-3 flex justify-end items-center mr-3"><p className="font-thin text-right ">{item.like}</p></div>
          </div>
        ))}
    </div>
  );
};

export default Table;
