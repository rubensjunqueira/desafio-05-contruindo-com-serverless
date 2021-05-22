import {document} from '../utils/dynamodbClient';
import {v4 as uuid} from 'uuid';

interface ICreateTodo{
    title: string;
    deadline: Date;
}

export const handle = async (event) => {
    const {deadline, title}  = JSON.parse(event.body) as ICreateTodo;
    const {userId} = event.pathParameters;

    await document.put({
        TableName: "todos",
        Item: {
            id: uuid(),
            userId,
            title,
            deadline: new Date(deadline).toISOString(),
            done: false
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({message: "Todo created!"}),
        header: {
            "Content-Type": "application/json"
        }
    }
}