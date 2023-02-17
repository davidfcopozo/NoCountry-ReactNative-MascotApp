const axios = require("axios").default;

const datos = [
  {
    "name": "Ana",
    "surname": "Pérez",
    "age": 28,
    "city": "Santa Fe",
    "offers_services": true,
    "description": "Traslados de mascotas por el territorio nacional haciendo posible que las familias se reúnan en cualquier lugar sin tener que moverse de sus lugares.",
    "rating": 3,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Laura",
    "surname": "Martínez",
    "age": 45,
    "city": "Rosario",
    "offers_services": true,
    "description": "Refugio a distintos animales, proporcionando atención básica a las mascotas del hogar.",
    "rating": 4,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Miguel",
    "surname": "Quinteros",
    "age": 25,
    "city": "Córdoba",
    "offers_services": true,
    "description": "Me gusta pasar el tiempo con las mascotas, especialmente los gatos y los perros. Ofrezco paseos diarios y/o semanales",
    "rating": 2,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Viviana",
    "surname": "Jiménez",
    "age": 33,
    "city": "Río Cuarto",
    "offers_services": true,
    "description": "Peluquera canina con 4 años de experiencia en el sector, brindando un trato especial y dándole el mejor look a tus mascotas.",
    "rating": 4,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Romina",
    "surname": "Sánchez",
    "age": 43,
    "city": "Buenos Aires",
    "offers_services": false,
    "description": "Estoy buscando servicios relacionados al paseo y el cuidado de mis dos amores; mi perro Tito y mi gata Lola. En Avellaneda y alrededores.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Marcos",
    "surname": "González",
    "age": 19,
    "city": "La Plata",
    "offers_services": true,
    "description": "Ofrezco alojamiento y cuidado a tus mascotas.",
    "rating": 1,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Diego",
    "surname": "Álvarez",
    "age": 22,
    "city": "Mar del Plata",
    "offers_services": true,
    "description": "Brindo mi hogar como residencia canina. Además, ofrezco paseos diarios y traslados con una distancia máxima de 500km.",
    "rating": 5,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Pedro",
    "surname": "Iglesias",
    "age": 36,
    "city": "Bahía Blanca",
    "offers_services": true,
    "description": "El mejor cuidador y paseador que tu mascota puede tener. Los perros me aman!",
    "rating": 4,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "María",
    "surname": "Stoltenberg",
    "age": 46,
    "city": "Salta",
    "offers_services": true,
    "description": "Entrenadora profesional de perros, ampliamente reconocida en ciudad de Salta y alrededores.",
    "rating": 5,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Josefina",
    "surname": "Reichert",
    "age": 34,
    "city": "Mendoza",
    "offers_services": false,
    "description": "Busco urgentemente personal que cuide y aloje a mis dos gatos por un período de 3 semanas.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Carlos",
    "surname": "Rodríguez",
    "age": 26,
    "city": "Neuquén",
    "offers_services": false,
    "description": "Estoy en la búsqueda de un entrenador profesional de mascotas.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Juan",
    "surname": "Calderón",
    "age": 53,
    "city": "Corrientes",
    "offers_services": true,
    "description": "Servicio completo de peluquería y transporte para tus mejores amigos caninos.",
    "rating": 1,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Ignacio",
    "surname": "Hermann",
    "age": 48,
    "city": "San Miguel de Tucumán",
    "offers_services": false,
    "description": "Estoy en la búsqueda activa de un adiestrador profesional para mi perro Lalo.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Pablo",
    "surname": "Cisneros",
    "age": 18,
    "city": "Santiago del Estero",
    "offers_services": true,
    "description": "Transporte, alojamiento y los mejores cuidados para tu mejor amigo de 4 patas.",
    "rating": 3,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Luis",
    "surname": "Casas",
    "age": 21,
    "city": "San Juan",
    "offers_services": true,
    "description": "La mejor asistencia y compañía para tus perros y gatos.",
    "rating": 2,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Eugenia",
    "surname": "Campos",
    "age": 31,
    "city": "Formosa",
    "offers_services": false,
    "description": "Dueña de cinco mascotas; entre ellas, perros, gatos y peces. Estoy buscando dónde dejarlas por un lapso de 2 semanas.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Miriam",
    "surname": "Pintos",
    "age": 44,
    "city": "La Rioja",
    "offers_services": true,
    "description": "Dueña de peluquería en la ciudada de La Rioja con más de 5 años de trayectoria en el sector.",
    "rating": 4,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Manuel",
    "surname": "López",
    "age": 29,
    "city": "Resistencia",
    "offers_services": true,
    "description": "Adoro pasar el tiempo con animales. Es por ello que en mis tiempos libres paseo y cuido perros. Tengo gran disponibilidad!",
    "rating": 3,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Claudio",
    "surname": "Juárez",
    "age": 36,
    "city": "Santa Rosa",
    "offers_services": false,
    "description": "Busco transporte de manera urgente para mis 6 mascotas.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Silvia",
    "surname": "Morales",
    "age": 39,
    "city": "Posadas",
    "offers_services": true,
    "description": "Alojo y cuido mascotas en mi domicilio particular.",
    "rating": 1,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Paula",
    "surname": "Gamboa",
    "age": 45,
    "city": "San Salvador de Jujuy",
    "offers_services": false,
    "description": "Necesito pasedor y entrenador personal de perros.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Iván",
    "surname": "Llanos",
    "age": 22,
    "city": "San Luis",
    "offers_services": true,
    "description": "Mi gran hobby es cuidar gatos en mi propia casa. Ofrezco un servicio profesional y responsable.",
    "rating": 5,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Nora",
    "surname": "Lamberti",
    "age": 20,
    "city": "Comodoro Rivadavia",
    "offers_services": false,
    "description": "Busco a un profesional que sepa adiestrar y entrenar mascotas, ya que tengo dos cachorros que necesitan educación.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Augusto",
    "surname": "Soria",
    "age": 24,
    "city": "Paraná",
    "offers_services": true,
    "description": "Empleado de veterinaria que ofrece una amplia variedad de servicios y atención full time para tus mascotas.",
    "rating": 2,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Francisco",
    "surname": "Peralta",
    "age": 37,
    "city": "Viedma",
    "offers_services": true,
    "description": "Dueño de veterinaria con una trayectoria profesional de 10 años siempre al cuidado de tus mejores amigos de 4 patas.",
    "rating": 4,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Agustina",
    "surname": "Perlaza",
    "age": 48,
    "city": "Ushuaia",
    "offers_services": false,
    "description": "Busco alojamiento para mis dos gatos en la ciudad de Ushuaia y alrededores.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Teresa",
    "surname": "Sosa",
    "age": 30,
    "city": "Rawson",
    "offers_services": true,
    "description": "Cuido y alojo a una amplia variedad de mascotas, como pueden ser gatos, perros, hámsters y peces.",
    "rating": 1,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Lorena",
    "surname": "Bustos",
    "age": 40,
    "city": "Río Gallegos",
    "offers_services": true,
    "description": "Junto a mi marido llevamos adelante una veterinaria desde hace dos años. Operamos en la localidad de Río Gallegos y en cercanías.",
    "rating": 2,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  },
  {
    "name": "Bruno",
    "surname": "Bonaventi",
    "age": 50,
    "city": "San Fernando del Valle de Catamarca",
    "offers_services": false,
    "description": "Voy a estar fuera de casa por un mes aproximadamente y necesito una persona que cuide de mi perro Pipo y mi gata Lara.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "uid": 1
  },
  {
    "name": "Carmen",
    "surname": "Monchi",
    "age": 55,
    "city": "Guaymallén",
    "offers_services": false,
    "description": "Vivo sola con mi gata Florencia. Estoy buscando transporte y alojamiento para ella porque me voy de vacaciones por una semana.",
    "rating": 0,
    "profile_pic": "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
    "uid": 1
  }
]

const getUsersFromApi = async () => {
  //const { data } = await axios.get("https://apimocha.com/mascot-app/users");
  return datos;
};

module.exports = getUsersFromApi;
