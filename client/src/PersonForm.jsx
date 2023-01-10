import { useMutation } from "@apollo/client";
import React from "react";
import { ALL_PERSONS, CREATE_PERSON } from "./queries";

export default function PersonForm() {
  const [field, setField] = React.useState({
    name: null,
    phone: null,
    street: null,
    city: null,
  });
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
  });

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    console.log({ ...field });
    createPerson({ variables: { ...field } });

    setField({
      name: null,
      phone: null,
      street: null,
      city: null,
    });
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            name="name"
            value={field.name ? field.name : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          phone
          <input
            name="phone"
            value={field.phone ? field.phone : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          street
          <input
            name="street"
            value={field.street ? field.street : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          city
          <input
            name="city"
            value={field.city ? field.city : ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
