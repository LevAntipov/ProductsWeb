import { useState } from "react";
import { Link } from "react-router";
import classes from "./Forms.module.css";
import { authClient } from "../../../lib/auth-client";
import { Input } from "../../../shared/ui/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        },
      },
    );

    if (error) {
      console.error(error);
      return;
    }

    console.log("LOGIN DATA:", data);
  };

  return (
    <div className={classes.formContainer}>
      <h2>Login</h2>

      <Input
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="email"
      />

      <Input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="password"
      />

      <button onClick={handleLogin}>Login</button>

      <span>
        New to this shop? <Link to={"register"}>Register</Link>
      </span>
    </div>
  );
}
