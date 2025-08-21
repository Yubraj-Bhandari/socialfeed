// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";


// const formSchema = z.object({
//   username: z.string().min(2, "Name is required"),
//   password: z.string().min(8, "Password must be more than 8 character"),
// });

// type loginValues = z.infer<typeof formSchema>;

// export const Login = () => {
//   const form = useForm<loginValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   return (
//   <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-400 to-indigo-500">
//     <div className="w-full md:w-[60%] lg:w-[40%] xl:w-[30%] bg-white p-5 rounded-2xl">
//       <h1 className="text-center text-3xl md:text-4xl font-bold py-5">Login Your Account</h1>
//       <Form {...form}  >
//       <form
//         onSubmit={form.handleSubmit((data) => {
//           console.log("Submit data:", data);
//           navigate("/home")
//         })}
//         className=" p-3 md:p-5 bg-white "
//       >
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-xl">Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your name" {...field} />
//               </FormControl>
//               <FormMessage className="text-red-700"/>
//             </FormItem>
//           )}
//         />
//         <FormField 
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem className="mt-4">
//               <FormLabel className="text-xl">Password</FormLabel>
//               <FormControl>
//                 <div className="relative w-full">
//       <Input
//         type={showPassword ? "text" : "password"}
//         placeholder="Enter password"
//         className="p-2 pr-10"
//         {...field}
//       />
//          <div
//         className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
//         onClick={() => setShowPassword((prev) => !prev)}
//       >
//         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//       </div>
//     </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <button type="submit" className="w-full bg-black text-white mt-4 rounded-lg p-2 font-bold cursor-pointer">
//           Submit
//         </button>
//       </form>
//     </Form>
//     </div>
//   </div>
//   );
// };


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters"),
});

type loginValues = z.infer<typeof formSchema>;

export const Login = () => {
  const form = useForm<loginValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-400 to-indigo-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Please sign in to your account
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                localStorage.setItem("email", data.email);
                navigate("/home");
              })}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        {...field} 
                        className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full px-3 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Sign In
              </button>
            </form>
          </Form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};