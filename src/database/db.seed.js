const Product = require('../models/Product.model');
const Message = require('../models/Message.model');
const { logger } = require('../helpers/logger');

const productos = [
	//Almacenamiento
	{
		title: "Targeta microSD Kingston Canvas Select Plus 64GB",
		price: 2150,
		desc: "Controlador SATA III más reciente. Velocidades de lectura de hasta 450 MB / s.	Soporte de recorte. Gestión de bajo consumo. MTBF: 2,000,000 horas. Nivelación de desgaste estática y dinámica. Temperatura de funcionamiento: 0 ~ 70 ° C",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666908417/h0nu4sf0uthgnkx3eyts.png",
		categorie: "almacenamiento"
	},
	{
		title: "Disco Sólido SSD Patriot Burst Elite 120GB SATA 2.5'",
		price: 5839,
		desc: "Interfaz: SATA 6.0Gb/s. Factor de forma: SSD interno de 2.5'. Capacidad total: 120GB. NAND: NAND Flash. Velocidad de lectura secuencial: Hasta 500 MB/s ; Mínimo 350 MB/s.	Velocidad de escritura secuencial: Hasta 380 MB/s ; Mínimo 280 MB/s. IOPS de lectura al azar: Hasta 50k. IOPS de escritura al azar: Hasta 60k. Dimensiones: 69.85 x 7 x 100 mm",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666908601/mapcdghti4iayofo7bw8.webp",
		categorie: "almacenamiento"
	},
	{
		title: "Disco Sólido SSD GIGABYTE 120GB SATA 2.5'",
		price: 6131,
		desc: "Controlador SATA III más reciente. Rendimiento: 100 MB/s en lectura, clase de velocidad UHS-I, U1, V10. Dimensiones: 11 mm x 15 mm x 1 mm (microSD) / 24 mm x 32 mm x 2,1 mm (con adaptador de SD). Formato: exFAT.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666908760/iipqkwjcizle28coheg4.webp",
		categorie: "almacenamiento"
	},
	{
		title: "Disco SSD M.2 Markvision Original 128GB 2280 SATA (BULK)",
		price: 7007,
		desc: "Este producto es versión BULK y viene en bolsa antiestática sin caja. No todos los motherboards soportan M.2 tipo SATA, asegúrese de chequear su compatibilidad",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666908882/qvwemzzjapm0pio844yl.png",
		categorie: "almacenamiento"
	},
	{
		title: "Disco Sólido SSD Western Digital WD Green 240GB SATA 2.5'",
		price: 7299,
		desc: "Almacenamiento mejorado para sus necesidades informáticas diarias: Si desea confiabilidad y un rendimiento rápido, los discos SSD WD Green mejoran la experiencia informática diaria en su equipo portátil o computadora de escritorio. Rendimiento mejorado para la informática diaria: Gracias al óptimo rendimiento del disco WD Green SATA SSD, usted puede navegar por la Web, disfrutar un juego o simplemente iniciar su sistema en un instante.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666908987/vstibpqfn915pkbf9060.webp",
		categorie: "almacenamiento"
	},
	//monitores
	{
		title: "Monitor LG 19M38A-B 18.5'",
		price: 34999,
		desc: "Este monitor sólo cuenta con entrada D-Sub (VGA), NO tiene HDMI. Protección y Confort para la vista: Flicker Safe y el Modo lector ayudan a maximizar el confort visual al proteger tus ojos de la luz azul dañina y al reducir el nivel de titileo casi a cero. Definí las opciones personalizadas con un clic: OnScreen Control y My Display Presets te permiten personalizar la configuración del monitor fácilmente con unos pocos clics del ratón.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666909134/qbkx3mrefwksmrntx1lw.webp",
		categorie: "monitores"
	},
	{
		title: "Monitor Samsung LF24T350FHLCZB 24'",
		price: 59999,
		desc: "Una vista completamente expansiva:	Diseño minimalista, máxima concentración. La pantalla sin borde en 3 lados aporta una estética limpia y moderna a cualquier entorno de trabajo. Además, en una configuración de varios monitores, las pantallas se alinean a la perfección para ofrecer una vista prácticamente sin interrupciones ni distracciones.\nExcelente vista desde cualquier ángulo:	Descubrí la experiencia tecnicolor desde cualquier punto. El panel IPS conserva la intensidad y claridad del color en cada centímetro de la pantalla. Incluso en una pantalla tan amplia, los tonos y las sombras lucen precisos desde prácticamente cualquier ángulo, sin decoloración.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666909323/unb962yucmid4uq3hz5p.webp",
		categorie: "monitores"
	},
	{
		title: "Monitor LG 24MP400-B 23.8' FHD",
		price: 51999,
		desc: "LG 24MP400-B - Monitor LG IPS (1920x1080p, 250 cd/m², 1000:1, NTSC 72%); diag. 60,4cm; entradas: D-Sub x1, HDMI x1; diseño virtualmente sin bordes.\nTamaño (pulgadas): 23.8'\nResolución: 1920 x 1080 (FHD)\nTipo de panel: IPS.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666909425/nlgsfgd23slgczbkpsbo.webp",
		categorie: "monitores"
	},
	{
		title: "Monitor Samsung LF22T350FHLCZB 22' FHD",
		price: 49999,
		desc: "Una vista completamente expansiva:	Diseño minimalista, máxima concentración. La pantalla sin borde en 3 lados aporta una estética limpia y moderna a cualquier entorno de trabajo. Además, en una configuración de varios monitores, las pantallas se alinean a la perfección para ofrecer una vista prácticamente sin interrupciones ni distracciones.\nExcelente vista desde cualquier ángulo:	Descubrí la experiencia tecnicolor desde cualquier punto. El panel IPS conserva la intensidad y claridad del color en cada centímetro de la pantalla. Incluso en una pantalla tan amplia, los tonos y las sombras lucen precisos desde prácticamente cualquier ángulo, sin decoloración.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666909510/whua1uj5lnsgm0suunwy.webp",
		categorie: "monitores"
	},
	{
		title: "Monitor LG 22MP410-B 21.5' FHD",
		price: 47999,
		desc: "LG 22MP410-B - Monitor LG Full HD (Panel VA: 1920 x 1080, AMD FreeSync™, 16:9, 250cd/m², 3000:1, NTSC 72%, 5ms (GtG)); Dynamic Action Sync, Black Stabilizer, Crosshair. Diseño prácticamente sin bordes y ajustable en inclinación.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666909581/ohyyp3fivttqvceoz6m9.webp",
		categorie: "monitores"
	},
	{
		title: "Monitor Gamer ASUS VP228HE-J 21,5' FHD",
		price: 46999,
		desc: "Monitor Gaming ASUS VP228HE: 21,5' (54,6 cm) FHD (1920x1080), 1ms, Luz azul de baja intensidad, Antiparpadeo.\nMonitor Full HD de 21,5” (54,6 cm) con 1 ms de tiempo de respuesta para eliminar las imágenes borrosas y ofrecer una acción totalmente fluida.\nASUS GamePlus incluye las funciones punto de mira y temporizador para una experiencia gaming mejorada.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666909670/fvttk0roidpsr9lbma1w.webp",
		categorie: "monitores"
	},
	{
		title: "Monitor LG 20MK400H-B 19.5' HD",
		price: 39999,
		desc: "Mayor productividad hasta en 4 pantallas con el modo Screen Split Multipantalla.\nProtección antiparpadeo, y óptimo para leer en pantalla gracias al Modo Lectura.\n16.7M colores de profundidad para imágenes más naturales.\nOpciones de color customizadas a un solo click.\nEstabilizador de Negros, que permite colores oscuros más diferenciados.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666909767/clcy3omblsrhrmy0a9ad.webp",
		categorie: "monitores"
	},

	//perifericos
	{
		title: "Mouse Gamer Genius Ammox X1-400 3200 DPI",
		price: 5839,
		desc: "Number of buttons 4\nResolution (DPI) 400 - 3200\nSensor engine Optical\nColors Black\nFrame rate 3600 fps\nWeight 110 g",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666909914/sin42uhn3wchmdcd1crd.webp",
		categorie: "perifericos"
	},
	{
		title: "Mouse Pad Gamer Corsair MM150 Medium 350x260mm",
		price: 4817,
		desc: "FORMATO ULTRAFINO DE 0,5 MM:	Ofrece una experiencia de juego sin trabas. El ratón estará prácticamente al mismo nivel que el escritorio gracias a una superficie de 350 x 260 mm.\nSUPERFICIE DE POLICARBONATO RESISTENTE AL DESGARRO:	Ofrece la durabilidad necesaria para resistir al uso diario.\nPOTENCIA DURADERA: La base de silicona antideslizante consigue que la alfombrilla no se mueva durante las sesiones de juego más intensas.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910011/tbfotxzujxgajtvrxbs5.webp",
		categorie: "perifericos"
	},
	{
		title: "Combo Teclado y Mouse Inalámbrico Logitech MK235",
		price: 5401,
		desc: "TAMAÑO NORMAL Y TECNOLOGÍA INALÁMBRICA: Teclado de tamaño normal, mouse de uso ambidiestro, totalmente inalámbricos. Este dúo ofrece todas las funciones necesarias integradas en un diseño confortable, resistente y fácil de usar, y mantiene tu espacio despejado. Con la calidad habitual de Logitech, MK235 es una combinación hecha para durar.\nHECHO PARA TRIUNFAR: Todas las teclas que necesitas, en un teclado de tamaño normal, con sección numérica y 15 teclas de accesos directos que facilitan al máximo la navegación y el ingreso de datos. Las teclas suavemente curvadas hacen la experiencia de escritura más cómoda.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910087/slhj0hnphml1j94evpxh.webp",
		categorie: "perifericos"
	},
	{
		title: "WebCam Wesdar W720 HD 720p",
		price: 4087,
		desc: "Cámara Web Wesdar Webcam USB HD 720p Plug & Play Micrófono.\nAngulo de la lente: 100 °\nTamaño de la lente: 1/4 ' cmos\nMic: micrófono de reducción de ruido incorporado: conector para auriculares de 3.5 mm.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910300/bm8eaclxxkdzk0agmo7v.png",
		categorie: "perifericos"
	},
	{
		title: "Combo Teclado y Mouse Logitech MK120 Español LA",
		price: 3795,
		desc: "SENCILLEZ DIGNA DE CONFIANZA: Debería ser posible hacer las cosas sin complicaciones. Para eso está la combinación MK120. Un teclado y un mouse de tamaño normal cuyo diseño familiar y fácil de usar agiliza la puesta en marcha. Sólo hay que conectar esta combinación con cable a una toma USB para empezar a usarla.\nTECLADO DE TAMAÑO NORMAL:	Este teclado de tamaño normal con sección numérica integrada facilita el ingreso de datos, los cálculos y la navegación. La barra espaciadora curvada y las teclas fáciles de leer proporcionan una experiencia confortable y familiar.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910378/t3h6r5ecucchfvbwpm7h.webp",
		categorie: "perifericos"
	},
	{
		title: "Combo Teclado y Mouse GIGABYTE KM6300",
		price: 3503,
		desc: "USB plug and play: No hay necesidad de instalación adicional, sólo conectalo a la computadora para usarlo.\nConstruido con 10 atajos multimedia adicionales: Las convenientes teclas de atajo te ofrecen control instantáneo de medios y fácil acceso a las herramientas más comunes.\nCómodo mouse de 1000 dpi: Su cómoda apariencia le permite ser usado por un largo tiempo. El preciso sensor óptico de 1000dpi le provee seguimiento acertado y suave sobre la mesa.\nSoportes ajustables: La inclinación de teclado ajustable extendiendo los soportes te permite encontrar tu posición de muñecas óptima.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910495/wk61ke8g6ilslnzhgpix.webp",
		categorie: "perifericos"
	},
	{
		title: "Mouse Pad Logitech Studio Series",
		price: 3139,
		desc: "DESLIZAMIENTO PERFECTO: Ésta es la suave alfombrilla de mouse antideslizante que mejora tu espacio de trabajo. Hecha con materiales de alta calidad, la alfombrilla de mouse Logitech te ofrece la facilidad de deslizamiento y el confort que necesitas para tu mouse Logitech favorito.\nFLUIDEZ Y SILENCIO:	La suave superficie de tejido fino causa menos fricción y facilita el deslizamiento del mouse, tanto en la oficina como en casa.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910588/duyqdhymivpyqx5dwaan.webp",
		categorie: "perifericos"
	},
	{
		title: "Mouse Inalámbrico Logitech M190",
		price: 2919,
		desc: "CONFORT EN TAMAÑO NORMAL. TECNOLOGÍA INALÁMBRICA SIN DEMORAS: Logitech M190 es un mouse inalámbrico de tamaño normal con un confortable diseño contorneado que sigue la curva natural de las manos de tamaño mediano a grande. Trabajarás de forma inalámbrica y podrás moverte libremente hasta a 10 metros de distancia, sin prácticamente demoras ni interrupciones. Obtendrás gran calidad con 18 meses de duración de batería, seguimiento de precisión y desplazamiento línea a línea a un precio asequible.\nCALIDAD QUE PERDURA:	Obtén la durabilidad y la confiabilidad que te da el líder mundial en mouse y teclados. Tanto si utilizas el M190 con una laptop, computadora de sobremesa, en la casa o en los desplazamientos, éste es un mouse en el que puedes confiar. Consigue calidad sin compromisos con todo lo esencial que necesitas a un precio asequible.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910669/ikgzhxcroocq8w9in8g7.webp",
		categorie: "perifericos"
	},
	{
		title: "Mouse Inalámbrico Logitech M170",
		price: 2189,
		desc: "SIMPLICIDAD DE PLUG & PLAY:	El M170 está listo a la vez que tú. Simplemente conecta el receptor a un puerto USB de tu dispositivo para comenzar a trabajar en cuestión de segundos. Con su pequeño tamaño y el fluido control del cursor, es fantástico para espacios de trabajo reducidos y mesas llenas de cosas. ¡Disfruta del mundo inalámbrico!.\nCUALQUIER MANO, CUALQUIER SITIO:	El compacto M170 inalámbrico tiene un diseño ambidiestro y un tamaño idóneo para la bolsa de la laptop, para que zurdos y diestros puedan trabajar donde quieran.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910757/jjw8mbgm3yxxyccdntu9.webp",
		categorie: "perifericos"
	},
	{
		title: "Teclado Logitech K120",
		price: 2043,
		desc: "SENCILLEZ DIGNA DE CONFIANZA: Debería ser posible hacer las cosas sin complicaciones. Por eso este teclado de tamaño normal encaja a la perfección. Es un compañero confiable y duradero equipado con sección numérica y con un diseño fácil de ver que funciona inmediatamente. Sólo hay que conectar este teclado con cable a una toma USB para empezar a usarlo.\nCONFORTABLE TAMAÑO NORMAL: Este teclado de tamaño normal con sección numérica integrada facilita el ingreso de datos, los cálculos y la navegación. La barra espaciadora curvada y las teclas fáciles de leer proporcionan una experiencia confortable y familiar.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910840/yu0hrwvlxscriu1usyiy.webp",
		categorie: "perifericos"
	},
	{
		title: "Mouse Logitech M110 Silent Negro",
		price: 1460,
		desc: "DISFRUTA DEL SONIDO DEL SILENCIO: Acaba todo tu trabajo sin perder el ritmo y sin molestar a los que te rodean. Los silenciosos mouse Silent ofrecen la misma sensación de click pero sin el ruido, reducido en más de un 90%. Un fluido botón rueda completa la silenciosa experiencia. Los mouse Silent eliminan el exceso de ruido a la vez que protegen la salud y la productividad de todos. Haz que éste sea tu último molesto clic. Tu familia y tus amigos te lo agradecerán.\nTRABAJA CON MENOS DISTRACCIONES: Nuestra innovadora tecnología SilentTouch elimina más del 90% de los ruidos molestos para ti y los que te rodean, manteniendo la misma sensación habitual de click. Además, tiene pies de material de alto desempeño y un botón rueda de goma para un deslizamiento y un desplazamiento silenciosos.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910910/zurdgbi0kuvgbgy0blrm.webp",
		categorie: "perifericos"
	},
	{
		title: "Mouse Logitech M110 Silent Negro",
		price: 1460,
		desc: "DISFRUTA DEL SONIDO DEL SILENCIO: Acaba todo tu trabajo sin perder el ritmo y sin molestar a los que te rodean. Los silenciosos mouse Silent ofrecen la misma sensación de click pero sin el ruido, reducido en más de un 90%. Un fluido botón rueda completa la silenciosa experiencia. Los mouse Silent eliminan el exceso de ruido a la vez que protegen la salud y la productividad de todos. Haz que éste sea tu último molesto clic. Tu familia y tus amigos te lo agradecerán.\nTRABAJA CON MENOS DISTRACCIONES: Nuestra innovadora tecnología SilentTouch elimina más del 90% de los ruidos molestos para ti y los que te rodean, manteniendo la misma sensación habitual de click. Además, tiene pies de material de alto desempeño y un botón rueda de goma para un deslizamiento y un desplazamiento silenciosos.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666910910/zurdgbi0kuvgbgy0blrm.webp",
		categorie: "perifericos"
	},

	//Componentes de pc
	{
		title: "Gabinete AZZA Luminous 110F Mid Tower mATX ARGB 1xFan",
		price: 16059,
		desc: "Tipo: ATX Mid Tower.\nColor: Negro.\nPaneles laterales: Izquierda: Vidrio templado con monturas de goma / Derecha: Panel de acero.\nMáxima altura para disipador CPU: Hasta 165 mm.\nMáxima longitud para GPU: Hasta 300 mm.\nCompatibilidad motherboard: Micro-ATX",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911102/cr8lgs8nkw9qa0jmnum9.webp",
		categorie: "componentes-de-pc"
	},
	{
		title: "Gabinete AZZA Crimson Mid Tower ATX 2xFan LED Rojo",
		price: 16789,
		desc: "Tipo: ATX Mid Tower.\nColor: Negro.\nPaneles laterales: Izquierda: Vidrio templado con monturas de goma / Derecha: Panel de acero.\nMáxima altura para disipador CPU: Hasta 165 mm.\nMáxima longitud para GPU: Hasta 340 mm.\nCompatibilidad motherboard: Micro-ATX",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911177/cuwtohhgm7fefkb65roe.webp",
		categorie: "componentes-de-pc"
	},
	{
		title: "Gabinete Essenses Extreme Gaming BZE-40 Mid Tower ATX 3xFan RGB c/ Ctrl. RGB",
		price: 16009,
		desc: "Factores de forma mother: ATX / mATX / ITX\nPaneles: Acrílico / Acero\nBahías 3.5' (HDD): 1\nBahías 2.5' (SSD): 1\nRanuras de expansión: 7\nPuertos USB: 1 x USB 3.0, 2 x USB 2.0\nAudio: 1 x Auriculares, 1 x Micrófono\nSoporte fan: 1 x 120mm atrás, 3 x 120mm adelante, 2 x 120mm arriba\nSoporte water cooler: 240mm arriba",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911311/sx2zxuobmokvghjcvqd0.webp",
		categorie: "componentes-de-pc"
	},
	{
		title: "Placa de Video Palit NVIDIA GeForce GTX 1660 SUPER GP GamingPro 6GB GDDR6",
		price: 1229719,
		desc: "La GeForce® GTX 1660 SUPER es hasta 20% más rápida que la GTX 1660 original y hasta 1,5 veces más rápida que la GTX 1060 6GB de la generación anterior. Cuenta con la galardonada arquitectura NVIDIA Turing™ y la memoria GDDR6 ultrarrápida, es un supercargador para los juegos más populares de la actualidad.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911384/i2ncvbsrgsitwnl9ho7t.webp",
		categorie: "componentes-de-pc"
	},
	{
		title: "Placa de Video PowerColor AMD Radeon RX 6600 Fighter 8GB GDDR6(BULK)",
		price: 116799,
		desc: "Familia de procesadores de gráficos: AMD\nProcesador gráfico: Radeon RX 6600\nFrecuencia del procesador: 2044 MHz\nAumento de la velocidad de reloj del procesador: 2491 MHz\nProcesadores de corriente: 1792",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911475/vwjtjnwd3pp4ecjklxlo.webp",
		categorie: "componentes-de-pc"
	},
	{
		title: "Placa de Video SAPPHIRE AMD Radeon RX 6500 XT PULSE OC 4GB GDDR6",
		price: 108039,
		desc: "GPU: AMD Radeon™ RX 6500 XT Graphics Card\nClock: Boost Clock: Up to 2825 MHz / Game Clock: Up to 2685 MHz\nStream Processors: 1024\nInfinity Cache: 16MB\nRay Accelerators: 16\nTamaño/bus de memoria: 4GB GDDR6\nClock de memoria: 18 Gbps efectivos\nDisplays: 2 máximo",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911563/fk7gw1ug4brhiffxqikz.webp",
		categorie: "componentes-de-pc"
	},
	{
		title: "Memoria RAM PNY Performance DDR4 8GB 2666MHz CL19",
		price: 10657,
		desc: "Tipo de memoria: DDR4\nTipo de canales: Single Channel / Dual Channel\nFactor de forma: DIMM (Desktop)\nCapacidad: 8GB\nFrecuencia: 2666MHz (PC4-21300)\nLatencia CAS: CL19",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911637/lstazyypoaubukdatnu9.webp",
		categorie: "componentes-de-pc"
	},
	{
		title: "Memoria RAM Crucial Basics DDR4 8GB 2666MHz CL19",
		price: 10219,
		desc: "Tipo de memoria: DDR4\nCompatible con: PC\nEl kit incluye: módulo único\nNúmero de pines: pin 288\nVelocidad de memoria: 2666 MHz\nTamaño de memoria: 8 GB",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911733/dehd77gl1jtgtskpxrvt.webp",
		categorie: "componentes-de-pc"
	},
	{
		title: "Memoria RAM Patriot Signature Line DDR4 4GB 2666MHz CL19",
		price: 7591,
		desc: "La memoria Signature Line de Patriot ofrece la calidad, la confiabilidad y el rendimiento que se esperan para las necesidades de los ordenadores principales de hoy.\nConstruida con componentes de la más alta calidad y probada a mano, Patriot garantiza que cada módulo cumple y supera los estándares de la industria para ofrecerle una actualización de memoria plug-and-play sin complicaciones.\nCon servicio al cliente gratuito y garantía de por vida, los módulos de memoria DDR4 Signature Line de Patriot son la opción perfecta para cualquier sistema de PC construido o actualizado para un rendimiento más rápido.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666911787/u2pl5obqembglgfgzjhg.webp",
		categorie: "componentes-de-pc"
	},

	//Sonido y multimedia
	{
		title: "Parlante Bluetooth Ultimate Ears MEGABOOM 3",
		price: 59859,
		desc: "AÚN MEJOR:	Altavoz Bluetooth® inalámbrico y portátil: con sonido superpotente y envolvente de 360°, graves formidables, resistencia al agua, el polvo y las caídas, y un precioso tejido de alto rendimiento. El altavoz definitivo, redefinido.\nALTO Y AUTÉNTICO:	MEGABOOM 3 ofrece un sonido potente e inmersivo. Y también cuidadosamente equilibrado y perfectamente nítido. Con el exclusivo procesamiento de sonido de Ultimate Ears, produce un audio fiel a la música que te gusta, y en todos los niveles de volumen.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666912610/dgymew9slludqiwyrbft.png",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Auriculares Gamer Cooler Master CH321 50mm USB RGB",
		price: 10949,
		desc: "UN CONDUCTOR DIARIO DURADERO Y CONFIABLE: El CH321 combina comodidad y durabilidad en un controlador diario diseñado para PC y consolas por igual. Una diadema con suspensión y orejeras acolchadas brindan una comodidad liviana y un aislamiento de sonido de primera calidad, mientras que los controladores de alta fidelidad ofrecen un nivel de audio y el cable de PVC evita que se doblen y doblen. Agregue a eso un estilo discreto y un logotipo RGB, y tendrá unos auriculares que se ven tan bien como funcionan.\nCOMODIDAD DURADERA:	Una diadema de suspensión flexible y orejeras de cuero sintético afelpado garantizan sesiones de maratón sin dolor con un aislamiento de sonido increíble durante toda la batalla.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666912689/bqcdw7ns59c7hwduq6gx.webp",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Auriculares Gamer XPG EMIX H20 7.1 Surround 50mm USB RGB",
		price: 10949,
		desc: "ESCUCHE EL SONIDO DE LA VICTORIA: Tener conciencia de la situación es clave para ganar en el campo de batalla. Sin ella, sus adversarios le ganarán la delantera y le tenderán una emboscada cuando menos se lo espere. Incline las balanzas a su favor siendo capaz de escuchar a sus enemigos con los auriculares para juegos EMIX H20 equipados con sonido envolvente virtual 7.1. Para mayor comodidad y conveniencia, cuenta con almohadillas giratorias que pueden girar 90° para descansar fácilmente sobre el cuello durante los descansos.\n		Precisión posicional con sonido envolvente virtual 7.1: Con el sonido envolvente virtual 7.1, los auriculares EMIX H20 ayudarán a aumentar su conocimiento de la situación. Escuche a sus amigos y enemigos de igual manera, tanto si están delante como detrás de usted, y que nunca le pillen por sorpresa.  (No se requiere la instalación de software adicional para el sonido envolvente virtual 7.1)",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666912754/lwle4y72smiv3xl4amsc.webp",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Auriculares Gamer Marvo Scorpion HG8929 50mm USB 3.5mm RGB",
		price: 8467,
		desc: "Conecciones: USB, 3.5mm jack\nIluminación: RGB\nTamaño de parlantes: 50mm\nSPL: 116dB±3dB\nPotencia nominal: 15mW\nImpedancia: 32±15%Ω\nRespuesta de frecuencia: 20Hz~20KHz",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666912831/va4mhodwsgwompldn5p3.png",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Auriculares Gamer MSI IMMERSE GH20 40mm 3.5mm",
		price: 7591,
		desc: "LIVIANO COMO UNA PLUMA: GH20 es liviano y portátil, con un peso de apenas 245 gramos. Este headset te resultará cómodo aún durante las largas sesiones de juego.\nDISEÑADO PARA EL CONFORT: Las tazas de los auriculares de 2.5cm de suave felpa están diseñados para ser usados con comodidad por aquellos que usan lentes y son cómodos para el uso prolongado. El acolchado de la banda es blando y grueso para distribuir la presión por toda la cabeza.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666912900/a55jfer1bqowsrwyrpw6.png",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Auricular Gamer HyperX CloudX Chat Xbox One / Series X|S Mono 3.5mm",
		price: 6715,
		desc: "Comunicación clara en el chat de voz: El auricular HyperX CloudX Chat™, con licencia oficial de Xbox, está fabricado con controladores de 40 mm para una comunicación clara en el chat de voz. Incorpora un micrófono flexible con cancelación de ruido, filtro antipop y controles de audio en línea para ajustar fácilmente el volumen y silenciar el micrófono. El auricular único te permite escuchar el audio del juego desde el televisor o el sistema de entretenimiento doméstico mientras hablas en la partida con tu equipo o en el chat de grupo con tus amigos. Con un diseño ligero y reversible, el auricular para chatear puede llevarse cómodamente en cualquier oreja.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666912955/lrf80fj8rfyi7fnhqjlc.png",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Auriculares Logitech H111 3.5mm",
		price: 3357,
		desc: "UNOS AUDÍFONOS CON MICRÓFONO ASEQUIBLES PARA USAR CON TODOS TUS DISPOSITIVOS: La forma más sencilla de empezar a hablar usando computadoras, smartphones o tablets. Tienen una toma de audio estándar de 3,5 mm y son compatibles con la mayoría de los sistemas operativos y plataformas. Permiten oír lo esencial y ser oído con claridad.\nAUDÍFONOS MULTIDISPOSITIVO CON MICRÓFONO H111:	Los audífonos con micrófono para empresas perfectos para llamadas de voz, Skype®, seminarios web y más. El cable de 235 cm tiene la longitud adecuada para que puedas ponerte de pie y estirarte durante largas conversaciones.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913023/k6ypxvqthtfdlp9laqlp.webp",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Micrófono Blue Snowball iCE Condenser Cardioide USB Negro c/ Trípode",
		price: 18979,
		desc: "SONIDO INMACULADO PARA VOZ, LLAMADAS EN CONFERENCIA Y SKYPE:	Snowball iCE es la forma más rápida y sencilla de conseguir un sonido de alta calidad para grabaciones y streaming. Alimentado por una cápsula de condensador cardioide personalizada, Snowball iCE proporciona una calidad de audio transparente como el cristal que está a años luz del micrófono incorporado en su ordenador. Está incluso certificado por Skype, lo que garantiza unos resultados de sonido excelentes sin importar cómo o cuando lo use—en casa, en la oficina o en el estudio.\nCAPTURE SU VOZ CON UNA CALIDAD ASOMBROSA: Intentar capturar audio desde el micrófono de un ordenador es como caminar sobre una fina capa de hielo—puede funcionar algún tiempo, pero al final se hundirá en las gélidas aguas. Y aquí entra Snowball iCE—la forma rápida, sencilla y fiable de conseguir un audio excelente para todos sus proyectos. Snowball iCE tiene una cápsula de condensador personalizada con una calidad de audio transparente como el cristal que ningún micrófono de ordenador puede igualar. Y con su patrón polar cardioide, es uno de los micrófonos USB más versátiles del mercado.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913086/hrbmywl9uutpgpcowsv5.webp",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Micrófono Trust GXT 244 Buzz Streaming Condenser Cardioide USB c/ Trípode y Shock Mount",
		price: 17519,
		desc: "Para llevar el streaming a otro nivel:	Si está buscando un micrófono que se adapte a la transmisión de juegos y a las grabaciones con la más alta calidad, aquí tiene el micrófono para streaming GXT 244 Buzz de Trust. Ofrece una calidad de audio excelente al tiempo que es increíblemente fácil de utilizar. Este micrófono está diseñado para llevar el streaming y las grabaciones a otro nivel.\nCalidad de audio excelente:	De todos los elementos que utiliza en sus grabaciones, el micrófono es el que tiene mayor efecto. Tiene que capturar voces e instrumentos con la calidad más alta posible. Por eso, el micrófono para streaming GXT 244 Buzz de Trust se ha concebido para ofrecer grabaciones de gran nitidez y riqueza en matices con una calidad prácticamente de estudio profesional.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913162/d68939mufg5b7syiw9fs.png",
		categorie: "sonido-y-multimedia"
	},
	{
		title: "Micrófono Shenlong SM-ARM909 Streaming Condenser Cardioide USB c/ Brazo Soporte",
		price: 14599,
		desc: "Patrón polar: Cardioide\nSensibilidad: -42±3dB (1.5V, 680KO??0dB-1V/Pa, 1KHz)\nRespuesta frecuente: 100Hz-18000Hz\nImpedancia: < 680O\nRelación S/N: < 58dB\nMax. SPL: 125dB\nTasa de muestreo: 192KHz/24Bit",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913244/qzxudpqswvmvwtz57s8t.webp",
		categorie: "sonido-y-multimedia"
	},

	//Impresoras
	{
		title: "Impresora multifunción HP LaserJet Pro 135W 220V",
		price: 61999,
		desc: "Es monocromática.\nImprime, escanea y hace copias.\nImpresión doble faz manual.\nTecnología de impresión: láser.\nPosee pantalla LCD para visualizar el proceso.\nTiene entrada USB.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913437/l3ch6udoijm3ftgfdqjo.webp",
		categorie: "impresoras"
	},
	{
		title: "Impresora a color multifunción HP Ink Tank Wireless 415 con wifi negra 100V/240V",
		price: 57999,
		desc: "Imprime, escanea y hace copias.\nImpresión doble faz manual.\nTecnología de impresión: inyección de tinta.\nPosee pantalla LCD para visualizar el proceso.\nTiene entrada USB.\nCuenta con 2 bandejas.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913515/vqjuaiz61zx6n8ovo8gp.webp",
		categorie: "impresoras"
	},
	{
		title: "Impresora a color multifunción HP Deskjet Ink Advantage 2775 con wifi 200V",
		price: 23999,
		desc: "Imprime, escanea y hace copias.\nImpresión doble faz manual.\nTecnología de impresión: inyección de tinta.\nPosee pantalla LCD para visualizar el proceso.\nTiene entrada USB.\nCuenta con 2 bandejas.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913572/k3eiirr7te737aaayx9q.webp",
		categorie: "impresoras"
	},
	//Smart TV
	{
		title: "Smart TV Samsung Series 7 UN50AU7000GCZB LED 4K 50' 220V - 240V",
		price: 139999,
		desc: "Samsung es reconocida a nivel mundial como una empresa líder en la industria tecnológica. Todos sus productos son diseñados con una calidad superior y pensados para contribuir a un futuro mejor. Por eso, va a hacer que disfrutes de una experiencia visual incomparable.\nCon el Smart TV UN50AU7000G vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.\nViví en 4K:	La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora vas a conocer una aventura de inmersión que no va a dejar de sorprenderte.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913725/oeqooems9m2soqr4jpzn.webp",
		categorie: "smart-tv"
	},
	{
		title: "Smart TV LG AI ThinQ 43UP7750PSB LCD 4K 43' 100V/240V",
		price: 96299,
		desc: "LG es innovación y eso se ve en cada uno de sus productos tecnológicos, pensados especialmente para que tu familia y vos disfruten mucho más de la vida. Tener un televisor LG es aprovechar la más alta calidad del mercado.\nCon el Smart TV 43UP7750 vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.\nViví en 4K: La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora vas a conocer una aventura de inmersión que no va a dejar de sorprenderte.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913831/pvb2nziouoctui3qghsk.webp",
		categorie: "smart-tv"
	},
	{
		title: "Smart Tv Tedge 50 50uhd6 4k Uhd Netflix Youtube",
		price: 88999,
		desc: "Marca: Tedge\nColor: Negro\nGarantía: 12 meses\nHDMI: 1.4b\nMedidas para soporte VESA: 400 X 300.\nSonido: Estéreo / SAP\nSistema operativo: Linux\nApp compatibles: Netflix, Youtube, Prime video, app Store, Lifeminute TV, Docubay, TikiLive, KidsFlix, VroomGP y Deezer,",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666913913/ta9plotfhheffpgckwdx.webp",
		categorie: "smart-tv"
	},
	{
		title: "Smart Tv Noblex Dr55x7550pi Led 4k 55'' Con Android Tv",
		price: 125999,
		desc: "PANTALLA:\n- TIPO DE PANTALLA: LED\n- TIPO DE TV: SMART 4K\n- PULGADAS: 55'\n- RESOLUCION DE VIDEO: 4K (3840 x 2160)\n- RELACION DE ASPECTO: 16:9\n- CONTRASTE: 1200 : 1\n- BRILLO: 280cd\n- TIEMPO DE RESPUESTA (ms): 8 ms\n- FRECUENCIA DE REFRESCO (hz): 60 Hz\nSONIDO:\n- CANTIDAD DE PARLANTES: 2\n- POTENCIA DE PARLANTES (RMS) (W): 2*8W\n- SAP: SI\n- ECUALIZADOR: SIn- FUNCION DE SONIDO: Standard / Music / Movie / Soccer / User",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914022/zwpcjknmbe2ytblrzs5j.webp",
		categorie: "smart-tv"
	},
	{
		title: "Smart Tv 32 Philips Android Hd 32phd6917/77 110-240v",
		price: 58999,
		desc: "Sencillamente inteligente. Android TV:	Tu Android TV de Philips te ofrece el contenido que quieres cuando lo quieres. Puedes personalizar la pantalla de inicio para mostrar tus aplicaciones favoritas, lo que te facilitará la reproducción de las películas y los programas que te encantan. También puedes reproducirlos desde donde los dejaste.\nControl por voz. El Asistente de Google: Presioná un botón del control remoto para hablar con el Asistente de Google. Controlá el televisor o los dispositivos inteligentes para el hogar compatibles con el Asistente de Google usando tu voz",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914085/mj9ciimqam3gazg42d7x.webp",
		categorie: "smart-tv"
	},
	//Notebooks
	{
		title: "Notebook ASUS X515EA I7 1165G7 8GB SSD 512GB 15.6'",
		price: 291999,
		desc: "PROCESADOR:\nMarca: Intel / Modelo: I7 1165 G7\nNúcleos: 4 Núcleos / 8 Threads / Frecuencia: 4.70 GHz\nGRÁFICOS:\nMarca: Intel / Modelo: Iris X\nMEMORIA:\nCapacidad: 8GB (4+4Gb) / Tipo: DDR4 SODIMM\nExpansión: Si (Hasta 12Gb reemplazando una de 4Gb)\nALMACENAMIENTO:\nCapacidad: 512Gb / Clase: SSD NVME",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914276/tf1rlfrxq2vvolcjyawy.png",
		categorie: "notebooks"
	},
	{
		title: "Notebook Dell Inspiron 15 3515 - 15,6' - Ryzen 5 3450U- 8GB - 256GB SSD",
		price: 240899,
		desc: "Marca DELL\nSerie Inspiron\nModelo 15 3515\nNúmero de parte D6DM6\nTipo Notebook",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914370/vb8egg5lodicuv3vd2ry.webp",
		categorie: "notebooks"
	},
	{
		title: "Notebook ASUS X515EA I5 1135G7 8GB SSD 256GB 15.6'",
		price: 227759,
		desc: "Ya sea para trabajar o jugar, ASUS X515 es el Nivel Básicoportátil que ofrece un rendimiento potente y efectos visuales envolventes. Su pantalla NanoEdge cuenta con amplios ángulos de visión de 178 ° y unanti reflejanterevestimiento para una experiencia verdaderamente atractiva.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914427/nxaf0tjzfr4arzfzfooa.png",
		categorie: "notebooks"
	},
	{
		title: "Notebook PCBOX FIRE! 5 - Intel Core i5 1035G1 - 8GB - 256GB SSD",
		price: 218999,
		desc: "Sistema operativo: Windows 10 Home\nProcesador intel Core i5-1035G1 10MA GEN\nMemoria RAM: 8GB\nAlmacenamiento: SSD 256GB M.2\nPantalla: 14' FHD 1920x1080 IPS\nCámara web: 1.0 MP",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914507/zideucxgoitgvgewf0xv.webp",
		categorie: "notebooks"
	},
	{
		title: "Notebook ASUS X515EA-EJ711 I3 1115G4 4GB SSD 256GB 15.6'",
		price: 162059,
		desc: "Ya sea para trabajar o jugar, el ASUS X515 es el computador portátil que ofrece un potente rendimiento y efectos visuales envolventes. Su pantalla NanoEdge cuenta con amplios ángulos de visión de 178° y un recubrimiento antirreflejos mate para tener una experiencia verdaderamente atractiva.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914570/mxbddfjio3kvdzmzcymt.png",
		categorie: "notebooks"
	},
	{
		title: "Notebook HYUNDAI HyBook - Intel Celeron N4020 - 4GB - 128GB SSD - 14.1'",
		price: 93439,
		desc: "Con un veloz procesador Intel de doble núcleo, una pantalla vibrante de 14.1' y 128 GB de almacenamiento ultrarrápido, el Hyundai Hybook está diseñado para satisfacer tus necesidades. Su diseño elegante, liviano y portátil de 14.1' fue hecho para todos y cada uno. Posee un chip Wi-Fi sólido que te mantiene conectado al mundo, junto con Windows 10 Home en modo S para una experiencia de PC versátil y fluida. Amplía tu espacio de almacenamiento con su ranura HDD expandible y trabaja sin problemas desde cualquier ubicación.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914638/t4jv7fa6tpitoichdg64.webp",
		categorie: "notebooks"
	},
	{
		title: "Notebook Cloudbook PCBOX FIRE! - Intel Celeron N4020 - 4GB - 128GB SSD - 14.1'",
		price: 87599,
		desc: "Sistema Operativo: Windows 11.\nProcesador Intel® Celeron® Processor N4020 hasta 2.80 GHz.\nMemoria 4 GB.\nAlmacenamiento 128 GB.\n	Pantalla 14.1' FHD 1920 X 1080.\nCámara: 0.3 MP.",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914733/fzpntahgejjfnynsrbqa.webp",
		categorie: "notebooks"
	},
	//Otros
	{
		title: "Silla Gamer Sate A-GC8704 Roja y Negra",
		price: 85409,
		desc: "Reposabrazos: 2D ergonómicos y multifuncionales\nRespaldo ajustable hasta 180°\nAltura de asiento ajustable\nRelleno de espuma prensada de calidad 50KG/m3\nRuedas reforzadas de 55mm ",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914862/smkodxr5gj51nluvtmdf.webp",
		categorie: "accesorios"
	},
	{
		title: "Adaptador Bluetooth TP-Link UB400 v1.0 Nano USB BT 4.0",
		price: 1897,
		desc: "Bluetooth 4.0: Aplica la última tecnología de Bluetooth 4.0 con poca energía (BLE) y es compatible con Bluetooth V3.0/2.1/2.0/1.1\nSin necesidad de Driver: Plug and Play para Win 8, Win 8.1, para Win 10\nTamaño-Nano: Ultra pequeño e idóneo para transportar con alto rendimiento confiable\nSistemas Operativos Soportados: Soporta Windows 10/8.1/8/7/XP",
		image: "https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666914937/gn6h7ifwwmybxbfjf0iz.png",
		categorie: "accesorios"
	},
]

const seedDb = async () => {
	logger.info('Seeding database...');
	await Product.deleteMany({});
	await Message.deleteMany({});

	productos.forEach( async(prod) => {
		const newProd = new Product(prod)
		await newProd.save()
	} )

	logger.info('Database seed complete!');
}

module.exports = seedDb;