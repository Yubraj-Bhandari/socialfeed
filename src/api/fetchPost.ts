import type { Post } from "@/types/post";
import axios from 'axios'


export const fetchPosts = async(): Promise<Post[]> => {
    const response = await axios.get<Post[]>(
        `${import.meta.env.VITE_BASE_URL}/posts`
    );
    console.log(response.data);
    return response.data;
}