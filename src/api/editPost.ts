import axios from "axios";
import type { Post } from "@/types/post";

export const editPost = async (updatedPost: Partial<Post> & {id: number}) : Promise<Post> => {
    const {id, ...data} = updatedPost
    const response = await axios.patch<Post>(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, data)
    return response.data
}