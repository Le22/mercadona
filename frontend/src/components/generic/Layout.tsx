interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <main className="p-10 flex flex-col gap-20">{children}</main>;
};

export default Layout;
