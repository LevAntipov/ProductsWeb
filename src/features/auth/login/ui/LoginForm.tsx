import { FieldError } from "@shared/ui/FieldError/FieldError";
import { Input } from "@shared/ui/Input/Input";
import { Link } from "react-router";
import classes from "./sign-in.module.css";
import { useLogin } from "../model/useLogin";

export const LoginForm = () => {
  const { email, password, error, handleLogin, setEmail, setPassword } =
    useLogin();

  return (
    <form className={classes.authPage}>
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

      {error && <FieldError errorMessage={error} />}

      <button onClick={handleLogin}>Login</button>

      <span>
        New to this shop?{" "}
        <Link to={"register"} className={classes.registerLink}>
          Register
        </Link>
      </span>
    </form>
  );
};
