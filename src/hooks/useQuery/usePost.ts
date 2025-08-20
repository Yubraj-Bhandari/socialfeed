import type { Post } from "@/types/post";
import { fetchPosts } from "@/api/fetchPost";
import { useQuery } from "@tanstack/react-query";


export const usePost = () => {
    return useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        refetchOnWindowFocus: true
    })
}