"use client";

import { Schema } from '@/amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { useEffect, useState } from 'react';
import Todo from './Todo';

const Index = () => {
    const [todos, setTodos] = useState<Schema['Todo'][]>([]);
    
    useEffect(() => {
        const fetchTodos = async () => {
            const client = generateClient<Schema>();
            const { data, errors } = await client.models.Todo.list();
            if (errors) {
                console.error(errors);
            }
            setTodos(data);
        }
        fetchTodos();
    }, []);

    useEffect(() => {
        const client = generateClient<Schema>({
            authMode: 'userPool',
        });
        const subscribeCreateTodo = client.models.Todo.onCreate().subscribe({
            next: (todo) => {
                setTodos((prevTodos) => [todo, ...prevTodos]);
            },
            error: (error) => {
                console.error(error);
            }
        });

        const subscribeDeleteTodo = client.models.Todo.onDelete().subscribe({
            next: (todo) => {
               setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id));
            },
            error: (error) => {
                console.error(error);
            }
        });

        return () => {
            subscribeCreateTodo.unsubscribe();
            subscribeDeleteTodo.unsubscribe();
        }
    }, []);
    return (
        <>
            <div>Todo List</div>
            <button onClick={async () => {
                const client = generateClient<Schema>({
                    authMode: 'userPool',
                });
                // create a new Todo with the following attributes
                const { errors, data: newTodo } = await client.models.Todo.create({
                    // prompt the user to enter the title
                    content: window.prompt("title"),
                })
                console.log(errors, newTodo);
            }}>Create </button>
            <div>
                {todos.map((todo) => {
                    return <Todo key={todo.id} todo={todo} />
                })}
            </div>
        </>
    )
}

export default Index