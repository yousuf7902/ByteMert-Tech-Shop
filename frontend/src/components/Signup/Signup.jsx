import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const handleImageData = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

      const validateForm = () => {
          let isValid = true;

          // Name validation
          if (!name.trim()) {
              toast.error("Name is required");
              isValid = false;
          } else if (name.length < 4) {
              toast.error("Name should be at least 4 characters long");
              isValid = false;
          }

          // Password validation
          if (!password) {
              toast.error("Password is required");
              isValid = false;
          } else if (password.length < 8) {
              toast.error("Password should be at least 8 characters long");
              isValid = false;
          } else if (
              !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)
          ) {
              toast.error(
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
              );
              isValid = false;
          }

          return isValid;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(validateForm()){
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            };
            const newFormData = new FormData();

            newFormData.append("file", avatar);
            newFormData.append("name", name);
            newFormData.append("email", email);
            newFormData.append("password", password);

            axios
                .post(`${server}/users/sign-up`, newFormData, config)
                .then((res) => {
                    toast.success(res.data.message);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setAvatar();
                })
                .catch((err) => {
                    toast.error(err.response?.data.message);
                });
        }
    };

    return (
        <div className="min-h-[80vh] bg-gray-50 flex flex-col justify-center items-center sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-4 text-center 400px:text-2xl sm:text-3xl font-extrabold text-blue-900 ">
                    Register to your account
                </h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md 400px:w-11/12 400px:px-2">
                <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
                    {/* Registration Form starts here....*/}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Fullname area */}
                        <div>
                            <label
                                htmlFor="fullname"
                                className="block text-lg font-medium text-blue-800"
                            >
                                Full Name:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                />
                            </div>
                        </div>
                        {/* Email area */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-blue-800"
                            >
                                Email Address:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                />
                            </div>
                        </div>
                        {/* Password area */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-lg font-medium text-blue-800"
                            >
                                Password:
                            </label>
                            <div className="mt-2 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                />
                                {visible ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-3 cursor-pointer text-blue-800"
                                        size={25}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-3 cursor-pointer text-blue-800"
                                        size={25}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>
                        {/* Image upload area */}
                        <div>
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-medium text-gray-700"
                            ></label>
                            <div className="mt-2 flex items-center">
                                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                                    {avatar ? (
                                        <img
                                            src={URL.createObjectURL(avatar)}
                                            alt="avatar"
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <RxAvatar className="h-8 w-8 text-blue-900" />
                                    )}
                                </span>
                                <label
                                    htmlFor="file-input"
                                    className="ml-5 flex items-center justify-center px-5 py-3 border border-gray-600 rounded-lg shadow-sm text-sm font-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        type="file"
                                        name="avatar"
                                        id="file-input"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageData}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>
                        {/* Button area */}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full justify-center py-2 px-4 border border-transparent text-lg font-semibold rounded-md text-white bg-blue-900 hover:bg-blue-800 mt-4"
                            >
                                Submit
                            </button>
                        </div>
                        {/* Sign in option area */}
                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Already have an account?</h4>
                            <Link to="/login" className="text-blue-600 font-semibold ml-2">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
