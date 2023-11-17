import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "react-query";

export interface CreateProductQuery {
  label: string;
  description: string;
  price: number;
  image: unknown;
  category: string;
}

const createProduct = async ({
  label,
  description,
  price,
  image,
  category,
}: CreateProductQuery) => {
  await fetch(`http://localhost:8000/product/`, {
    method: "POST",
    body: JSON.stringify({
      label,
      description,
      price,
      image,
      category,
    }),
  });
};

export function useMutationCreateProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createProductMutation = async ({
    label,
    description,
    price,
    image,
    category,
  }: CreateProductQuery) => {
    try {
      const response = await createProduct({
        label,
        description,
        price,
        image,
        category,
      });
      return response;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  };

  const mutation = useMutation(createProductMutation, {
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oups",
        description: "Une erreur est survenue",
      });
    },
    onSuccess: () => {
      toast({
        title: "Félicitation",
        description: "Le produit a bien été ajouté",
      });
      queryClient.refetchQueries(["product"]);
    },
  });

  return mutation;
}
