import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white z-10 flex justify-between itens-center p-2 border-b sticky top-0 left-0">
      <Button variant={"ghost"} asChild>
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <p>Retour</p>
        </Link>
      </Button>

      <Button variant={"ghost"} asChild>
        <Link to={"/admin"}>Admin</Link>
      </Button>
    </header>
  );
};

export default Header;
