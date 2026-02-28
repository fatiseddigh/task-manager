export const editTask = async ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => {
  const response = await fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};
