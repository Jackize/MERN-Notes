import { useMutation } from "@apollo/client";
import React from "react";
import { EDIT_NUMBER } from "./queries";

export default function PhoneForm({ setError }) {
  const [field, setField] = React.useState({
    name: "",
    phone: "",
  });
  const [changeNumber, result] = useMutation(EDIT_NUMBER, {
    onError: (err) => {
      setError(err.graphQLErrors[0].message);
    },
  });

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("person not found");
    }
  }, [result.data]);
  const submit = (e) => {
    e.preventDefault();
    const { name, phone } = field;
    changeNumber({
      variables: {
        name: name ? name : null,
        phone: phone ? phone : null,
      },
    });

    setField({
      name: "",
      phone: "",
    });
  };
  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          name
          <input name="name" value={field.name} onChange={handleChange} />
        </div>
        <div>
          phone
          <input name="phone" value={field.phone} onChange={handleChange} />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  );
}
