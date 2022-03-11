import React, { useState, useEffect } from 'react';

const AddUserForm = (props) => {
  const initialFormState = { id: null, name: '', email: '' };
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser)
  }, [props.currentUser]); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({...user, [name]: value});
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.email) return;

    props.addUser(user);
    setUser(initialFormState);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange}/>
      <label>Email</label>
      <input type="text" name="email" value={user.email} onChange={handleInputChange}/>
      <button>{props.editMode? "Update user" : "Add new user"}</button>
    </form>
  );
}

export default AddUserForm;