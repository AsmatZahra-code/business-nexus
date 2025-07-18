import React from 'react';
import Button from './Button';
import Card from './Card'; // Make sure the path is correct

const EntrepreneurCard = ({ entrepreneur, onRequest }) => {
  const { name, startup, pitch, _id } = entrepreneur;

  return (
    <Card className="mb-4">
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
    </Card>
  );
};

export default EntrepreneurCard;
