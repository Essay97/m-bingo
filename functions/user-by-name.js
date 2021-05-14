const query = require("./util/query");

const GET_USER_BY_NAME = `
query($name: String!) {
    findUserByName(name: $name) {
      _id
      name
      ticket {
        _id
        row1
        row2
        row3
      }
    }
}`;

exports.handler = async function (event) {
  const { name } = JSON.parse(event.body);
  const response = await query(GET_USER_BY_NAME, { name });

  if (response.errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(response.errors),
    };
  }

  if (response.data.findUserByName === null) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: null,
        ticket: null,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      user: response.data.findUserByName,
      ticket: response.data.findUserByName.ticket,
    }),
  };
};
