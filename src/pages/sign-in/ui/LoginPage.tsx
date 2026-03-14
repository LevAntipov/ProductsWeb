import { Link } from "react-router";
import classes from "./sign-in.module.css";
import { useLogin } from "../api/useLogin";
import { Input } from "../../../shared/ui/Input/Input";
import { FieldError } from "../../../shared/ui/FieldError/FieldError";

export function LoginPage() {
  const { email, password, error, handleLogin, setEmail, setPassword } =
    useLogin();
  return (
    <div className={classes.authPage}>
      <div className={classes.containerPage}>
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
          New to this shop? <Link to={"register"}>Register</Link>
        </span>
      </div>
    </div>
  );
}
