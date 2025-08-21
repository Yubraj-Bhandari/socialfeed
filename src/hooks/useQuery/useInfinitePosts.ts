import type { Post } from "@/types/post";
import { fetchPosts } from "@/api/fetchPost";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseInfinitePostsParams {
  limit?: number;
}

export const useInfinitePosts = ({ limit = 10 }: UseInfinitePostsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ 
      page: pageParam, 
      limit
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If we got fewer items than the limit, we've reached the end
      return lastPage.length === limit ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });
};
