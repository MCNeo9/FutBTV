export default function Navbar() {

  const Logo = "/LogoFutBTV.svg";

  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="">
        <a href="/" className="flex items-center h-16 cursor-pointer" >
        <img
              src={Logo}
              alt="FutBTV Logo"
              className="w-10 h-10" // Ajusta el tamaño según lo necesario
            />
        <span className="ml-2 text-xl font-bold">FutBTV</span>
        </a>
      </div>
    </div>
  </nav>
  );
}
