"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ChannelPage({ params }: { params: { channel: string } }) {
  const searchParams = useSearchParams();
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const channelName = decodeURIComponent(params.channel); 
  const token = searchParams.get("token"); 

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Token no proporcionado.");
        return;
      }

      try {
        const response = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!data.valid) {
          setError("Token no válido o enlace expirado Regresa a la página de inicio.");
        } else {
          setVideoLink(data.decoded.link); 
        }
      } catch (error) {
        console.error("Error verificando el token:", error);
        setError("Error verificando el token.");
      }
    };

    verifyToken(); 
  }, [token]); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-4xl font-bold mb-6">{channelName}</h1>

      {error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : videoLink ? (
        <div className="w-full max-w-6xl aspect-video shadow-lg rounded-lg overflow-hidden">
          <iframe
            src={videoLink}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">Cargando...</p>
      )}
    </div>
  );
}
