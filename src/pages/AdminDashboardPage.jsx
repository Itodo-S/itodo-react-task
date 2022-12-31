import React, { useState, useEffect } from "react";
import { AuthContext } from "../authContext";
import Table from "../components/Table";
import { useSearchParams } from "react-router-dom";

const AdminDashboardPage = () => {
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { state } = React.useContext(AuthContext);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const { setLogout } = React.useContext(AuthContext);
  const fetchApi = async () => {
    const response = await fetch(
      `https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
          "x-project":
            "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
        },
        body: JSON.stringify({
          payload: offset,
          page: currentPage,
          limit: limit,
        }),
      }
    );

    const jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData.list);
  };

  const nextPage = () => {
    setSearchParams({ page: currentPage + 1 });
    setCurrentPage(currentPage + 1);
    setOffset(offset + limit);
  };

  const previousPage = () => {
    setSearchParams({ page: currentPage - 1 });
    setCurrentPage(currentPage - 1);
    setOffset(offset - limit);
  };

  const isNextBtnDisabled = () =>
    currentPage > offset && offset + limit < currentPage;
  const isPrevBtnDisabled = () => offset > 0;

  const handleLogout = () => {
    setLogout({ type: "LOGOUT" });
  };

  useEffect(() => {
    if (queryPage === null) {
      setSearchParams({ page: currentPage });
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, [offset, limit]);

  React.useEffect(() => {
    fetchApi();
  }, []);
  return (
    <>
      <div className="w-full bg-[#111111] flex justify-center h-full text-gray-700 ">
        <div className="container p-10">
          <div className="flex justify-between items-center w-full">
            <div className="text-white font-black text-5xl">
              <p>APP</p>
            </div>

            <div className="">
              <button
                onClick={handleLogout}
                className="rounded-[40px] bg-[#9BFF00] hover:bg-[#9BFF70] transition-colors  w-32 h-10 text-[#050505]"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-20">
            <div className="">
              <p className="font-thin text-[40px] text-white">
                Today’s leaderboard
              </p>
            </div>

            <div className="">
              <div className="bg-[#1D1D1D] w-[418px] h-14 rounded-2xl flex justify-center items-center">
                <p>
                  30 May 2022 .{" "}
                  <span className="bg-[#9BFF00] p-1 px-5 rounded-lg ">
                    Submissions OPEN
                  </span>{" "}
                  . 11:34
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-10">
            <Table data={data} />
          </div>

          <div className="flex mt-2">
            <button
              disabled={!isPrevBtnDisabled()}
              onClick={previousPage}
              className={
                "border hover:bg-[#1D1D1D] transition-colors border-[#9BFF00]  rounded-md text-white font-thin w-28"
              }
            >
              PREVIOUS
            </button>
            <button
              disabled={isNextBtnDisabled()}
              onClick={nextPage}
              className="ml-2 border hover:bg-[#1D1D1D] transition-colors border-[#9BFF00] rounded-md text-white font-thin w-28"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
