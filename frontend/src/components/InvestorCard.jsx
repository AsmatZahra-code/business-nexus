import React from 'react';
import Button from './Button';
import Card from './Card';
import { Link } from 'react-router-dom';
import defAvatar from '../assets/avatar-def.png'
const InvestorCard = ({ investor, onRequest, unread }) => {
  const { _id, name, bio, investmentInterests, avatar } = investor;

  return (
    <Card className="mb-4 flex items-start gap-4">
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

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-indigo-700">{name}</h3>

        {bio && (
          <p className="text-sm text-gray-600 mb-1">
            <strong>Bio:</strong> {bio}
          </p>
        )}

        {investmentInterests && (
          <p className="text-sm text-gray-600 mb-3">
            <strong>Interests:</strong> {investmentInterests}
          </p>
        )}

        <Button onClick={() => onRequest(_id)}>Connect</Button>

        <Link to={`/chat/${_id}`} className="relative inline-block mt-2 ml-2">
          <button className="px-4 py-1 bg-green-500 text-white rounded">
            Chat
          </button>
          {unread && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full animate-ping" />
          )}
        </Link>
      </div>
    </Card>
  );
};

export default InvestorCard;
