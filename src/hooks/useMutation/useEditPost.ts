import { useMutation } from "@tanstack/react-query";
import { editPost } from "@/api/editPost";
import { queryClient } from "@/lib/react-query";
import type { Post } from "@/types/post";

export const useEditPost = () => {
  return useMutation({
    mutationFn: (updatedPost: Partial<Post> & { id: number }) =>
      editPost(updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
