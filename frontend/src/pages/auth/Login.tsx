import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await dispatch(login({ email, password }) as any);
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
            console.log(e.target.value)
            setPassword(e.target.value)}
        }
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;