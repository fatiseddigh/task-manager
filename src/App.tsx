import { useTasks } from "./features/tasks/hooks/useTasks";

function App() {
  const { data, isLoading, isError } = useTasks();
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h3 className="text-red-600"> Error loading tasks</h3>;
  return (
    <div className="w-screen flex flex-col items-center justify-center  py-20">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <ul className="space-y-2">
        {data?.map((task) => (
          <li key={task.id} className="border p-2 rounded">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
