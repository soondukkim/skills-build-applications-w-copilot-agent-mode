import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/leaderboard/`;
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setLeaders(items);
      })
      .catch(error => {
        console.error('Leaderboard fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map(leader => (
          <li key={leader.id}>{leader.username}: {leader.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
