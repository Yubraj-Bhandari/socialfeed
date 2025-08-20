import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddPost } from "@/hooks/useMutation/useAddPost";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const postSchema = z.object({
  id: z.number().min(1, "ID must be at least 1"),
  userId: z.number().min(1, "User ID must be at least 1"),
  title: z.string().trim().min(6, "Title must be at least 6 characters"),
  body: z.string().trim().min(20, "Body must be at least 20 characters"),
});

type PostFormValues = z.infer<typeof postSchema>;

export const AddPost = () => {
  const navigate = useNavigate();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      id: undefined,
      userId: undefined,
      title: "",
      body: "",
    },
  });

  const { mutate, isSuccess, isError, status } = useAddPost();
  const isLoading = status === "pending";
  
  const handleSubmit = (data: PostFormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Post added successfully!", { description: "New post is created and is visible in the feed." });
        form.reset();
      },
      onError: () => {
        toast.error("Something went wrong", { description: "Please try again." });
      }
    });
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          className="hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Feed
        </Button>
      </div>

      {/* Page Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
        </div>
        <p className="text-gray-600 text-lg">Share your thoughts with the community</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-gray-700">Post ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value));
                        }}
                        placeholder="Enter Post ID"
                        className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-gray-700">User ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value));
                        }}
                        placeholder="Enter User ID"
                        className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-700">Title</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter your post title..." 
                      className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-700">Content</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={6}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What's on your mind? Share your thoughts..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-base font-semibold transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" /> 
                    Creating Post...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Post
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="px-8 py-3 text-base font-medium border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
