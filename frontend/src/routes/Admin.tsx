import Header from "@/components/generic/Header";
import Layout from "@/components/generic/Layout";
import Title from "@/components/generic/Title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddProductDialog from "@/components/specific/product/AddProductDialog";
import AddPromotionDialog from "@/components/specific/promotion/AddPromotionDialog";
import { useQueryProduct } from "@/hook/useQueryProduct";

const Admin = () => {
  const { data: products, isLoading: isProductLoading } = useQueryProduct();

  if (isProductLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <Layout>
        <Title>Admin</Title>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Les produits</h2>
          <AddProductDialog>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
          </AddProductDialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="w-[400px]">Description</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead className="text-right">Promotion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.label}
                      className=" object-cover rounded w-[100px] h-auto"
                    />
                  </TableCell>
                  <TableCell className="font-bold">{product.label}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell
                    className={`${
                      product.isAdvertised ? "text-red-500 font-bold" : ""
                    }`}
                  >
                    {product.price} €
                  </TableCell>
                  <TableCell className="text-right">
                    <AddPromotionDialog>
                      <Button size={"sm"} variant={"outline"}>
                        Ajouter une promotion
                      </Button>
                    </AddPromotionDialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Layout>
    </>
  );
};

export default Admin;
