import type { Post } from "@/types/post";
import axios from 'axios'

interface FetchPostsParams {
  page?: number;
  limit?: number;
}

export const fetchPosts = async(params: FetchPostsParams = {}): Promise<Post[]> => {
    const { page = 1, limit = 10 } = params;
    
    const url = `${import.meta.env.VITE_BASE_URL}/posts?_page=${page}&_limit=${limit}`;
    
    const response = await axios.get<Post[]>(url);
    console.log(response.data);
    return response.data;
}