import { useMutation } from "@apollo/client";
import React from "react";
import { LOGIN } from "./queries";

export default function LoginForm({ setError, setToken }) {
  const [field, setField] = React.useState({
    username: "",
    password: "",
  });

  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      setError(err.message);
    },
  });

  React.useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]);

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    login({
      variables: {
        username: field.username ? field.username : null,
        password: field.password ? field.password : null,
      },
    });
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            name="username"
            value={field.username}
            onChange={handleChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={field.password}
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
