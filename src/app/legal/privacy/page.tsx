"use client";

export default function PoliticaDePrivacidad() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">
          Política de Privacidad
        </h1>
        <p className="mb-4">
          En <strong>FutBTV</strong>, nos tomamos muy en serio la privacidad de
          nuestros usuarios. Esta Política de Privacidad describe cómo
          recopilamos, utilizamos, protegemos y compartimos tu información
          personal cuando utilizas nuestro sitio web.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Información que Recopilamos
        </h2>
        <p className="mb-4">
          Durante tu interacción con nuestro sitio, podemos recopilar los
          siguientes tipos de información:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Información proporcionada directamente por el usuario: como tu
            nombre, dirección de correo electrónico u otros datos al registrarte
            o contactarnos.
          </li>
          <li>
            Información técnica: como tu dirección IP, tipo de navegador,
            proveedor de servicios de Internet (ISP), páginas de referencia y
            salida, y registros de fecha y hora.
          </li>
          <li>
            Información sobre tu uso del sitio: como las páginas que visitas, la
            duración de tu navegación y tu interacción con nuestros contenidos.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Cómo Utilizamos tu Información
        </h2>
        <p className="mb-4">
          Utilizamos la información recopilada para los siguientes propósitos:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Personalizar y mejorar tu experiencia en el sitio.</li>
          <li>Responder a tus consultas o solicitudes.</li>
          <li>
            Garantizar el funcionamiento técnico del sitio y prevenir usos no
            autorizados.
          </li>
          <li>Cumplir con requisitos legales y normativos.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Compartir tu Información
        </h2>
        <p className="mb-4">
          No compartimos, vendemos ni alquilamos tu información personal a
          terceros, excepto en los siguientes casos:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Cuando sea necesario para proporcionar los servicios que solicitas.
          </li>
          <li>
            Para cumplir con leyes, regulaciones o procesos legales aplicables.
          </li>
          <li>
            Para proteger los derechos, la propiedad o la seguridad de{" "}
            <strong>FutBTV</strong>, nuestros usuarios u otros.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Uso de Cookies y Tecnologías Similares
        </h2>
        <p className="mb-4">
          Utilizamos cookies y tecnologías similares para recopilar información
          y mejorar tu experiencia. Las cookies son pequeños archivos de texto
          que se almacenan en tu dispositivo. Puedes configurar tu navegador
          para rechazar cookies, aunque esto podría afectar algunas funciones
          del sitio.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Enlaces a Terceros</h2>
        <p className="mb-4">
          Este sitio web pudiera contener enlaces a otros sitios que pudieran
          ser de su interés. Una vez que usted dé clic en estos enlaces y
          abandone nuestra página, ya no tenemos control sobre al sitio al que
          es redirigido y por lo tanto no somos responsables de los términos o
          privacidad ni de la protección de sus datos en esos otros sitios
          terceros. Dichos sitios están sujetos a sus propias políticas de
          privacidad por lo cual es recomendable que los consulte para confirmar
          que usted está de acuerdo con estas.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Protección de tu Información
        </h2>
        <p className="mb-4">
          Implementamos medidas de seguridad técnicas y organizativas para
          proteger tu información personal contra el acceso no autorizado, la
          alteración o divulgación. Sin embargo, ningún método de transmisión o
          almacenamiento de datos es completamente seguro.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Cambios en esta Política
        </h2>
        <p className="mb-4">
          Nos reservamos el derecho de actualizar esta Política de Privacidad en
          cualquier momento. Te recomendamos revisarla periódicamente para estar
          informado de cualquier cambio.
        </p>
      </div>
    </div>
  );
}
