import { postRegisterQf } from "@/api/QueryFunction";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RegisterFormSchema } from "@/validations/formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";


function Register() {
const {toast}=useToast();
const navigate=useNavigate();
const mutation=useMutation({
  mutationFn:(data:z.infer<typeof RegisterFormSchema>)=>postRegisterQf(data),
  mutationKey:["register"],
  onSuccess:(data)=>{
    toast({
      title: "Register Successfully",
      description: `Registered Successfully`,
    });
    navigate("/login",{replace:true});
    console.log(data);
  },

  onError:(error:AxiosError)=>{
    toast({
      title: "Register Failed",
      description: `Register Failed`,
      variant: "destructive",
    });
    console.error(error);
  }
})
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      firstname: "",
      lastname: "",
    },
  });
  function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    mutation.mutate(data);
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="sm:w-[30%] w-[90%]">
        <CardContent className="p-10 ">
          <h1 className="font-bold text-2xl mb-10">Register account</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. lewis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="e.g. lewis@expense.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Lewis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hamilton" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <Button className="w-full" type="submit">
                  Register
                </Button>
                <span className="text-gray-500 font-medium ">
                  Already have an Account?{" "}
                  <Link className="text-blue-500" to={"/login"}>
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
