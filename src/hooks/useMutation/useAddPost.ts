import type { Post } from "@/types/post";
import { useMutation } from "@tanstack/react-query";
import { addPost } from "@/api/addPost";
import { queryClient } from "@/lib/react-query";

export const useAddPost = () => {
    return useMutation({
        mutationFn: (newPost: Post) => addPost(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            })
        }
    })
}