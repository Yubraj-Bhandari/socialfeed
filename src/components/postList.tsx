// import { usePost } from "@/hooks/useQuery/usePost";
// import { LoaderCircle} from 'lucide-react';
// import { Button } from "./ui/button";
// import { useNavigate } from "react-router-dom";

// export const PostList = () => {
//   const { data, isLoading, error } = usePost();
//   const navigate = useNavigate()

//   const handleReadmore = (id: number) => {
//     navigate(`posts/${id}`)
//   }

//   return (
//     <>
//       {isLoading ? (
//         <div className="flex justify-center items-center">
//           <LoaderCircle className="animate-spin text-center" />
//         </div>
//       ) : error ? (
//         <div className="flex justify-center items-center">
//           <p>Failed to load data</p>
//         </div>
//       ) : data && data.length > 0 ? (
//            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//              {
//                 data.map((post) => (
//                     <div key={post.id} className="border rounded-xl p-4 shadow-md" >
//                         <p className=" text-gray-500 text-md ">User ID: {post.userId}</p>
//                         <h2 className="font-semibold text-primary mb-1 text-3xl first-letter:capitalize lowercase">{post.title.length > 20 ? post.title.slice(0,20) : 
//                           post.title}</h2>
//                         <p className="text-lg text-muted-foreground mb-2 text-justify first-letter:capitalize lowercase">{post.body.length > 100 ? post.body.slice(0,100) + "..." : 
//                           post.body
//                           }</p>
//                         <Button onClick={() => handleReadmore(post.id)} className="text-md p-2 cursor-pointer">Readmore</Button>
//                     </div>
//                 ))
//             }
//            </div>
//       ):
//       (
//         <div className="flex justify-center items-center">
//             <p>No data found</p>
//         </div>
//       )
    
//     }
//     </>
//   );
// };
import { usePost } from "@/hooks/useQuery/usePost";
import { LoaderCircle, User } from 'lucide-react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const PostList = () => {
  const { data, isLoading, error } = usePost();
  const navigate = useNavigate();

  const handleReadmore = (id: number) => {
    navigate(`posts/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-64">
          <LoaderCircle className="animate-spin text-center h-8 w-8" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-64">
          <p>Failed to load data</p>
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((post, index) => (
            <div
              key={post.id}
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
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">#{index + 1}</span>
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
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-64">
          <p>No data found</p>
        </div>
      )}
    </>
  );
};