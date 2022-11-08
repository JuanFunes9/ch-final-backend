## Servidor Backend API REST para E-commerce

### Configuración básica y comandos

1. Descargar el repositorio a un etorno local
2. Instalar los paquetes con el comando: $npm install
3. Levantar el servidor con alguno de los siguientes comandos:
~~~
$node src/server || $npm start || $npm run dev
~~~
4. También es posible elegir el puerto de escucha del servidor y/o activar la siembra de la base de datos a través del siguiente comando:
~~~
$node src/server -p 3000 -s TRUE
~~~
***Nota:*** *Al pasar como argumento "-s TRUE" formatearemos la base de datos, eliminando los registros de las colecciónes de productos, mensajes y usuarios (dejando solo a los usuarios con rol de adminstradores). A la vez que se volvera a cargar una lista predetermindada de productos por defecto.*