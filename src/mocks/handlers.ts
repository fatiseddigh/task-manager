import { http, HttpResponse } from "msw";

let tasks = [
  { id: 1, title: "Learn React Query", completed: false },
  { id: 2, title: "Setup MSW properly", completed: true },
];

export const handlers = [
  http.get("http://localhost:3000/tasks", () => {
    return HttpResponse.json(tasks);
  }),
];
