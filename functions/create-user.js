const query = require("./util/query");

const CREATE_USER = `
mutation($name: String!, 
    $row1: [String!]!, 
    $row2: [String!]!,
    $row3: [String!]!) {
    createUser(data: {
      name: $name
      ticket: {
        create: {
          row1: $row1
          row2: $row2
          row3: $row3
        }
      }
    }) {
      _id
    }
  }`

exports.handler = async function(event) {
    const { name, row1, row2, row3 } = JSON.parse(event.body);
    const { data, errors } = await query(CREATE_USER, { name, row1, row2, row3 });

    if(errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    } 

    return {
        statusCode: 200,
        body: JSON.stringify({ userId: data.createUser._id })
    }
}