import { Input } from "../../../shared/ui/Input/Input";
import { FieldError } from "../../../shared/ui/FieldError/FieldError";
import classes from "./sign-in.module.css";
import { useRegister } from "../api/useRegister";

export const Register = () => {
  const {
    email,
    password,
    confirmPassword,
    error,
    handleRegister,
    setConfirmPassword,
    setEmail,
    setPassword,
  } = useRegister();

  return (
    <div className={classes.authPage}>
      <div className={classes.containerPage}>
        <form onSubmit={handleRegister}>
          <h2>Register</h2>

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

          <Input
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="password"
          />

          {error && <FieldError errorMessage={error} />}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};
