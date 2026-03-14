import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { Input } from "../../shared/ui/Input/Input";
import { FieldError } from "../../shared/ui/FieldError/FieldError";

export const Register = () => {
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

  return (
    <div>
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

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
