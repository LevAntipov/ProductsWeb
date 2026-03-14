import { authClient } from "lib/auth-client";
import { useState } from "react";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          alert("logged in!");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setError(ctx.error.message);
        },
      },
    );

    if (error) {
      console.error(error);
      return;
    }

    console.log("LOGIN DATA:", data);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};
