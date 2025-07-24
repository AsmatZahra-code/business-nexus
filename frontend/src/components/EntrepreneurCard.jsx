import React from 'react';
import Button from './Button';
import Card from './Card'; // Make sure the path is correct
import { Link } from 'react-router-dom';
import defAvatar from '../assets/avatar-def.png'
const EntrepreneurCard = ({ entrepreneur, onRequest }) => {
  const { name, startup, pitch, _id,avatar } = entrepreneur;

  return (
    <Card className="mb-4">
       {/* Avatar */}
     <img
  src={
    avatar
      ? `http://localhost:5000${avatar}?t=${new Date().getTime()}`
      : defAvatar
  }
  alt={name}
  className="w-16 h-16 rounded-full object-cover border border-gray-300"
/>
      <h3 className="text-lg font-semibold text-indigo-700">{name}</h3>
      {startup && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Startup:</strong> {startup}
        </p>
      )}
      {pitch && (
        <p className="text-sm text-gray-600 mb-3">
          <strong>Pitch:</strong> {pitch}
        </p>
      )}
      <Button onClick={() => onRequest(_id)}>Message / Request</Button>
        <Link to={`/chat/${entrepreneur._id}`}>
        <button className="mt-2 ml-2 px-4 py-1 bg-green-500 text-white rounded">
          Chat
        </button>
      </Link>
    </Card>
  );
};

export default EntrepreneurCard;
