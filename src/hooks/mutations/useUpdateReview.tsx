import { useMutation, useQueryClient } from "@tanstack/react-query";

type PutTypes = {
  id: string | undefined;
  review: string;
};

export default function useUpdateReview() {
  const API = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: updateIsLoading,
    isError: updateIsError,
    isSuccess: updateIsSuccess,
    error,
  } = useMutation({
    mutationFn: async ({ id, review }: PutTypes) => {
      const response = await fetch(`${API}/books/${id}/review`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["books", { id: variables.id }], data);
    },
  });

  return {
    mutate,
    updateIsLoading,
    updateIsError,
    updateIsSuccess,
    error,
  };
}
