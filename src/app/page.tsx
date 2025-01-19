"use client";

import { Play, PlayCircle, Calendar, Trophy, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenMap } from "@/app/utils/tokenMap";
import { generateJWTToken } from "@/app/utils/utils"



const corrections: Record<string, string> = {
  Espn: "ESPN",
  Espnpremium: "ESPN Premium",
  Espnplus: "ESPN Plus",
  Dazn: "DAZN",
  Starplus: "Star Plus",
  Paramount: "Paramount",
  Foxsports: "Fox Sports",
  "Fox Sportspremium": "Fox Sports Premium",
  "Fox Deportes": "Fox Deportes",
  Univision: "Univisión",
  Winsports: "Win Sports",
  Dsports: "D Sports",
  Tycsports: "TyC Sports",
  Telefe: "Telefe",
  Tvpublica: "TV Pública",
  Liga1max: "Liga 1 MAX",
  Goltv: "GolTV",
  Golperú: "GolPerú",
  Aztecadeportes: "Azteca Deportes",
  Movistarlaliga: "Movistar LaLiga",
  Movistarligadecampeones: "Movistar Liga de Campeones",
  Skybundesliga: "Sky Bundesliga",
  Premieresports: "Premier Sports",
  Sporttv: "Sport TV",
  Staraction: "Star Action",
  Starcine: "Star Cine",
  "Hbo Max": "HBO Max",
  Canalplus: "Canal Plus",
  LaLiga: "La Liga",
  Laligahypermotion: "La Liga Hypermotion",
  Atp: "ATP",
  Nfl: "NFL",
  Nba: "NBA",
  Seriea: "Serie A",
  Bundesliga: "Bundesliga",
  Eredivisie: "Eredivisie",
  Premierleague: "Premier League",
  Superlig: "Super Lig",
  Primera: "Primera División",
  Ascenso: "Ascenso MX",
  Liganacional: "Liga Nacional",
  Championsleague: "Champions League",
  Concacaf: "CONCACAF",
};


const categoryImages: Record<string, string> = {
  Fútbol: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200",
  Baloncesto: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  NFL: "https://plus.unsplash.com/premium_photo-1685088062526-067d3e88c0e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmZsfGVufDB8fDB8fHww",
  ATP: "https://images.unsplash.com/photo-1480180566821-a7d525cdfc5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlbmlzfGVufDB8fDB8fHww",
  Default: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};




