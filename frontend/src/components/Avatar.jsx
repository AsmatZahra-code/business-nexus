import React from "react";

const Avatar = ({ src, alt = "avatar", size = "40" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="rounded-full object-cover"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Avatar;
