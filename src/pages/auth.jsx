import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRandomId, isValidEmail } from "../utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BiTask } from "react-icons/bi";

const MySwal = withReactContent(Swal);

const Authentication = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    bio: "",
    fullName: "",
    userProfilePicture: "",
    isCreatingAccount: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for the field when the user starts typing again
    setErrors({ ...errors, [name]: "" });
  };

  const resetFields = (iscreate = false) => {
    setFormData({
      email: "",
      password: "",
      bio: "",
      fullName: "",
      userProfilePicture: "",
      isCreatingAccount: iscreate,
    });

    setErrors({
      email: "",
      password: "",
      fullName: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      password,
      bio,
      fullName,
      isCreatingAccount,
      userProfilePicture,
    } = formData;

    // Validation logic here
    let formIsValid = true;
    const newErrors = { email: "", password: "", fullName: "" };

    if (!email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    }

    if (isCreatingAccount && !fullName) {
      newErrors.fullName = "Full Name is required for sign up";
      formIsValid = false;
    }

    if (formIsValid) {
      // Check if user exists when logging in
      if (!isCreatingAccount) {
        const userList = JSON.parse(localStorage.getItem("userList")) || [];
        if (!userList?.length || userList?.length === 0) {
          newErrors.email = "Invalid email or password";
          formIsValid = false;
          setErrors(newErrors);
        } else {
          const existingUser = userList.find(
            (user) => user.email === email && user.password === password
          );
          if (!existingUser) {
            newErrors.email = "Invalid email or password";
            formIsValid = false;
            setErrors(newErrors);
          } else {
            localStorage.setItem("currUser", JSON.stringify(existingUser));
            window.dispatchEvent(new Event("storage"));
            MySwal.fire({
              title: "Account login successfully",
              text: "This is a custom modal with React components.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard");
          }
        }
      }

      if (formIsValid) {
        if (isCreatingAccount) {
          const userId = generateRandomId();
          const newUser = {
            id: userId,
            email,
            password,
            bio,
            fullName,
            userProfilePicture,
          };

          const userList = JSON.parse(localStorage.getItem("userList")) || [];
          userList.push(newUser);
          localStorage.setItem("userList", JSON.stringify(userList));
          window.dispatchEvent(new Event("storage"));
          localStorage.setItem("currUser", JSON.stringify(newUser));
          window.dispatchEvent(new Event("storage"));
          resetFields();
          navigate("/dashboard");
          MySwal.fire({
            title: "Account created successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center justify-center">
          <BiTask className="text-indigo-600 text-4xl" />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {`${
            formData.isCreatingAccount ? "Sign up" : "Log in"
          } to your account`}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {formData.isCreatingAccount && (
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  name="fullName"
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ${
                    errors.fullName ? "ring-red-500" : ""
                  }`}
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                autoComplete="email"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ${
                  errors.email ? "ring-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ${
                  errors.password ? "ring-red-500" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {formData.isCreatingAccount ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {formData.isCreatingAccount ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => resetFields(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Not a member?{" "}
              <button
                type="button"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => resetFields(true)}
              >
                Create an account
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Authentication;
