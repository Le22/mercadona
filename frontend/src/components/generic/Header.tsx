import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="w-full bg-white z-10 flex justify-between itens-center py-2 px-4 border-b sticky top-0 left-0">
      <nav className="flex gap-6 items-center">
        <Link to="/" className="font-extrabold text-lg">
          Mercadona
        </Link>
        <Button variant={"ghost"} asChild>
          <Link to={"/catalog"}>Catalogue</Link>
        </Button>
      </nav>
      <Button variant={"ghost"} asChild>
        <Link to={"/admin"}>Admin</Link>
      </Button>
    </header>
  );
};

export default Header;
