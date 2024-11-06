import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { Card, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "./components/ui/skeleton";
import { title } from "process";

export const App = () => {
    const [input, setInput] = useState<string>('');
    const queryClient = useQueryClient()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // @ts-ignore
        newTodoMutation.mutate(input);
        setInput('');
    }

    const todosQuery = useQuery({
        queryKey: ['todos'],
        queryFn: () => fetch('http://localhost:8080/todos').then(res => res.json())
    });

    const newTodoMutation = useMutation({
        mutationFn: (title) => fetch('http://localhost:8080/todo', {method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, body: JSON.stringify({title})}),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });

    const deleteTodoMutation = useMutation({
        mutationFn: (id) => fetch('http://localhost:8080/todo', {method: 'DELETE', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, body: JSON.stringify({id})}),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    })

    return (
        <div className="bg-zinc-950 w-screen min-h-screen flex flex-row items-center justify-center">
            <main className="max-w-screen-sm min-h-full">
                <h1 className="text-center text-gray-50 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">MITech Todo List</h1>
                <h4 className="text-center text-gray-200 font-light text-xl italic">by Colin</h4>
                <form onSubmit={e => handleSubmit(e)} className="mt-5 flex w-full max-w-sm items-center space-x-2">
                    <Input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Let's try not to forget this time..." />
                    <Button className="bg-violet-700 text-gray-50" type="submit">Add</Button>
                </form>
                <Separator className="my-4 bg-gray-600" />
                {todosQuery.isError ? (
                    <h6 className="bg-gray-50 text-xl">Something went terribly wrong...</h6>
                ) : todosQuery.isLoading ? (
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                ) : todosQuery.data.map((todo: any) => (
                    <Card key={todo.id} className="bg-black flex flex-row justify-around p-3">
                        <CardHeader>
                            <CardDescription className="text-gray-300 text-xs">{todo.id}</CardDescription>
                            <CardTitle className="text-gray-50 text-md">{todo.title}</CardTitle>
                        </CardHeader>
                        <div className="flex flex-col items-center justify-center">
                            <Button onClick={() => deleteTodoMutation.mutate(todo.id)}variant="destructive">Delete</Button>
                        </div>
                    </Card>
                ))}
            </main>
        </div>
    )
}

export default App;
