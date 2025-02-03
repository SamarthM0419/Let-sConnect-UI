import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  // console.log(connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return (
      <h1 className="font-bold text-2xl text-center pt-5">
        No Connections Found
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl text-white">Connections</h1>

      {connections.map((connection) => {
        const {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
          skills,
          _id,
        } = connection;
        return (
          <div key={_id} className=" flex m-4 p-4  bg-base-300 w-3/4 mx-auto">
            <div className="w-32">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className=" pl-8 text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
              {age && gender && skills && (
                <p>{age + " ," + gender + ", " + skills}</p>
              )}
            </div>
            <Link to={"/chat/ " + _id}>
              <div className="ml-60 mt-5 btn btn-primary ">Chat</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
