import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../store/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, about, photoUrl, skills, _id } =
    user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-300 w-64 sm:w-72 md:w-80 shadow-xl mx-auto">
      <figure>
        <img
          src={photoUrl}
          alt={`${firstName}'s photo`}
          className="w-full h-42 object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base sm:text-lg">
          {firstName + " " + lastName}
        </h2>
        {age && gender && skills && (
          <p className="text-sm">{`${age}, ${gender} , ${skills}`}</p>
        )}
        <p className="text-xs">{about}</p>

        <div className="card-actions justify-center my-2 space-x-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
