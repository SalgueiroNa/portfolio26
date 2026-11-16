/**
 * PORTFOLIO — este es el archivo para editar.
 *
 * Textos, links y rutas de imágenes viven acá.
 * No borres las comas ni las comillas: si se rompe la sintaxis, el sitio no carga.
 *
 * Imágenes, videos y logos
 * - Cada imagen es un archivo en la carpeta assets/.
 * - Para cambiarla, reemplazá el archivo (podés usar .jpg, .png, .webp o .svg)
 *   y actualizá la ruta en "src" si cambia el nombre o la extensión.
 * - "cover" es la imagen del proyecto: tarjetas, índice y caso. Puede ser foto o video (.mp4, .webm).
 *   El video se reproduce solo, sin sonido y en bucle. "poster" es una imagen quieta mientras carga.
 * - "hero.video" es el video de fondo de la portada (assets/cover-hero.mp4).
 *   Se reproduce solo, sin sonido y en bucle. Para cambiarlo, reemplazá el archivo
 *   o la ruta en "src".
 * - "spoilers" ya no se muestra en la home.
 * - Actualizá también "alt" (descripción para lectores de pantalla) y "caption".
 * - La ilustración de Sobre mí es about.illustration (assets/sobre/ilustracion-sobremi.svg).
 * - La ilustración de Habilidades es abilities.mark.
 * - La ilustración de Contacto es contact.illustration.
 * - La ilustración de Trabajo seleccionado y del índice de proyectos es work.illustration.
 * - Cada ilustración tiene su versión "On" (illustrationOn / markOn): alternan solas cada 5 s al entrar la sección en pantalla.
 * - El gato del footer es footer.cat (reposo) y footer.catOn (hover o tap).
 * - Los logos de herramientas están en assets/herramientas/.
 *
 * CV
 * - Reemplazá assets/cv.pdf por tu currículum, o cambiá "cv" por otra ruta.
 * - "cvFileName" es el nombre con el que se descarga.
 *
 * Proyectos de ejemplo
 * - Los cuatro casos están marcados con example: true y muestran la etiqueta "Ejemplo".
 * - Cuando cargues un caso real, pasá example a false.
 * - Para sumar un proyecto, copiá un bloque dentro de projects y cambialo.
 *   El id se usa en la URL: proyecto.html?id=tu-id
 */
