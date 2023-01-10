import React from "react";
import { useQuery } from "@apollo/client";
import Persons from "./Persons";
import { ALL_PERSONS } from "./queries";
import PersonForm from "./PersonForm";

function App() {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) return <div>loading...</div>;

  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  );
}

export default App;
