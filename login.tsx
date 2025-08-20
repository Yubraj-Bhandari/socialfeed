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
  username: z.string().min(2, "Name is required"),
  password: z.string().min(8, "Password must be more than 8 character"),
});

type loginValues = z.infer<typeof formSchema>;

export const Login = () => {
  const form = useForm<loginValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
  <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-cyan-700 to-white p-5">
    <div className="w-full md:w-[60%] lg:w-[40%] xl:w-[30%] bg-white p-5 rounded-2xl">
      <h1 className="text-center text-3xl md:text-4xl font-bold py-5">Login Your Account</h1>
      <Form {...form}  >
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("Submit data:", data);
          navigate("/home")
        })}
        className=" p-3 md:p-5 bg-white "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage className="text-red-700"/>
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="text-xl">Password</FormLabel>
              <FormControl>
                <div className="relative w-full">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        className="p-2 pr-10"
        {...field}
      />
         <div
        className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </div>
    </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="w-full bg-black text-white mt-4 rounded-lg p-2 font-bold cursor-pointer">
          Submit
        </button>
      </form>
    </Form>
    </div>
  </div>
  );
};
