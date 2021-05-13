const query = require("./util/query");

const UPDATE_TICKET = `
mutation($row1: [String!]!, $row2: [String!]!, 
    $row3: [String!]!, $id: ID!) {
    updateTicket(id: $id,
    data: {
      row1: $row1,
      row2: $row2,
      row3: $row3
    }) {
      _id
    }
  }`

exports.handler = async function(event) {
    const { row1, row2, row3, id } = JSON.parse(event.body);
    const { data, errors } = await query(UPDATE_TICKET, { row1, row2, row3, id });

    if(errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        } 
    } 

    return {
        statusCode: 200,
        body: JSON.stringify({ ticketId: data.updateTicket._id })
    }
} 