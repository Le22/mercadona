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
import { useMutationCreateProduct } from "@/hook/useMutationCreateProduct";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const FileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

const formSchema = z.object({
  label: z.string().min(2).max(100),
  category: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  price: z.string(),
});

const AddProductDialog = ({ children }: Props) => {
  const createProductMutation = useMutationCreateProduct();

  const [image, setImage] = useState<File | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      category: "",
      description: "",
      price: "0",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createProductMutation.mutate({
      label: data.label,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      image: image,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un produit</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="Pantalon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <FormControl>
                        <Input placeholder="Vêtement" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <FormControl>
                        <Input placeholder="Le produit..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Input
                  type="file"
                  placeholder="A quoi ressemble le produit"
                  onChange={(e) => setImage(e.target.files?.[0])}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Le prix en heure"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={!form.formState.isValid}>
                  Ajouter le produit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
