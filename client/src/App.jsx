import React from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import Persons from "./Persons";
import { ALL_PERSONS } from "./queries";
import PersonForm from "./PersonForm";
import Notify from "./Notify";
import PhoneForm from "./PhoneForm";
import LoginForm from "./LoginForm";

function App() {
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const client = useApolloClient();

  if (result.loading) return <div>loading...</div>;

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>Logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}

export default App;
