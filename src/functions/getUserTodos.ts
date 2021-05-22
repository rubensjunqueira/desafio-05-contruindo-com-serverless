import {document} from '../utils/dynamodbClient';

export const handle = async (event) => {
    const {userId} = event.pathParameters;

    const response = await document.scan({
        TableName: 'todos',
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId
        }
    }).promise();

    response.Items.map(x => x.deadline = new Date(x.deadline).toLocaleString());

    return {
        statusCode: 200,
        body: JSON.stringify(response.Items),
        headers: {
            "Content-Type": "application/json"
        }
    }
}