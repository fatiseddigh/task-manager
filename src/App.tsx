import { useState } from "react";
import { useTasks } from "./features/tasks/hooks/useTasks";
import { useCreateTask } from "./features/tasks/hooks/useCreateTask";
import { Toaster } from "react-hot-toast";
import TaskItem from "./features/tasks/components/TaskItem";

function App() {
  const [title, setTitle] = useState("");

  const { mutate, isError: isCreateError } = useCreateTask();
  const { data, isLoading, isError: isFetchError } = useTasks();

  if (isLoading) return <h1>Loading...</h1>;
  if (isFetchError)
    return <h3 className="text-red-600">Error loading tasks</h3>;

  return (
    <div className="w-screen flex flex-col items-center py-20">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <div className="mb-4 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          placeholder="New task..."
        />

        <button
          onClick={() => {
            if (!title.trim()) return;
            mutate({ title, completed: false });
            setTitle("");
          }}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 w-96">
        {data?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      {isCreateError && (
        <p className="text-red-600 mt-2">
          Failed to create task. Please try again.
        </p>
      )}
    </div>
  );
}

export default App;
