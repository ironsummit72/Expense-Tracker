import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  loginFormSchemaEmail,
  loginFormSchemaUsername,
} from "@/validations/formValidation";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMutation } from "react-query";
import { postLoginQf } from "@/api/QueryFunction";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
export default function Login() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.Auth);
  useEffect(() => {
    console.log("Login use Effect");
    if (auth.isUserAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Tabs defaultValue="username" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="username">Username</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="username">
          <Card>
            <CardContent className="p-10">
              <LoginWithUsername />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="email">
          <Card>
            <CardContent className="p-10">
              <LoginWithEmail />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
function LoginWithUsername() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof loginFormSchemaUsername>) =>
      postLoginQf(data),
      mutationKey: ["loginusername"],
      onSuccess: () => {
      toast({
        title: "Login Successfully",
        description: `Logged In Successfully`,
      });
      navigate("/", { replace: true });
    },
    onError:(error:AxiosError)=>{
      toast({
        title: "Login Failed",

        description: `Login Failed ${error.response?.data}`,
        variant: "destructive",
      });
      console.log("error ",);
      
    }
  });
  const form = useForm<z.infer<typeof loginFormSchemaUsername>>({
    resolver: zodResolver(loginFormSchemaUsername),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof loginFormSchemaUsername>) {
    mutation.mutate(data);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
          <div className="flex flex-col gap-2">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <span className="text-gray-500 font-medium ">
              Don't have an Account?{" "}
              <Link className="text-blue-500" to={"/register"}>
                Register
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </>
  );
}
function LoginWithEmail() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof loginFormSchemaEmail>) =>
      postLoginQf(data),
      mutationKey: ["loginemail"],
      onSuccess: () => {
      toast({
        title: "Login Successfully",
        description: `Logged In Successfully`,
      });
      navigate("/", { replace: true });
    },
    onError:(error:AxiosError)=>{
      toast({
        title: "Login Failed",
        description: `Login Failed ${error.response?.data}`,
        variant: "destructive",
      });
    }
  });
  const form = useForm<z.infer<typeof loginFormSchemaEmail>>({
    resolver: zodResolver(loginFormSchemaEmail),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof loginFormSchemaEmail>) {
    mutation.mutate(data);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                    placeholder="Enter Password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <span className="text-gray-500 font-medium ">
              Don't have an Account?{" "}
              <Link className="text-blue-500" to={"/register"}>
                Register
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </>
  );
}
