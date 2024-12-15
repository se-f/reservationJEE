import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/UserService";

const useLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", formData.username);
      console.log(
        "Login successful",
        localStorage.getItem("token"),
        localStorage.getItem("username")
      );

      toast.success("Login successful");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;