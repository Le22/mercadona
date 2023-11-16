import Header from "@/components/generic/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const productExemple = [
    {
      image:
        "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Bien être",
    },
    {
      image:
        "https://images.pexels.com/photos/3934704/pexels-photo-3934704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Technologie",
    },
    {
      image:
        "https://images.pexels.com/photos/7262446/pexels-photo-7262446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Nourriture",
    },
    {
      image:
        "https://images.pexels.com/photos/1721937/pexels-photo-1721937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Bijouterie",
    },
  ];

  return (
    <>
      <Header />
      <div className="w-full flex flex-col gap-20 pt-20 justify-center items-center">
        <h1 className="text-4xl font-bold">
          Des promotions tout les jours et en quantité
        </h1>
        <Button size={"lg"} className="group flex gap-2 items-center" asChild>
          <Link to={"/catalog"}>
            <span> Découvrir notre catalogue de produits</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />
          </Link>
        </Button>
        <div className="flex gap-10 items-center overflow-x-scroll">
          {productExemple.map((product) => (
            <div key={product.image} className="relative w-[320px] h-[400px]">
              <img
                src={product.image}
                alt=""
                className="w-[320px] h-[400px] object-cover rounded-lg"
              />
              <Badge className="absolute top-4 right-4">
                {product.category}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
