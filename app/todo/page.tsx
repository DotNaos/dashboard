"use client";

import { useSession, useSupabaseClient, Session } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  user_id: string;
  task: string;
}

export default function TodoPage() {
  const session: Session | null = useSession();
  const supabase = useSupabaseClient();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (session) {
      fetchTodos();
    }
  }, [session]);


  const fetchTodos = async (): Promise<void> => {
    const { data } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', session!.user.id);

    setTodos(data as Todo[]);
  };

  const addTodo = async (todo: string): Promise<void> => {
    await supabase
      .from('todos')
      .insert([{ user_id: session!.user.id, task: todo }]);
    await fetchTodos();

  };

  if (!session) {
    return (
      <div className="overlay">
        <Auth appearance={{ theme: ThemeSupa }} providers={[]} supabaseClient={supabase} />
      </div>
    );
  }

  return (
    <div>
      <h1>Your Todo List</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <input placeholder="New todo" type="text" onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const input = e.target as HTMLInputElement;

          addTodo(input.value);
          input.value = '';
        }
      }} />
    </div>
  );
}
