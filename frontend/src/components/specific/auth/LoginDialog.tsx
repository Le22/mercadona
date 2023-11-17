import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

interface Props {
  children: React.ReactNode;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginDialog = ({ children, setIsAuth }: Props) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const fetchLogin = useCallback(async (data: z.infer<typeof formSchema>) => {
    const response = await fetch("http://localhost:8000/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return "error";
    }

    return await response.json();
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await fetchLogin(data);

    if (res === "error") {
      toast({
        title: "Erreur",
        description: "Identifiant ou mot de passe incorrect",
      });
      return;
    }

    setIsAuth(true);

    localStorage.clear();
    localStorage.setItem("access_token", res.access);
    localStorage.setItem("refresh_token", res.refresh);

    toast({
      title: "Félicitation",
      description: "Vous êtes connecté",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identifiant</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={!form.formState.isValid}>
                  Se connecter
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
