import type { Post } from "@/types/post";
import { fetchOnePost } from "@/api/singlePost";
import { useQuery } from "@tanstack/react-query";

export const useOnePost = (id: number) => {
    return useQuery<Post>(
        {
            queryKey: ['posts', id],
            queryFn: () => fetchOnePost(id),
            enabled: !!id,

        }
    )
}