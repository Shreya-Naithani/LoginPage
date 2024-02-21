import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const[id ,setId]=useState('');
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const isValidate = () => {
    let errorMessage = "Please enter your ";
    let isProceed = true;
    if (name === null || name === "") {
      isProceed = false;
      errorMessage += "name ";
    }
    if (email === null || email === "") {
      isProceed = false;
      errorMessage += "email ";
    }
    if (pass === null || pass === "") {
      isProceed = false;
      errorMessage += "password ";
    }
    if (!isProceed) {
      toast.warning(errorMessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isProceed = false;
        toast.warning("Please enter valid email");
      }
    }
    return isProceed;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = { name, email, pass };
    console.log(obj);

    if (isValidate()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        header: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          toast.success("Registered Successfully");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("Failed:" + error.message);
        });
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6"> User Registration</h1>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="mt-1 p-2 w-full border rounded-md "
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              name="password"
              placeholder="********"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 hover:scale-105 mr-2"
          >
            Register
          </button>
          {/* <button className="bg-red-500  text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800 cursor-pointer hover:scale-105">
            Back
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
