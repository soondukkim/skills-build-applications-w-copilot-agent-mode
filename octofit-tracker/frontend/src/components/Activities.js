import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/activities/`;
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setActivities(items);
      })
      .catch(error => {
        console.error('Activities fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
