import type { Post } from "@/types/post";
import axios from "axios";


export const fetchOnePost = async(id: number) : Promise<Post> => {
    const response = await axios.get<Post>(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)
    return response.data
}