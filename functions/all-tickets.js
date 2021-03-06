const query = require("./util/query");

const GET_TICKETS = `
query {
    allTickets {
        data {
            _id
            row1
            row2
            row3
            owner {
                _id
                name
            }
        }
    }
}`;

exports.handler = async function () {
  const { data, errors } = await query(GET_TICKETS);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ tickets: data.allTickets.data }),
  };
};
