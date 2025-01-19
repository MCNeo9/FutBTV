export async function GET(request) {

  const API_EVENTS_URL = process.env.API_EVENTS_URL
    try {
      // Realiza la solicitud a la API externa
      const response = await fetch(API_EVENTS_URL,{cache: 'no-store'} );
      if (!response.ok) {
        throw new Error('Error al obtener datos de la API externa');
      }
  
      const data = await response.json();
  
      // Filtrar solo eventos "en vivo" o "pronto"
      const eventosFiltrados = data.filter(
        (event) => event.status === 'en vivo' || event.status === 'pronto'
      );
  
      // Devuelve solo los eventos filtrados
      return new Response(JSON.stringify(eventosFiltrados), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Error al obtener los datos' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  