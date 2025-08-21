import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold">404 - Page not found</h1>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <div className="mt-6">
        <Button variant="outline" onClick={() => navigate('/home')}>Go to Feed</Button>
      </div>
    </div>
  );
};


