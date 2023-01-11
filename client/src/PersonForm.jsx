import { useMutation } from "@apollo/client";
import React from "react";
import { ALL_PERSONS, CREATE_PERSON } from "./queries";

export default function PersonForm({ setError }) {
  const [field, setField] = React.useState({
    name: "",
    phone: "",
    street: "",
    city: "",
  });
  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      setError(error.message);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        };
      });
    },
  });

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    const { name, phone, street, city } = field;
    createPerson({
      variables: {
        name: name ? name : null,
        phone: phone ? phone : null,
        street: street ? street : null,
        city: city ? city : null,
      },
    });

    setField({
      name: "",
      phone: "",
      street: "",
      city: "",
    });
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input name="name" value={field.name} onChange={handleChange} />
        </div>
        <div>
          phone
          <input name="phone" value={field.phone} onChange={handleChange} />
        </div>
        <div>
          street
          <input name="street" value={field.street} onChange={handleChange} />
        </div>
        <div>
          city
          <input name="city" value={field.city} onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
