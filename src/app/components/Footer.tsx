import { Play } from "lucide-react";

export default function Footer() {
  const Logo = "/LogoFutBTV.svg";
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800 py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">

          <div className="">
            <a href="/" className="flex items-center mb-4 cursor-pointer">
              <img
                src={Logo}
                alt="FutBTV Logo"
                className="w-10 h-10"
              />
              <span className="ml-2 text-lg font-bold">FutBTV</span>
            </a>
          </div>

          <div className="flex gap-4 mb-4">
            <a
              href="/legal/dmca"
              className="text-sm text-gray-400 hover:underline"
            >
              DMCA
            </a>
            <a
              href="/legal/privacy"
              className="text-sm text-gray-400 hover:underline"
            >
              Política de Privacidad
            </a>
          </div>

          <p className="text-sm text-gray-400 text-center mb-2">
            Hecho con ❤️ y dedicación.
          </p>

          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} FutBTV. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
