import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/teams/`;
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
      })
      .catch(error => {
        console.error('Teams fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
