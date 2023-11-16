import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-20 justify-center items-center">
      <h1 className="text-4xl font-bold">Mercadona</h1>
      <Button size={"lg"} className="flex gap-2 items-center" asChild>
        <Link to={"/catalog"}>
          <span> Découvrir notre catalogue de produits</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default Home;
