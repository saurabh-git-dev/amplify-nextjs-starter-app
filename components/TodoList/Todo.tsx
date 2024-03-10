import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";

interface TodoProps {
    todo: Schema['Todo']
}

const Todo = (props: TodoProps) => {
    const { todo } = props;
    const client = generateClient<Schema>({
        authMode: 'userPool',
    });

    const handleDelete = async () => {
        const { errors } = await client.models.Todo.delete({
            id: todo.id
        });
        if (errors) {
            console.error(errors);
        }
    }
    return (
        <div>
            <p>{todo.id}</p>
            <p>{todo.content}</p>
            <p>{todo.createdAt}</p>
            <button onClick={handleDelete}>
                Delete
            </button>
        </div>
    )
}

export default Todo