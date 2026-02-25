import { http, HttpResponse } from "msw";
import type { Task } from "../features/tasks/api/getTasks";

const tasks: Task[] = [
  { id: 1, title: "Learn React Query", completed: false },
  { id: 2, title: "Setup MSW properly", completed: true },
];

export const handlers = [
  http.get("/tasks", () => {
    return HttpResponse.json(tasks);
  }),
  http.post("/tasks", async ({ request }) => {
    const newTask = (await request.json()) as Omit<Task, "id">;

    const taskWithId = {
      ...newTask,
      id: Date.now(),
    };

    tasks.push(taskWithId);

    return HttpResponse.json(taskWithId, { status: 201 });
  }),
];
