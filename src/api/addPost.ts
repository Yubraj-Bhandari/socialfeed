import type { Post } from "@/types/post";
import axios from "axios";

export const addPost = async (post: Post): Promise<Post> => {
    const response = await axios.post<Post>(`${import.meta.env.VITE_BASE_URL}/posts`, post);
    return response.data;
}