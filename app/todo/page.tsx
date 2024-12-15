"use client";

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect, useState } from 'react';

export default function TodoPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (session) {
      fetchTodos();
    }
  }, [session]);

  const fetchTodos = async () => {
    const { data } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', session.user.id);
    setTodos(data);
  };

  const addTodo = async (todo) => {
    await supabase
      .from('todos')
      .insert([{ user_id: session.user.id, task: todo }]);
    fetchTodos();
  };

  if (!session) {
    return (
      <div className="overlay">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
      </div>
    );
  }

  return (
    <div>
      <h1>Your Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <input type="text" placeholder="New todo" onKeyDown={(e) => {
        if (e.key === 'Enter') {
          addTodo(e.target.value);
          e.target.value = '';
        }
      }} />
    </div>
  );
}
