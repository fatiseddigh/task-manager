export const editTask = async ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => {
  await new Promise((res) => setTimeout(res, 800));

  return {
    id,
    title,
  };
};
