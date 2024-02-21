import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link , useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const handleLogin = () => {
  //     // Add your login logic here
  //     console.log("Username:", username);
  //     console.log("Password:", password);
  //   };
  const navigate = useNavigate();

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`http://localhost:8000/user?name=${username}`)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
            console.log(resp);
          
          if (resp[0].name===username && resp[0].pass ===password) {
            toast.success('login successfully');
              navigate("/home");
            } else {
              toast.error("Please Enter valid credential");
            }
          
        })
        .catch((error) => {
            console.log(error);
          toast.error("login failed due to:" + error.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    let errorMessage = "Please enter ";
    if (username === "" || username === null) {
      result = false;
      errorMessage += "username ";
    }
    if (password === "" || password === null) {
      result = false;
      errorMessage += "password";
    }
    if (!result) {
      toast.warning(errorMessage);
    }
    return result;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={ProceedLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
              <span className="text-red-500"> *</span>
            </label>
            <input
              id="username"
              type="text"
             
              className="mt-1 p-2 w-full border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
              <span className="text-red-500"> *</span>
            </label>
            <input
              id="password"
              type="password"
           
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <button
                type="submit"
                // onClick={handleLogin}
                className=" py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Login
              </button>
            </div>
            <div>
              <Link
                className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
                to={"/register"}
              >
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
