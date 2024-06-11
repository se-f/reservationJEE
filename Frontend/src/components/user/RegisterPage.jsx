import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"USER"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8081/register",
        formData
      );
      toast.success("Registration successful");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
      console.log("Registration successful", response.data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <div className="flex w-[100px]">
          <img src="https://img.freepik.com/vecteurs-premium/modele-conception-vecteur-logo-icone-hotel_827767-3569.jpg" />
        </div>
        <form onSubmit={handleSubmit} className="w-3/4 bg-white p-8 rounded">
          <h2 className="text-4xl text-bold text-center mb-12">Register</h2>
          <div className="mb-8">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 p-2 pl-4 block w-full border-gray-300 rounded-md bg-slate-100"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 pl-4 block w-full border-gray-300 rounded-md bg-slate-100"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 pl-4 block w-full border-gray-300 rounded-md bg-slate-100"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 p-2 pl-4 block w-full border-gray-300 rounded-md bg-slate-100"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600 mb-5 mt-1"
          >
            Register
          </button>
        </form>
      </div>
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.cnn.com/api/v1/images/stellar/prod/160920111124-beachfront-hotel-14-four-seasons-maui-1.jpg?q=w_1900,h_1069,x_0,y_0,c_fill')",
        }}
      ></div>
    </div>
  );
};

export default RegisterPage;
