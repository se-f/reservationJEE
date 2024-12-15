import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/UserService";

const useRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);
      toast.success("Registration successful");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useRegister;