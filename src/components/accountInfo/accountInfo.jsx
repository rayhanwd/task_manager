import React, { useEffect, useState } from "react";
import { defaultProfilePic } from "../../images";

const AccountInfo = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    fullName: "",
    email: "",
    password: "",
    bio: "",
    userProfilePicture: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUpdatedUser({
          ...updatedUser,
          userProfilePicture: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const updatedCurrUser = { ...user };
    if (updatedUser.fullName) {
      updatedCurrUser.fullName = updatedUser.fullName;
    }

    if (updatedUser.email) {
      updatedCurrUser.email = updatedUser.email;
    }

    if (updatedUser.password) {
      updatedCurrUser.password = updatedUser.password;
    }
    if (updatedUser.bio) {
      updatedCurrUser.bio = updatedUser.bio;
    }
    if (updatedUser.userProfilePicture) {
      updatedCurrUser.userProfilePicture = updatedUser.userProfilePicture;
    }
    localStorage.setItem("currUser", JSON.stringify(updatedCurrUser));
    setUser(updatedCurrUser);
    const userList = JSON.parse(localStorage.getItem("userList"));

    const updatedUserList = userList.map((u) => {
      if (u.id === user.id) {
        return updatedCurrUser;
      }
      return u;
    });
    localStorage.setItem("userList", JSON.stringify(updatedUserList));
    setIsEditing(false);
  };

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    if (!currUser || Object.keys(currUser).length === 0) {
      localStorage.setItem("currUser", JSON.stringify({}));
    } else {
      setUser(currUser);
    }
  }, []);

  return (
    <div className="container w-full px-4 mx-auto sm:px-8">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          User information
        </h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">
          Details and information about the user.
        </p>
      </div>
      <div className="border-t border-gray-200">
        {isEditing ? (
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="fullName"
                value={
                  updatedUser.fullName ? updatedUser.fullName : user.fullName
                }
                className="border"
                onChange={handleInputChange}
              />
            </dd>
          </div>
        ) : (
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.fullName}
            </dd>
          </div>
        )}
        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Email address</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {isEditing ? (
              <input
                type="text"
                name="email"
                value={updatedUser.email ? updatedUser.email : user.email}
                className="border"
                onChange={handleInputChange}
              />
            ) : (
              user.email
            )}
          </dd>
        </div>

        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Password</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {isEditing ? (
              <input
                type="password"
                name="password"
                value={
                  updatedUser.password ? updatedUser.password : user.password
                }
                className="border"
                onChange={handleInputChange}
              />
            ) : (
              "********"
            )}
          </dd>
        </div>
        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Bio</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {isEditing ? (
              <textarea
                className="border"
                type="text"
                name="bio"
                value={updatedUser.bio ? updatedUser.bio : user.bio}
                onChange={handleInputChange}
              />
            ) : user.bio ? (
              user.bio
            ) : (
              "N/A"
            )}
          </dd>
        </div>

        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Profile photo</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {isEditing ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <img
                  src={
                    updatedUser.userProfilePicture
                      ? updatedUser.userProfilePicture
                      : user.userProfilePicture
                      ? user.userProfilePicture
                      : defaultProfilePic
                  }
                  alt="profilephoto"
                  className="w-20 h-20 mt-2"
                />
              </>
            ) : (
              <img
                src={
                  user.userProfilePicture
                    ? user.userProfilePicture
                    : defaultProfilePic
                }
                alt="profilephoto"
                className="w-20 h-20 mt-2"
              />
            )}
          </dd>
        </div>
        {isEditing ? (
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Actions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-gray-800 text-white rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2"
              >
                Cancel
              </button>
            </dd>
          </div>
        ) : (
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Actions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-800 text-white rounded-md"
              >
                Edit
              </button>
            </dd>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
