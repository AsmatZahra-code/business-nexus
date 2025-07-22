import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EntrepreneurList = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  useEffect(() => {
    axios.get('/api/entrepreneurs', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      setEntrepreneurs(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Entrepreneurs</h2>
      <ul>
        {entrepreneurs.map(e => (
          <li key={e._id}>
            <Link to={`/profile/${e._id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntrepreneurList;
