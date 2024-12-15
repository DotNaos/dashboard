"use client";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Form,
    Input,
} from "@nextui-org/react";
import {
    useSession,
    useSupabaseClient,
    Session,
} from "@supabase/auth-helpers-react";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Todo {
    id: number;
    user_id: string;
    task: string;
}

export default function TodoPage() {
    const session: Session | null = useSession();
    const supabase = useSupabaseClient();
    const [newTodo, setNewTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if (session) {
            fetchTodos();
        }
    }, [session]);

    const fetchTodos = async (): Promise<void> => {
        const { data } = await supabase
            .from("todos")
            .select("*")
            .eq("user_id", session!.user.id);

        setTodos(data as Todo[]);
    };

    const addTodo = async (todo: string): Promise<void> => {
        await supabase
            .from("todos")
            .insert([{ user_id: session!.user.id, task: todo }]);
        await fetchTodos();
    };

    return (
        <Card className="p-default">
            <CardHeader className="flex flex-col items-start gap-default">
                <h1 className="header">Your Todos</h1>
                <Form className="flex flex-row items-center gap-default">
                    <Input
                        placeholder="New todo"
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <Button
                        isIconOnly
                        type="submit"
                        variant="bordered"
                        onPress={() => addTodo(newTodo)}
                    >
                        <Plus />
                    </Button>
                </Form>
            </CardHeader>
            <CardBody>
                <ul className="flex flex-col gap-default">
                    {todos.map((todo: Todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center gap-default w-full border-2 border-overlay bg-overlay justify-between p-2 pl-3 rounded-default"
                        >
                            {todo.task}

                            <Button
                                color="danger"
                                variant="faded"
                                onPress={async () => {
                                    await supabase
                                        .from("todos")
                                        .delete()
                                        .eq("id", todo.id);
                                    await fetchTodos();
                                }}
                                isIconOnly
                                size="sm"
                            >
                                <X />
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    );
}
