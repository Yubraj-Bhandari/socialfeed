import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { LogOutIcon, AlertCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const LogOut = () => { 
    const navigate = useNavigate()
    const handleLogOut = () => {
        navigate("/")
    }
    
    return(
        <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="cursor-pointer hover:bg-gray-900 hover:text-white transition-colors bg-black text-white px-4 py-2 rounded-lg font-medium">
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <AlertCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <AlertDialogTitle className="text-xl font-bold text-gray-900">
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base text-gray-600 mt-2">
                    This action will log you out from the application
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6">
                  <AlertDialogCancel className="w-full sm:w-auto px-6 py-2.5 text-base font-medium border-gray-300 hover:bg-gray-50">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-base font-medium" 
                    onClick={handleLogOut}
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </>
    )
}