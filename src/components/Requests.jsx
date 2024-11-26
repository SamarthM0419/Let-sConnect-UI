import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return;
  }

  if (requests.length === 0) {
    return <h1 className="font-bold text-2xl">No Requests Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl text-white">Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, age, gender, about, photoUrl, skills } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className=" flex justify-between items-center m-4 p-4  bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
              {age && gender && skills && (
                <p>{age + " " + gender + " " + skills}</p>
              )}
            </div>
            <div className="flex">
              <button className="btn btn-secondary m-4 p-4">Accept</button>
              <button className="btn btn-primary m-4 p-4">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
