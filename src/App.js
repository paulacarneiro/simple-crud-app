import React, { useState, useEffect } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';

const App = () => {
  // const usersData = [
  //   { id: 1, name: 'Bailey Young', email: 'byoung@yahoo.com' },
  //   { id: 2, name: 'Jack Fischer', email: 'fischer35@gmail.com' }
  // ];
  const usersData = [];
  const initialFormState = { id: null, name: '', email: '' };

  const [users, setUsers] = useState(() => {
    const localUsers = JSON.parse(localStorage.getItem('users'));
    if (localUsers) {
      return localUsers.length ? localUsers : usersData;              // avoid error of trying to get length of null
    }
    return usersData;
  });

  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    if (editing) {
      updateUser(user.id, user);
      return;
    }
    
    user.id = users.length ? users.slice(-1)[0].id + 1 : 1;    // sets new user id to last user's id + 1. if there are no users, sets the id to 1
    setUsers([...users, user]);
  }

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  }

  const deleteAll = () => {
    setUsers(usersData);
  }

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, email: user.email });
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => user.id === id ? updatedUser : user));
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add user</h2>
          <AddUserForm addUser={addUser} currentUser={currentUser} editMode={editing}/>
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editUser={editUser} deleteAll={deleteAll} />
        </div>
      </div>
    </div>
  );
}

export default App;