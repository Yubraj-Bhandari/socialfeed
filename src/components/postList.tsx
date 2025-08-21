
import { useInfinitePosts } from "@/hooks/useQuery/useInfinitePosts";
import { LoaderCircle, User, Loader2 } from 'lucide-react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useRef, useCallback, useEffect } from "react";

export const PostList = () => {
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching
  } = useInfinitePosts({ limit: 12 });

  // Flatten all pages into a single array
  const allPosts = data?.pages.flat() || [];

  const handleReadmore = (id: number) => {
    navigate(`posts/${id}`);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Intersection Observer for infinite scroll
  const lastPostRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading || isFetchingNextPage) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-64">
          <LoaderCircle className="animate-spin text-center h-8 w-8" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-64">
          <p className="text-red-500">Failed to load data</p>
        </div>
      ) : allPosts.length > 0 ? (
        <>
          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allPosts.map((post, index) => {
              // Add ref to the last post for infinite scroll
              const isLastPost = index === allPosts.length - 1;
              
              return (
                <div
                  key={`${post.id}-${index}`}
                  ref={isLastPost ? lastPostRef : null}
                  className="group bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Leanne Graham</p>
                        <p className="text-xs text-gray-500">@Bret</p>
                      </div>
                      <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">#{post.id}</span>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2 first-letter:capitalize lowercase">
                      {post.title.length > 56 ? post.title.slice(0, 56) + "..." : post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-6 first-letter:capitalize lowercase line-clamp-3">
                      {post.body}
                    </p>
                  </div>

                  <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>Post {post.id}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-black text-white hover:bg-gray-800 text-xs px-4 py-2 cursor-pointer"
                      onClick={() => handleReadmore(post.id)}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Section */}
          {hasNextPage && (
            <div className="flex justify-center items-center py-4">
              <Button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Loading...
                  </>
                ) : (
                  'Load More Posts'
                )}
              </Button>
            </div>
          )}

          {/* No More Posts */}
          {!hasNextPage && allPosts.length > 0 && (
            <div className="flex justify-center items-center py-4">
              <span className="text-sm text-gray-500">No more posts to load</span>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center min-h-64">
          <p className="text-gray-500">No posts found</p>
        </div>
      )}

      {/* Refetching Indicator */}
      {isRefetching && !isLoading && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            <span className="text-sm">Refreshing...</span>
          </div>
        </div>
      )}
    </div>
  );
};