import { useQuery } from "react-query";

export interface Product {
  id: number;
  label: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAdvertised: boolean;
}

const fetchProduct = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:8000/product/");
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useQueryProduct() {
  const query = useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
  });

  return query;
}
