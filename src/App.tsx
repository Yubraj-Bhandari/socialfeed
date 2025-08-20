import { Login } from "./components/login";
import { Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { PostDetail } from "./pages/postDetails";
import { AddPost } from "./pages/addPost";
import { NotFound } from "./pages/NotFound";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/sideBar";
import { LogOut } from "./components/logOut";
import { Toaster } from "sonner";

function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col p-2">
          <div className="flex items-center justify-between">
            <SidebarTrigger />
            <div className="flex flex-col items-end gap-1">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs shadow-sm border">
                {typeof window !== 'undefined' ? localStorage.getItem('email') : ''}
              </span>
              <LogOut />
            </div>
          </div>
          <div className="flex-1 w-full">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </SidebarProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="home/posts/:id" element={<PostDetail />} />
        <Route path="addPost" element={<AddPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default App;
