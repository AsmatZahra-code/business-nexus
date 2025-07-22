// utils/socketUtils.js
function getRoomId(userA, userB) {
  return [userA, userB].sort().join('-');
}

module.exports = { getRoomId };
