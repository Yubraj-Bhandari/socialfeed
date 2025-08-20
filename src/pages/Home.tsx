
import { PostList } from "@/components/postList";


export const HomePage = () => {
  return (
   <div>
      <div className="max-w-7xl  px-4">
        <div >
          <h1 className="text-center font-extrabold text-4xl md:text-6xl tracking-tight  bg-gradient-to-b from-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
            Feed
          </h1>
        </div>
        <div className="mt-2">
          <PostList />
        </div>
      </div>
    </div>
  );
};
