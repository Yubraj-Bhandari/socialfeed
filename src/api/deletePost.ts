import axios from "axios";

export const deletePost = async (id:number) : Promise<void> => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)

}