"use client";

import { Schema } from '@/amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useEffect } from 'react';

const Info = () => {
    const client = generateClient<Schema>();
  useEffect(() => {
    client.models.Todo.list().then((todos) => {
        console.log(todos);
      });
    }, []);
  
  return (
    <div>Info</div>
  )
}

export default Info