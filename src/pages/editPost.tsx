import { useEditPost } from "@/hooks/useMutation/useEditPost";
import { z } from "zod";
import type { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import  { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, X } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(6, "Title must be at least 6 characters.")
    .max(100, "Title cannot exceed 100 characters"),
  body: z
    .string()
    .trim()
    .min(20, "Body must be at least 20 characters.")
    .max(1000, "Body cannot exceed 1000 characters"),
});

type EditPostFormProps = {
  post: Post;
  onFinish: () => void;
};

export const EditPostForm = ({ post, onFinish }: EditPostFormProps) => {
  const { mutate: editPost, status } = useEditPost();
  const isLoading = status === "pending";

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setErrorMessage(null);

    editPost(
      { id: post.id, ...values },
      {
        onSuccess: () => {
          toast.success("Post updated successfully!", { description: "Your post has been updated." });
          onFinish();
        },
        onError: () => {
          setErrorMessage("Failed to update post. Please try again.");
          toast.error("Failed to update post", { description: "Please try again." });
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-700">Title</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter a descriptive title" 
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
                  <Textarea 
                    {...field} 
                    placeholder="Write your content" 
                    className="min-h-32 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 text-sm font-medium"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onFinish} 
            disabled={isLoading} 
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium border-gray-300 hover:bg-gray-50"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium text-sm">{errorMessage}</p>
          </div>
        )}
      </form>
    </Form>
  );
};