window.SITE = {
  name: "Natalia Salgueiro",
  role: "Hi! I'm Natalia",
  location: "Argentina",
  email: "dnataliasalguerio@gmail.com",
  linkedin: "https://www.linkedin.com/in/debora-natalia-salgueiro/",
  linkedinLabel: "linkedin.com/in/tu-perfil",
  cv: "assets/cv.pdf",
  cvFileName: "CV.pdf",
  description:
    "Con base en Argentina - disponible para proyectos remotos y presenciales.",
  hero: {
    video: {
      src: "assets/cover-hero.mp4",
    },
    image: {
      src: "assets/hero.svg",
      alt: "Video de portada",
    },
    title: "UX/UI & Industrial Designer",
    lede:
      "Based in Argentina - available for remote and on-site projects."
  },

  about: {
    illustration: {
      src: "assets/sobre/cat.svg",
      alt: "",
    },
    illustrationOn: {
      src: "assets/sobre/cat-On.svg",
      alt: "",
    },
    title: "Beyond the screens",
    lede: "A few things that inspire the way I think, create, and see the world.",
    text: "I'm Natalia, a UX/UI Designer and Industrial Designer based in Necochea, Argentina. I help businesses improve their digital experiences through user-centered design, combining strategy, creativity, and a passion for solving real-world problems.",
    moments: [
      {
        src: "assets/sobre/playa-necochea.svg",
        alt: "Costa. Reemplazar por tu foto.",
        tip: "Beach lover",
      },
      {
        src: "assets/sobre/mi-foto.svg",
        alt: "Retrato. Reemplazar por tu foto.",
        tip: "Hi! I'm Nati :)",
      },
      {
        src: "assets/sobre/mechi.svg",
        alt: "Compañía. Reemplazar por tu foto.",
        tip: "A cat person",
      },
    ],
  },

  skills: [
    {
      group: "UX / UI",
      items: [
        {
          name: "Investigación",
          detail: "Entrevistas, observación y lectura del contexto real de uso.",
        },
        {
          name: "Definición del problema",
          detail: "Qué hay que resolver ahora y qué puede esperar.",
        },
        {
          name: "Arquitectura de información",
          detail: "Estructura, nombres y jerarquía para que el producto se recorra solo.",
        },
        {
          name: "Flujos y wireframes",
          detail: "El recorrido antes de decidir colores.",
        },
        {
          name: "Interfaz",
          detail: "Pantallas, estados vacíos, errores y el momento en que la persona duda.",
        },
        {
          name: "Sistemas de diseño",
          detail: "Componentes y reglas para que el producto crezca sin perderse.",
        },
        {
          name: "Prototipos",
          detail: "Piezas que se pueden probar, no solo presentar.",
        },
        {
          name: "Pruebas con usuarios",
          detail: "Sesiones cortas para ver dónde se traba la tarea.",
        },
        {
          name: "Handoff y lanzamiento",
          detail: "Acompañamiento a desarrollo hasta la versión que sale.",
        },
      ],
    },
    {
      group: "Diseño industrial",
      items: [
        {
          name: "Conceptualización",
          detail: "De la necesidad a una forma que se puede fabricar y usar.",
        },
        {
          name: "Exploración formal",
          detail: "Boceto, proporción y el gesto con el que se toma un objeto.",
        },
        {
          name: "Materiales y manufactura",
          detail: "Criterio para elegir cómo se produce, no solo cómo se ve.",
        },
        {
          name: "Modelado 3D",
          detail: "Volumen para evaluar la pieza antes de construirla.",
        },
        {
          name: "Productos físico-digitales",
          detail: "Cuando el objeto y la interfaz tienen que decir lo mismo.",
        },
      ],
    },
  ],

  process: {
    title: "Flow",
    lede: "Our process for turning ideas into real, working solutions that deliver amazing results.",
    stepsLabel: "Process: 4 steps",
    durationLabel: "Duration: ~ 1 month",
    steps: [
      {
        title: "Discover",
        text: "Understanding your challenge, your audience, and what success looks like for you.",
        percent: "",
        image: { src: "assets/proceso/search-illustration.svg", alt: "Discover" },
        imageHover: { src: "assets/proceso/searchOn-illustration.svg", alt: "" },
      },
      {
        title: "Design",
        text: "Ideas take shape. We explore directions, test concepts, and refine until it feels right.",
        percent: "",
        image: { src: "assets/proceso/design-illustration.svg", alt: "Design" },
        imageHover: { src: "assets/proceso/designOn- illustration.svg", alt: "" },
      },
      {
        title: "Build",
        text: "We develop the final product with attention to every detail and technical precision.",
        percent: "",
        image: { src: "assets/proceso/build-illustration.svg", alt: "Build" },
        imageHover: { src: "assets/proceso/buildOn-illustration.svg", alt: "" },
      },
      {
        title: "Launch",
        text: "We manage the launch, provide training if needed, and ensure a smooth transition.",
        percent: "",
        image: { src: "assets/proceso/launch-illustration.svg", alt: "Launch" },
        imageHover: { src: "assets/proceso/launchOn-illustration.svg", alt: "" },
      },
    ],
  },

  abilities: {
    title: "The skills behind the work",
    lede: "A blend of strategy, creativity, and execution to turn complex challenges into meaningful experiences.",
    items: [
      { label: "User Experience Design", x: "0px", y: "-160px" },
      { label: "Usability Testing", x: "-220px", y: "-30px" },
      { label: "User Interface Design", x: "220px", y: "-30px" },
      { label: "Design Systems", x: "-260px", y: "0px" },
      { label: "Product thinking", x: "260px", y: "0px" },
      { label: "User Research", x: "-180px", y: "40px" },
      { label: "Problem solving", x: "180px", y: "40px" },
      { label: "Wireframing & Prototyping", x: "0px", y: "160px" },
    ],
    mark: {
      src: "assets/habilidades/ilustracion-skills.svg",
      alt: "",
    },
    markOn: {
      src: "assets/habilidades/ilustracion-skillsOn.svg",
      alt: "",
    },
  },

  tools: [
    { name: "Figma", src: "assets/herramientas/figma.svg" },
    { name: "FigJam", src: "assets/herramientas/figjam.svg" },
    { name: "Photoshop", src: "assets/herramientas/photoshop.svg" },
    { name: "Illustrator", src: "assets/herramientas/illustrator.svg" },
    { name: "After Effects", src: "assets/herramientas/after-effects.svg" },
    { name: "Blender", src: "assets/herramientas/blender.svg" },
    { name: "ProtoPie", src: "assets/herramientas/protopie.svg" },
    { name: "Maze", src: "assets/herramientas/maze.svg" },
    { name: "Notion", src: "assets/herramientas/notion.svg" },
    { name: "Miro", src: "assets/herramientas/miro.svg" },
  ],

  contact: {
    title: "Hablemos",
    lede:
      "Estoy disponible para sumarme a un equipo o para tomar un proyecto freelance, en remoto y de la conceptualización al lanzamiento.",
    homeTitle: "Si hay un producto dando vueltas, lo podemos ordenar.",
    illustration: {
      src: "assets/contacto/Ilustracion-contacto.svg",
      alt: "",
    },
    illustrationOn: {
      src: "assets/contacto/Ilustracion-contactoOn.svg",
      alt: "",
    },
  },

  footer: {
    cat: { src: "assets/gato.svg", alt: "" },
    catOn: { src: "assets/gato-on.svg", alt: "" },
  },

  work: {
    illustration: {
      src: "assets/trabajo/ilustracion-proyectos.svg",
      alt: "",
    },
    illustrationOn: {
      src: "assets/trabajo/ilustracion-proyectosOn.svg",
      alt: "",
    },
  },

  spoilers: [
    {
      project: "Bebesure",
      src: "assets/proyectos/bebesure-desktop.svg",
      alt: "Adelanto del caso Bebesure",
    },
    {
      project: "Linmania",
      src: "assets/proyectos/linmania.svg",
      alt: "Adelanto del caso Linmania",
    },
    {
      project: "Ministerio de Industria",
      src: "assets/proyectos/quinto-ministerio.svg",
      alt: "Adelanto del caso Ministerio",
    },
    {
      project: "Ona Hotels & Apartments",
      src: "assets/proyectos/ona-careers.svg",
      alt: "Adelanto del caso Ona",
    },
    {
      project: "Bebesure",
      src: "assets/proyectos/bebesure-mobile.svg",
      alt: "Adelanto del caso Bebesure",
    },
    {
      project: "Rep-on",
      src: "assets/proyectos/rep-on.svg",
      alt: "Adelanto del caso Rep-on",
    },
    {
      project: "Ona Hotels & Apartments",
      src: "assets/proyectos/ona-mobile.svg",
      alt: "Adelanto del caso Ona",
    },
    {
      project: "Quinto Impacto",
      src: "assets/proyectos/uikit-quinto.svg",
      alt: "Adelanto del caso quinto",
    },
  ],

  projects: [
    {
      id: "Rockstar",
      example: false,
      title: "Rockstar Benidorm",
      subtitle: "Comida, música en vivo y eventos, todo en una misma web.",
      summary: "",
      year: "",
      tags: ["UX/UI", "Investigación", "Website"],
      cover: {
        src: "assets/proyectos/nido/coverRockstar.mp4",
        alt: "Portada del caso Rockstar",
        caption: "",
      },
      meta: [
        { label: "Año", value: "2026" },
        { label: "Rol", value: "UX/UI de punta a punta" },
        { label: "Ámbito", value: "Producto digital" },
      ],
      sections: [
        {
          title: "Problema",
          paragraphs: [
            "Rockstar es un bar-restaurante de Benidorm que ofrece gastronomía, conciertos en vivo y la posibilidad de organizar eventos privados en tres salas diferenciadas.",
            "Durante el verano, la afluencia de turistas favorecía la actividad del local. Sin embargo, fuera de temporada, las ventas disminuían considerablemente.",
            "El negocio necesitaba mejorar su presencia online y comunicar todo lo que ofrecía, más allá de su propuesta gastronómica. El desafío era atraer tanto a turistas extranjeros interesados en celebrar eventos privados como al público local que buscaba conciertos y entretenimiento en vivo.",
            "Objetivo: diseñar una web que fortaleciera la presencia digital de Rockstar, diera visibilidad a sus diferentes servicios y adaptara la comunicación a las motivaciones de cada público.",
          ],
          images: [
            {
              src: "assets/proyectos/nido/problemaRockstar.png",
              alt: "Definicion de problema",
              caption: "",
            },

          ],
        },
        {
          title: "Mi rol",
          paragraphs: [
            "Diseñé la experiencia UX/UI del sitio web, desde la investigación inicial y la definición de la estructura hasta el diseño visual y el prototipo final. Trabajé en conjunto con el cliente y el equipo de desarrollo para validar la arquitectura, definir los contenidos de cada sección y asegurar una propuesta coherente con los objetivos comerciales del negocio.",
          ],
          images: [
            {
              src: "assets/proyectos/nido/moodboards.svg",
              alt: "Moodboards",
              caption: "",
            },
            {
              src: "assets/proyectos/nido/esquemaProyecto.svg",
              alt: "Arbol de navegación de las webs",
              caption: "Arbol de navegación de las webs en versión Español e Inglés.",
            },
          ],
        },
        {
          title: "Proceso",
          paragraphs: [
            "1. Empatizar e investigar:",
            "Investigué las preferencias y motivaciones de los dos públicos, analizando reseñas en inglés y español para identificar aspectos relevantes de sus experiencias y expectativas. Complementé esta investigación con un benchmarking de propuestas similares para entender cómo otros negocios comunicaban sus servicios y construían su identidad digital.",
            "2. Definir la dirección estratégica:",
            "A partir de los hallazgos, trabajé en una propuesta que diferenciara las prioridades de comunicación según el idioma y el público objetivo.",
            /*"La versión en inglés debía destacar las fiestas privadas, los cumpleaños y las despedidas de soltero y soltera, planes especialmente relevantes para los turistas que visitan Benidorm.",
            "La versión en español debía dar mayor protagonismo a los conciertos en vivo, con el objetivo de conectar con el público local.",*/
            "Para establecer la identidad visual, desarrollé dos moodboards conceptuales que permitieron explorar y definir la dirección artística del sitio junto al cliente.",
            "3. Diseñar la estructura y los contenidos",
            "Desarrollé los wireframes para organizar las secciones y jerarquizar la información. Validé la estructura con el cliente antes de avanzar con el diseño visual.",
            /*"Definí los contenidos de cada sección considerando los objetivos de comunicación de ambas versiones, contemplando la agenda de conciertos, los eventos privados, la carta de comidas y bebidas y el formulario de contacto.",*/
            "4. Prototipar y validar",
            "Diseñé el prototipo final en versiones desktop y mobile, adaptando la interfaz a distintos tamaños de pantalla.",
            "Validé la propuesta primero con el equipo de desarrollo y luego con el cliente. Incorporé las correcciones necesarias para alinear el resultado final con los objetivos del negocio y preparar su implementación.",
          ],
          images: [
            {
              src: "assets/proyectos/nido/insights.svg",
              alt: "Hallazgos a partir de la investigación",
              caption: "",
            },
            {
              src: "assets/proyectos/nido/wireframes.svg",
              alt: "Wireframes de la web en version movil",
              caption: "",
            },
          
          ],
        },
        {
          title: "Solución",
          paragraphs: [
            "Un sitio web responsive y bilingüe que comunica la propuesta integral de Rockstar y adapta sus prioridades de contenido según el público.",
            "En lugar de limitarse a traducir los textos, la experiencia diferencia qué servicios destacar en cada idioma:",
            "Versión en inglés: prioriza los eventos privados y las posibilidades de organizar celebraciones en las tres salas del local.",
            "Versión en español: destaca la agenda de conciertos en vivo para atraer al público local.",
            "Ambas versiones incluyen acceso a la información gastronómica, los servicios del establecimiento y los canales de contacto, manteniendo una experiencia visual coherente en desktop y mobile.",

          ],
          images: [
            {
              src: "assets/proyectos/nido/protoMobile.mp4",
              alt: "Prototipo en version movil",
              caption: "",
            },
            {
              src: "assets/proyectos/nido/protoES.mp4",
              alt: "Prototipo web idioma español",
              caption: "",
            },
            {
              src: "assets/proyectos/nido/protoUK.mp4",
              alt: "Prototipo web idioma ingles",
              caption: "",
            },
          ],
        },
        {
          title: "Resultados",
          paragraphs: [
            "Implementación: el sitio web fue desarrollado y publicado.",
            "Alineación con el cliente: la propuesta recibió feedback positivo durante el proceso de diseño y validación.",
            "Comunicación diferenciada: la web se estructuró para destacar distintos servicios según las motivaciones de los públicos de habla inglesa y española.",
            "Presencia digital integral: el sitio reúne la programación musical, los eventos privados, la oferta gastronómica y las opciones de contacto en una misma experiencia.",

          ],
          images: [
            {
              src: "assets/proyectos/nido/mockups.png",
              alt: "Mockup de la web en version movil y desktop",
              caption: "",
            },
            {
              src: "assets/proyectos/nido/mockupsUK.svg",
              alt: "Mockup de la web en version movil y desktop",
              caption: "",
            },
          ],
        },
      ],
    },
    {
      id: "Bebe Sure",
      example: false,
      title: "Bebe Sure",
      subtitle: "Rediseño UX/UI de un e-commerce de productos infantiles",
      summary:"Construir una experiencia de compra más clara, consistente y accesible",
      year: "",
      tags: ["UX/UI", "E-commerce"],
      cover: {
        src: "assets/proyectos/lumen/cover-Bebesure.mp4",
        alt: "Portada del caso Bebesure",
        caption: "",
      },
      meta: [
        { label: "Año", value: "2025" },
        { label: "Rol", value: "UX/UI y criterio de producto" },
        { label: "Ámbito", value: "E-commerce" },
      ],
      sections: [
        {
          title: "Problema",
          paragraphs: [
            "La tienda presentaba inconsistencias en la navegación y en la jerarquía visual, lo que dificultaba comprender la estructura del sitio y reconocer qué acciones realizar en cada sección. La falta de criterios visuales consistentes también afectaba la claridad y la accesibilidad de la experiencia.",
            "El desafío era reorganizar la experiencia para que las personas pudieran encontrar productos, comprender sus características y avanzar en la compra de forma más intuitiva.",
          ],
          images: [
            {
              src: "assets/proyectos/lumen/hallazgos.svg",
              alt: "Hallazgos detectados apartir de la asesoría.",
              caption: "",
            },
          ],
        },
        {
          title: "Mi rol",
          paragraphs: [
            "Fui responsable de la auditoría UX y del rediseño UX/UI de la tienda online de BebeSure, desarrollada en WooCommerce. Analicé la experiencia existente e identifiqué oportunidades de mejora para facilitar la navegación, la comprensión de los productos y el proceso de compra.",
            ],
          images: [
            {
              src: "assets/proyectos/lumen/analisis.svg",
              alt: "Asesoría de la tienda online de Bebesure",
              caption: "",
            },
          ],
        },
        {
          title: "Proceso",
          paragraphs: [
              "A partir de los hallazgos, definí oportunidades de mejora y trabajé en la reorganización de la arquitectura de información y los elementos de interfaz. El proceso incluyó el rediseño de la navegación, los filtros, los favoritos y el checkout, junto con la definición de estilos tipográficos y criterios visuales más consistentes.",
          ],
          images: [
            {
              src: "assets/proyectos/lumen/ESTILOS.svg",
              alt: "Guía de estilos de la tienda online.",
              caption: "",
            },
            {
              src: "assets/proyectos/lumen/componentes.svg",
              alt: "Algunos componentes de la tienda online.",
              caption: "Algunos componentes de la tienda online.",
            },
          ],
        },
        {
          title: "Solución",
          paragraphs: [
            "Diseñé una experiencia de compra más clara y coherente, con una estructura de navegación mejor organizada, elementos de interfaz consistentes y una jerarquía visual que facilita identificar la información relevante.",
            "El rediseño también contempló funcionalidades clave para explorar y seleccionar productos, como filtros y favoritos, y una experiencia de checkout más integrada con el resto de la tienda.",
          ],
          images: [
            {
              src: "assets/proyectos/lumen/mockups-web.svg",
              alt: "Algunos mockups de la tienda online",
              caption: "",
            },
            {
              src: "assets/proyectos/lumen/mockups-movil.svg",
              alt: "Mockups del flujo carrito de la tienda online",
              caption: "",
            },
          ],
        },
        {
          title: "Resultados",
          paragraphs: [
            "El rediseño fue implementado en la tienda online.",
            "El proyecto permitió mejorar la coherencia de la experiencia digital y sentar una base visual y estructural más clara para acompañar el proceso de compra.",
          ],
          images: [
            {
              src: "assets/proyectos/lumen/proto-desktop.mp4",
              alt: "Prototipo de la tienda online en version desktop",
              caption: "",
            },
            {
              src: "assets/proyectos/lumen/proto-movil.mp4",
              alt: "Prototipo de la tienda online en version movil",
              caption: "",
            },
          ],
        },
      ],
    },
    {
      id: "Ministerio de Industria",
      example: false,
      title: "Ministerio de Industria - Quinto Impacto",
      subtitle: "Transferencias claras para una billetera de cooperativa.",
      summary:
        "Una plataforma para conectar empresas con oportunidades de financiamiento",
      year: "",
      tags: ["UX/UI", "Plataforma B2B", "Fintech"],
      cover: {
        src: "assets/proyectos/cauce/coverQuinto.mp4",
        alt: "Portada del caso Ministerio de Industria",
        caption: "",
      },
      meta: [
        { label: "Año", value: "2024" },
        { label: "Rol", value: "UX/UI" },
        { label: "Ámbito", value: "Producto digital" },
      ],
      sections: [
        {
          title: "Problema",
          paragraphs: [
            "Las empresas necesitan acceder a financiamiento para impulsar sus proyectos productivos, pero encontrar entidades financieras y conocer las alternativas de garantía disponibles puede ser una barrera.",
            "El Ministerio de Industria de Mendoza necesitaba una plataforma que facilitara la conexión entre tres actores: empresas que buscaban financiamiento, entidades financieras y Sociedades de Garantía Recíproca (SGR).",
            "Objetivo: facilitar el descubrimiento de oportunidades de financiamiento y el contacto entre empresas, entidades financieras y SGR.",
          ],
          images: [
            {
              src: "assets/proyectos/cauce/problemaQuinto.png",
              alt: "Problema presentado",
              caption: "",
            },
          ],
        },
        {
          title: "Mi rol",
          paragraphs: [
            "Trabajé junto a otra diseñadora en la definición de flujos de usuario, la creación de wireframes, el desarrollo de la guía de estilos y el diseño del prototipo final. Participé en reuniones de investigación, definición funcional y seguimiento con el cliente. También colaboré en la presentación de la solución y en la preparación de la documentación de handoff.",
            
          ],
          images: [
            {
              src: "assets/proyectos/cauce/Userflows.png",
              alt: "Flujos de usuario",
              caption: "",
            },
            {
              src: "assets/proyectos/cauce/GuiadeEstilos.png",
              alt: "Estilos de la app",
              caption: "",
            },
          ],
        },
        {
          title: "Proceso",
          paragraphs: [
            "1. Comprender y definir",
            "Participé en reuniones de investigación y definición funcional junto al equipo y el cliente. Trabajé en la definición de los requerimientos, el problema y los objetivos del producto, considerando las necesidades de los tres perfiles de usuario.",
            "2. Estructurar los flujos de usuario",
            "Definí los flujos para organizar la navegación y las funcionalidades según las necesidades de cada perfil.",
            "Empresas: explorar entidades financieras y SGR, consultar información de otras empresas, publicar proyectos y administrar sus propias publicaciones.",
            "Entidades financieras: descubrir proyectos por categoría, consultar su detalle y contactar a las empresas que los publicaron. También podían explorar empresas y otras entidades.",
            "SGR: acceder a las mismas funcionalidades de exploración y consulta que las entidades financieras.",
            "Esta estructura contemplaba distintos objetivos de uso y diferenciaba el acceso a la información según el tipo de usuario.",
            "3. Diseñar y prototipar",
            "Desarrollé wireframes para definir la estructura de las pantallas y la organización de la información. Luego diseñé la guía de estilos y construí el prototipo final, dando consistencia visual a la experiencia y permitiendo recorrer los principales flujos de la plataforma.",
            "4. Validar y preparar la entrega",
            "Revisé la propuesta junto a la otra diseñadora del equipo y el cliente. Incorporé las correcciones necesarias y presenté el prototipo final junto con la documentación de handoff, dejando formalizada la solución para su implementación.",

          ],
          images: [
            {
              src: "assets/proyectos/cauce/capturasApp.svg",
              alt: "Vista del prototipo y flujos de la app",
              caption: "Captura de la app en Figma",
            },
            {
              src: "assets/proyectos/cauce/proyectoFigma.png",
              alt: "Vista del prototipo y flujos de la app",
              caption: "Captura de la app en Figma",
            },
           
          ],
        },
        {
          title: "Solución",
          paragraphs: [
            "Una plataforma digital que organiza el acceso a proyectos productivos y entidades relevantes según el perfil del usuario.",
            "Para las empresas, la experiencia permite explorar y filtrar listados de entidades financieras y SGR, consultar información de otras empresas, publicar proyectos y acceder a un listado con el detalle de sus propias publicaciones.",
            "Para las entidades financieras y las SGR, la plataforma facilita el descubrimiento de oportunidades mediante categorías de proyectos publicados, acceso al detalle de cada proyecto y contacto con la empresa responsable. También permite consultar listados de empresas, entidades financieras y SGR.",
            "La solución organiza la información y las acciones principales en función de las necesidades de cada perfil, dentro de una experiencia común.",
          ],
          images: [
            {
              src: "assets/proyectos/cauce/prototipoFinal.mp4",
              alt: "Video del prototipo de la app",
              caption: "",
            },
          
          ],
        },
        {
          title: "Resultados",
          paragraphs: [
            "Implementación: la plataforma fue implementada y entregada al cliente.",
            "Validación de la propuesta: el feedback del cliente fue positivo y la solución respondió a la necesidad planteada.",
            "Transferencia a desarrollo: el prototipo final y la documentación de handoff permitieron formalizar los flujos y la propuesta de interfaz.",
          ],
          images: [
            {
              src: "assets/proyectos/cauce/solucionQuinto.png",
              alt: "Solucion presentada.",
              caption: "",
            },
     
          ],
        },
      ],
    },
    {
      id: "Ona Hotels & Apartments",
      example: false,
      title: "Ona Hotels & Apartments",
      subtitle: "Property Management System para gestión hotelera",
      summary:
        "Property Management System para gestión hotelera",
      year: "",
      tags: ["UX/UI", "Product Design", "SaaS"],
      cover: {
        src: "assets/proyectos/oficio/portadaOna.mp4",
        alt: "Portada del caso Oficio",
        caption: "",
      },
      meta: [
        { label: "Año", value: "2022-2024" },
        { label: "Rol", value: "Investigación y UX/UI" },
        { label: "Ámbito", value: "SaaS" },
      ],
      sections: [
        {
          title: "Problema",
          paragraphs: [
            "El problema principal era la falta de una herramienta que permitiera gestionar de manera eficiente y centralizada todos los procesos de la empresa.",
            "Una de las áreas afectadas era Recursos Humanos. El equipo necesitaba gestionar las ofertas laborales y las candidaturas desde el sistema interno, mientras que las personas interesadas debían poder consultar las búsquedas y postularse desde un sitio externo.",
            "El desafío era organizar ambos entornos y conectar las necesidades operativas del equipo con una experiencia de postulación clara, contemplando las distintas etapas del proceso de selección y la comunicación con los candidatos.",
          ],
          images: [
            {
              src: "assets/proyectos/oficio/problema.png",
              alt: "Estado de una pieza repartido entre mail y planilla",
              caption: "",
            },
          ],
        },
        {
          title: "Mi rol",
          paragraphs: [
            "Fui responsable del diseño completo del PMS, compuesto por más de 20 módulos, trabajando codo a codo con el equipo de desarrollo y los responsables de las distintas áreas del negocio.",
            "Mi trabajo abarcó todo el proceso de diseño, desde el relevamiento inicial hasta la entrega de las soluciones para su implementación:",
            "Relevamiento y análisis: me reunía con los responsables de cada área para comprender sus procesos de trabajo, identificar necesidades y detectar los principales problemas de uso.",
            "Definición funcional y documentación: traducía los requerimientos relevados en documentación funcional que presentaba al equipo de desarrollo para alinear criterios y definir el alcance de cada solución.",
            "Diseño UX/UI: diseñaba los flujos de usuario, wireframes e interfaces finales, adaptando cada solución a las necesidades de los distintos perfiles y áreas.",
            "Validación e iteración: revisaba las propuestas con el equipo de desarrollo y los usuarios, incorporaba el feedback y realizaba los ajustes necesarios.",
            "Handoff a desarrollo: preparaba y entregaba la documentación de diseño para facilitar la implementación y mantener la coherencia entre lo diseñado y lo desarrollado.",

          ],
          images: [
            {
              src: "assets/proyectos/oficio/cronogramaReuniones.png",
              alt: "Cronograma de reuniones",
              caption: "Cronograma de reuniones.",
            },
            {
              src: "assets/proyectos/oficio/uikitOna.png",
              alt: "Guía de estilos del sistema",
              caption: "Una parte de la Guía de estilos y componentes del sistema.",
            },
            {
              src: "assets/proyectos/oficio/flujos.png",
              alt: "Algunos flujos del sistema",
              caption: "Algunos flujos del sistema.",
            },
          ],
        },
        {
          title: "Proceso",
          paragraphs: [
            "Trabajé en conjunto con el equipo y los referentes del proyecto para comprender los requerimientos y definir las funcionalidades de ambos entornos.",
            "Diseñé los flujos de usuario, estructuré la información y desarrollé wireframes y prototipos en Figma. Luego, validamos la propuesta con el equipo y los usuarios involucrados, incorporamos ajustes y preparamos la documentación necesaria para su implementación.",
          ],
          images: [
            {
              src: "assets/proyectos/oficio/procesoSeleccion1.png",
              alt: "Recorrido de una pieza desde el encargo",
              caption: "",
            },
            {
              src: "assets/proyectos/oficio/procesoSeleccion2.png",
              alt: "Prueba del tablero con el estudio y un cliente",
              caption: "",
            },
          ],
        },
        {
          title: "Solución",
          paragraphs: [
            "Diseñé dos experiencias conectadas:",
            "Módulo de Recursos Humanos: permite publicar y administrar ofertas laborales, consultar candidatos y empleados, y gestionar las etapas de selección. Incluye acciones como solicitar entrevistas, marcar finalistas, enviar propuestas y seleccionar candidatos.",
            "Sitio de candidaturas: permite conocer la empresa, explorar las ofertas disponibles, consultar sus detalles y postularse mediante un formulario con adjunto de CV.",
            "Además, los cambios de estado de las candidaturas activan notificaciones automáticas por correo electrónico, manteniendo informadas a las personas durante el proceso.",
          ],
          images: [
            {
              src: "assets/proyectos/oficio/flujoModulo.mp4",
              alt: "Tablero con piezas y sus estados",
              caption: "",
            },
            {
              src: "assets/proyectos/oficio/webRRHH.mp4",
              alt: "Ficha de una pieza con la vista del cliente",
              caption: "",
            },
          ],
        },
        {
          title: "Resultados",
          paragraphs: [
            "Las soluciones diseñadas fueron implementadas. El proyecto permitió articular la gestión interna de las búsquedas laborales con la experiencia externa de postulación, conectando las acciones del equipo de Recursos Humanos con las comunicaciones dirigidas a los candidatos.",
            "También dejó definidos los flujos, las interfaces y la documentación necesarios para llevar la solución a desarrollo.",
          ],
          images: [  
          ],
        },
      ],
    },
  ],
};
