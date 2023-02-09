
const isUser = (request, response) => {
  response.send(JSON.stringify(true));
};

const isAdmin = (request, response) => {
  response.send(JSON.stringify(true));
};

module.exports = {
  isUser,
  isAdmin
};
