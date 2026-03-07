import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/users/`;
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setUsers(items);
      })
      .catch(error => {
        console.error('Users fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
