import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Header from "@/components/generic/Header";
import Layout from "@/components/generic/Layout";
import Title from "@/components/generic/Title";
import { useQueryProduct } from "@/hook/useQueryProduct";

const Catalog = () => {
  const [categorySelect, setCategorySelect] = useState<string>("Tout");
  const { data: products, isLoading: isProductLoading } = useQueryProduct();

  if (isProductLoading) {
    return <div>Loading...</div>;
  }

  const allCategories = () => {
    const categorys = new Set<string>();

    categorys.add("Tout");

    products?.forEach((product) => {
      categorys.add(product.category);
    });

    return Array.from(categorys);
  };

  const filteredProducts = () => {
    if (categorySelect === "Tout") {
      return products;
    }

    return products?.filter((product) => product.category === categorySelect);
  };

  return (
    <>
      <Header />
      <Layout>
        <Title>Catalogue</Title>
        <div className="flex gap-2 items-center flex-wrap">
          {allCategories().map((category) => {
            return (
              <Button
                variant={category === categorySelect ? "default" : "ghost"}
                className="rounded-full"
                key={category}
                onClick={() => setCategorySelect(category)}
              >
                {category}
              </Button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-10">
          {filteredProducts()?.map((product) => {
            return (
              <div className="flex flex-col gap-4" key={product.id}>
                <div className="relative h-[240px] w-auto">
                  <img
                    src={product.image}
                    height={240}
                    width={320}
                    className="rounded object-cover h-[240px] w-auto"
                  />
                  <Badge className="absolute top-2 left-2">
                    {product.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg">{product.label}</p>
                  </div>
                  <p
                    className={`text-lg bg-slate-100 py-1 px-2 rounded ${
                      product.isAdvertised ? "text-red-500 font-bold" : ""
                    }`}
                  >
                    {product.price} €
                  </p>
                </div>
                <p className="text-sm text-slate-500">{product.description}</p>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Catalog;