function formatChannelName(link: string): string {
  if (!link.includes("stream=")) {
    return "Canal Desconocido";
  }

  const rawName = link.split("stream=")[1]?.replace(/_/g, " ") || "Canal Desconocido";

  const correctedName = Object.keys(corrections).reduce((name, key) => {
    const regex = new RegExp(key, "i");
    return name.replace(regex, corrections[key]);
  }, rawName);

  return correctedName
    .replace(/\d+$/, "")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getCategoryImage(category: string): string {
  return categoryImages[category] || categoryImages.Default;
}

interface Canal {
  id: number;
  nombre: string;
  tipo: "tv" | "streaming" | "app";
  disponible: boolean;
  link: string;
}

interface Partido {
  id: number;
  titulo: string;
  equipos: string;
  hora: string;
  imagen: string;
  enVivo?: boolean;
  liga: string;
  canales: Canal[];
}



export default function Home() {
  const router = useRouter();
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string>("popular");
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<number | null>(null);
  const [categoriasDinamicas, setCategoriasDinamicas] = useState<string[]>([]);
  
  const handleRedirect = async (canal: Canal) => {
    if (!canal.link) return;
  
    try {
      
      const response = await fetch("/api/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: canal.link }),
      });
  
      if (!response.ok) {
        throw new Error("Error generating token");
      }
  
      
      const { token } = await response.json();
  
      
      router.push(`/channel/${encodeURIComponent(canal.nombre)}?token=${token}`);
    } catch (error) {
      console.error("Error handling redirect:", error);
    }
  };

  const filtrosFijos = [
    {
      id: "popular",
      nombre: "Popular",
      icono: <TrendingUp className="w-4 h-4 mr-2" />,
    },
    {
      id: "envivo",
      nombre: "En Vivo",
      icono: <Play className="w-4 h-4 mr-2" />,
    },
    {
      id: "proximos",
      nombre: "Próximos",
      icono: <Calendar className="w-4 h-4 mr-2" />,
    },
  ];

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Error al obtener los datos de la API");
        const data = await response.json();

        const eventosUnicos = new Map();
        const categoriasSet = new Set<string>();

        data.forEach((event: any) => {
          categoriasSet.add(event.category);
          if (["en vivo", "pronto"].includes(event.status)) {
            if (!eventosUnicos.has(event.title)) {
              eventosUnicos.set(event.title, {
                id: eventosUnicos.size,
                titulo: event.title,
                equipos: event.title,
                hora: event.time,
                imagen: getCategoryImage(event.category),
                enVivo: event.status === "en vivo",
                liga: event.category,
                canales: [
                  {
                    id: 1,
                    nombre: formatChannelName(event.link || ""),
                    tipo: "streaming",
                    disponible: !!event.link,
                    link: event.link || "#",
                  },
                ],
              });
            } else {
              const eventoExistente = eventosUnicos.get(event.title);
              eventoExistente.canales.push({
                id: eventoExistente.canales.length + 1,
                nombre: formatChannelName(event.link || ""),
                tipo: "streaming",
                disponible: !!event.link,
                link: event.link || "#",
              });
            }
          }
        });

        setPartidos(Array.from(eventosUnicos.values()));
        setCategoriasDinamicas(Array.from(categoriasSet));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPartidos();
  }, []);

  const filtrarPartidos = (): Partido[] => {
    return partidos.filter((partido) => {
      if (filtroSeleccionado === "popular") {
        return partido.canales.length > 1;
      }
      if (filtroSeleccionado === "envivo") {
        return partido.enVivo;
      }
      if (filtroSeleccionado === "proximos") {
        return !partido.enVivo;
      }
      return partido.liga.toLowerCase() === filtroSeleccionado.toLowerCase();
    });
  };

  return (
    <div className="">

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          {[...filtrosFijos, ...categoriasDinamicas.map((categoria) => ({
            id: categoria.toLowerCase(),
            nombre: categoria,
            icono: <Trophy className="w-4 h-4 mr-2" />,
          }))].map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroSeleccionado(filtro.id)}
              className={`flex items-center px-6 py-2 rounded-full text-sm font-medium ${
                filtroSeleccionado === filtro.id
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-400"
              }`}
            >
              {filtro.icono}
              {filtro.nombre}
            </button>
          ))}
        </div>
      </div>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
  Eventos Destacados - {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
</h2>
        {filtrarPartidos().length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No hay eventos disponibles por el momento. Por favor, vuelve más tarde.
        </p>
      ): (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrarPartidos().map((partido) => (
            <div
              key={partido.id}
              className="relative group rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={partido.imagen}
                alt={partido.equipos}
                className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="absolute bottom-0 p-6 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-400">
                      {partido.liga}
                    </span>
                    {partido.enVivo ? (
                      <span className="flex items-center text-xs font-semibold bg-red-500 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                        EN VIVO
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-gray-300 bg-gray-800/80 px-3 py-1 rounded-full">
                        {partido.hora}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{partido.titulo}</h3>
                  {partidoSeleccionado === partido.id ? (
                    <div className="mt-4 space-y-2">
                      <div className="grid gap-2">
                        {partido.canales.map((canal) => (
                          <button
                            key={canal.id}
                            onClick={() =>
                              handleRedirect(canal)
                            }
                            className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                              canal.disponible
                                ? "bg-gray-800 hover:bg-gray-700 text-white"
                                : "bg-gray-800/50 text-gray-500"
                            }`}
                            disabled={!canal.disponible}
                          >
                            {canal.nombre}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setPartidoSeleccionado(null)}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg mt-2"
                      >
                        Cerrar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setPartidoSeleccionado(partido.id)}
                      className="w-full bg-gradient-to-r from-red-600
                     to-red-500 text-white px-6 py-3 rounded-lg text-sm font-medium transform transition-all duration-200 hover:from-red-500 hover:to-red-400 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                      Ver Opciones
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div> 
       )} </main> 
    </div>
  );
}
