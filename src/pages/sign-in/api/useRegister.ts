import { useState } from "react";
import { authClient } from "../../../lib/auth-client";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return setError("Passwords are not equal");
    }

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: "User",
    });

    if (error) {
      alert(error.message);
      return;
    }

    console.log("USER:", data);
    alert("registered!");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    handleRegister,
  };
};
