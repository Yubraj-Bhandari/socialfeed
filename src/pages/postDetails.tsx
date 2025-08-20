import { useState } from "react";
import { useOnePost } from "@/hooks/useQuery/useSinglePost";
import { useParams, useNavigate } from "react-router-dom";
import { LoaderCircle, ArrowLeft, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditPostForm } from "./editPost";
import { useDeletePost } from "@/hooks/useMutation/useDeletePost";
import { ConfirmDialog } from "@/components/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id!);

  const { data, isLoading, error } = useOnePost(postId);
  const deletePost = useDeletePost();

  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePost.mutateAsync(postId);
      setShowDialog(false);
      toast.success("Post deleted successfully!", { description: "The post has been removed from the feed." });
      navigate("/home");
    } catch (error) {
      console.error("Failed to delete post", error);
      toast.error("Failed to delete post", { description: "Please try again." });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
          <p className="text-lg font-semibold text-red-600">Failed to load the post.</p>
          <p className="text-sm text-gray-600 mt-1">Please check the URL or try again.</p>
          <div className="mt-4">
            <Button variant="outline" onClick={() => navigate('/home')}>Go back to Feed</Button>
          </div>
        </div>
      ) : !data ? (
        <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
          <p className="text-lg font-semibold">Post not found</p>
          <div className="mt-4">
            <Button variant="outline" onClick={() => navigate('/home')}>Go back to Feed</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="container mx-auto py-8 max-w-4xl px-4">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => navigate("/home")}
                className="hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Feed
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Post ID: {data.id}</div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 first-letter:capitalize lowercase">
                      {data.title}
                    </h1>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-sm py-2 px-4 rounded-lg font-semibold">
                    #{data.id}
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="border-l-4 border-blue-500 pl-4 py-3 mb-6 bg-blue-50 rounded-r">
                  <p className="text-gray-700 text-base sm:text-lg leading-7 first-letter:capitalize lowercase">
                    {data.body}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" 
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Post
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full sm:w-auto"
                    onClick={() => setShowDialog(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Sheet open={isEditing} onOpenChange={setIsEditing}>
            <SheetContent side="right" className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Edit Post</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <EditPostForm post={data} onFinish={() => setIsEditing(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}

     <ConfirmDialog
  open={showDialog}
  onOpenChange={setShowDialog}
  onConfirm={handleDelete}
  isLoading={isDeleting}
  title="Delete Post"
  confirmText="Delete Post"
  cancelText="Cancel"
  description="Are you sure you want to delete this post? This action cannot be undone."
/>

    </>
  );
};
