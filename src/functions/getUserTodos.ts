import {document} from '../utils/dynamodbClient';

export const handle = async (event) => {
    const {userId} = event.pathParameters;

    const response = await document.query({
        TableName: 'todos',
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId
        }
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            "Content-Type": "application/json"
        }
    }
}