import { deletePost } from "@/api/deletePost";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export const useDeletePost = () => {
    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']})
        }
    })
}