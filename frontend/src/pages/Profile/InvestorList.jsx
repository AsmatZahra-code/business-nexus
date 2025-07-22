import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InvestorList = () => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    axios.get('/api/investors', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      setInvestors(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Investors</h2>
      <ul>
        {investors.map(i => (
          <li key={i._id}>
            <Link to={`/profile/${i._id}`}>{i.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvestorList;
