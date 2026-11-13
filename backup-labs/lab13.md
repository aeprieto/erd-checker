---
title: LAB13 - BigER 6 (respaldo)
---

# LAB13 - Uso de BigER

> **⚠️ Página de respaldo**
>
> Esta página es una copia del LAB13 para cuando el Campus Virtual o el comprobador habitual no están disponibles. Al final de cada ejercicio tienes un enlace para comprobar tu solución, pero **aquí no se registra nada**: guarda tus ficheros `.erd` y, cuando el Campus Virtual vuelva a estar disponible, envía en él tus soluciones de la práctica.

## Objetivos

1.- Aplicar la notación para solucionar dos exámenes reales de diseño E/R: el **Enunciado ER 14 Todos Tus Libros** y el **Enunciado ER 16 TravelFun**.

---
## Contenidos

### Resolución del Enunciado ER 14 Todos Tus Libros

### Resolución del Enunciado ER 16 TravelFun

---
## Resolución del Enunciado ER 14 Todos Tus Libros

Los ejercicios a continuación están orientados a resolver el Enunciado ER 14 Todos Tus Libros, disponible [aquí](https://github.com/bd-uex/bd-contenidos/blob/main/ejercicios/entidad-relacion/Enunciado%20ER%2014%20Todos%20Tus%20Libros.md).

Crea el archivo **ModeloTodosTusLibros.erd** con **New Empty ER Model** y añade la línea `notation=crowsfoot` justo debajo de la línea `erdiagram`. Será donde vamos a ir modelando el Enunciado ER 14 Todos Tus Libros.

Como en el laboratorio anterior, este enunciado es un **examen real**, así que las pistas serán mínimas. Cada ejercicio incluye los **nombres** que espera el comprobador para que reconozca tu solución. Solo los nombres: decidir qué es cada cosa, sus claves y sus cardinalidades es cosa tuya.

---
### Ejercicio 01 - Enunciado ER 14 Todos Tus Libros  (1)

Vamos a comenzar centrándonos en resolver estos párrafos iniciales:

---
La plataforma TodosTusLibros busca facilitar la reserva de libros a los lectores en las librerías independientes que todavía existen. Nos han pedido diseñar su base de datos.

Así, el sistema debe almacenar la información de los libros, registrando un id único, título, sinopsis, fecha de publicación y los géneros en los que se clasifica. De cada libro hay que saber en qué idioma está teniendo en cuenta que muchos libros son traducciones de otros. Por ejemplo, la base de datos podría contener el libro 'Cien años de soledad' en español y cuando se registrara la versión inglesa 'One Hundred Years of Solitude', la base de datos permitiría indicar que su idioma es inglés y que es una traducción de 'Cien años de soledad'. Hay que tener en cuenta que un libro puede tener muchas traducciones distintas e incluso ser una traducción de otra traducción. Por ejemplo, un libro en chino puede no haber sido traducido al español directamente sino desde una traducción al inglés.

---

De esta parte, pon especial atención a las traducciones. Fíjate en que un libro puede ser traducción de otra traducción: ¿qué tipo de relación necesitas? Y antes de crear una subclase para los libros traducidos, piensa qué datos o relaciones tendría que no tengan los demás libros.

> **Nombres para el comprobador**: las entidades `Libro` (`id_libro`, `titulo`, `sinopsis`, `fecha_publicacion`), `Genero` (`id_genero`, `nombre`) e `Idioma` (`id_idioma`, `nombre_idioma`), y las relaciones `se_clasifica_en`, `esta_en_idioma` y `es_traduccion_de`, con los roles `Traduccion` y `Traducido`.

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 01** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=PfGdIp5VRYOtSeOn_L_Vq1401MgwhwMRk_T3q-7ENMyXddrMDYeRZ7b1-esPpjk12VGzs41KStB-00wX5tzNDHf5Yf-AIsKw5a08BbWB7mYci3jmy_CEQXYyJmYaOFn99nzVDIL0JIJk8vhkFgkcT-AHHRxfAXu1ijosIIlp4zbKKmzfLu-gFjG9wqMiZwwWYOMSAqLuJuhAO_FwZ-NbXVS_2SoG62QwP09MLS-YRnyWOs0OLHfXHJ6UCVLb6iq6ipvaoJzcBUHjhFxJn-eZ6GmC-5FIdtutqx8_Be8tknAQwdBZ0mlpnbSKX95ZXNGuBO9_RttI48wnndGjYdrILYc2ovCKsnO8lzFpxn0irjkKuXI_ZCSO6fPYBRoPTMDVIPubVJJQ66qNJpHv5ip1EIaaaR5-69zu_A4yiy8YsVfc5apNsqlbQ9Cb1LdfyGxQv3yxke0OoYfr_kZs3QyFxitA_7-ho76y5KhFoaATgNXtCBGhd1jrVXLcVqCCnXVMLqCxl-xd4YCvxN3p0KMQw69s){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 02 - Enunciado ER 14 Todos Tus Libros  (2)

Vamos a continuar con el siguiente párrafo:

---
Tenemos que mantener de los profesionales literarios que escriben y/o traducen libros un identificador, nombre, apellidos y biografía. Entre los profesionales literarios están los autores que escriben los libros que almacenamos, teniendo en cuenta que de un libro puede no conocerse el autor (son anónimos) o que puede tener varios. Además, nos interesa conocer si un autor es especialista en uno o varios géneros o en ninguno, independientemente de que luego escriba algún libro de otro género. Por otro lado, tendremos a los posibles traductores de los libros. Un libro puede tener uno o varios traductores o no tenerlo (si es el libro original). De los traductores es imprescindible registrar en qué idioma o idiomas son expertos. Hay que tener en cuenta que hay autores, no muchos, pero los hay, que escriben sus propios libros y traducen otros.

---

De esta parte, pon especial atención a las restricciones de la jerarquía: ¿puede un profesional literario no ser ni autor ni traductor? ¿Y ser las dos cosas a la vez? Ten cuidado también con las cardinalidades mínimas: el enunciado dice expresamente qué puede no existir.

> **Nombres para el comprobador**: las entidades `Profesional_Literario` (`id_profesional`, `nombre`, `apellido_1`, `apellido_2`, `biografia`), `Autor` y `Traductor`, y las relaciones `escribe`, `es_especialista_en`, `traduce` y `experto_en`.

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 02** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TCdwp5VWfq1GcVLTafO89OnWW3ndVIq6WWMUPzd5idM8UQ6TllHY1xRNnpb7Tqp33jH5jyJur--d7hEDFfdftpGhzSD_Qy4GSOMDbj8t-g5OH986sQEVuaZXnhx9XY-jCTRbLuOEaSLYIv6R3woxIDXfXWKTB5Az5ANVJVYY7fKGVugZ2Cn0otXc4PBzNp7ZeIUkvgiUkZ7kvT6A4XjzXQtkAiIbVtTBzHKFxY5iKDFtnT6SHySZAQQWg_gBWHNEEHPuYfHwOYtwiIc-jzWHsz6D7MysHN9oLkGcWGCortnCeKOHgSiVIuRY9Bm4oGS_jqEYQZ7lMwNjHxuW_lWLAdKfq9LzjKRdppVmYLVV7I4Y1CUPFCr3TT1-E8tOpkhMkxxPWCj04jCbfEMpdK7JS6u0FOCtmSm9OpuPk0XTAez1mYR2VElxAatZ_ZVGONt7yx_rlSKA-8Nf5mQv2qpP_2VQa8NrmemgPi8SAeoKGHYSjVpdkEIoe80o80czlGefeiFFfDl1dsywwz42l3bvbsZKSlhUpIhP77b16aWgjtf_3kursbrwqfJ1c-Y_9LSM0iNtp7ZeiKNguTOg6bcz0W4XHd3pns30iOZnVjGN3P6DERRzKUrf6lONvj3KmE3y80TsvntnqKoiXYMOOTE_4RFnpc6W0AOw8T_zyyMaYguxr6CHM8boL3lOEGGJJTCLj0beWXuLE1Wg0UzPnULOOR3ols){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 03 - Enunciado ER 14 Todos Tus Libros  (3)

Vamos a continuar con el siguiente párrafo:

---
Lo que se vende al público es la edición física de un libro. Un libro puede no tener ediciones disponibles en ese momento o tener varias ediciones, de manera que podemos tener libros en nuestra base de datos independientemente de si en ese momento hay ediciones disponibles o no. Cada edición tiene su ISBN único, precio oficial, fecha de lanzamiento, páginas y dimensiones y la editorial que la publica. De las editoriales guardaremos su CIF, nombre (que será también único), email y teléfono y debemos tener en cuenta que podemos tener editoriales que en ese momento no tienen editados ejemplares de ningún libro de los mantenidos en nuestra base de datos.

---

Esta parte es sencilla, pero no te olvides de las claves alternativas.

> **Nombres para el comprobador**: las entidades `Edicion_Fisica` (`isbn`, `precio`, `fecha_lanzamiento`, `numero_paginas`, `dimensiones`) y `Editorial` (`cif`, `nombre`, `email`, `telefono`), y las relaciones `tiene_edicion` y `publicada_por`.

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 03** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TedIpFVWfq5GeHo2dK6M1MVuMpLoOWHLHUIpnDnQ90ZNsL7LFra8JEuyFlUPCGjdK0-91LDETqdd-NSZ7_rQ4gg_9oWRs908_oCZZYvj-b2xQnhDgTSwji9efGsTN9KxqMhW17Z04PDcKEmhvCWR2tpgOAcgVXD5jHbcSdn6y3VIjqkb9UNtmamIGSXjcA_c4SARFAdnsZMJDs2WWyQZODk-AKLYZdETFcsaOEVJ4M6VnrnCwlAVrRu5DQAZtEwYFjVBNiXyAHpdbZWEdxMZlvCYH11msToD2Op1dFJv_5brO99TQLNbq42a0-u9nrM9VvFJ1gQXMdiKPy-OfHNLQ9DptkojFocDZ7zUEk7KPZ7bW9WSmXjKbfPK40Q5GtDHqg_KBt6bFIhcw_xz2tpifaLOzIH5boNqiAYLY9jG5_uaMSxOQvsCaC-VDIIh1C-1m7maCkdRDM9TRyDk3UN80nCv5uTWzW4ImkS6nvNiYncgLnO0gefwG1xDg9JNbUTb_9RJK2jP2lvEIlRPgjNcn5psjjx-zqdqPUILP32PWbiaeq6xHZQSD5gPkk960V5r8F3q5IP7np0X-Ov0xpQIOi3M4tTvrmyOzyysjz7k4G7K8q-GhjwpJJL_5vGjz5XBhkaaHz70rglIqKUhAUs5zkiztPvcySuxOM-14pdnHyHdG7De9OBsQt7vGGbCyqaXhqZLwhamOHY-w3oXvH3PUIEUKpUWB-glEKAvRVoigJjcWvVMKNSdu43CpsyyjDR5wpt2evC9emFjC6dni-9BzK6G4celi8o68J3eyHtzOKlO4TustLD10Sugx0aB4GvYGtvQv-0_AM0RTLnwfnZYHTu24YojmDI4tdd-rheqnq-HFE){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 04 - Enunciado ER 14 Todos Tus Libros  (4)

Vamos a continuar con el siguiente párrafo:

---
El objetivo final de TodosTusLibros es facilitar que los usuarios reserven ediciones físicas en las librerías. De los usuarios guardaremos su NIF, nombre completo, email, teléfono y contraseña. De las librerías mantendremos su CIF, nombre, teléfono, dirección y email. Además, de las librerías necesitamos saber la cantidad en stock disponible de cada edición, teniendo en cuenta que una librería puede estar en un momento dado sin stock de ningún libro de los mantenidos en nuestra base de datos.

---

De esta parte, ten en cuenta especialmente de quién es la cantidad en stock: ¿de la librería, de la edición o de la pareja?

> **Nombres para el comprobador**: las entidades `Usuario` (`nif`, `nombre_completo`, `contrasena`, `email`, `telefono`) y `Libreria` (`cif`, `nombre`, `telefono`, `direccion`, `email`), y la relación `stock_disponible` (`cantidad`).

Escribe el texto BigER necesario para modelar lo indicado en ese párrafo y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 04** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TYbwp5VRZmlJMwvbadfNcA7UA4I7VDoUrpDABcDWumaAGsMuVxHb8zwrOaPOG3T1nbLGiYy6LOo631agVUzQe05IsEip5FuzX25uRPbydQ21EPJaX-_cQAsU5VSZgtMlz4AvFCLU0Zjc_hldFe_ZhDQi91JecdCiiZ9O4L6Rkj5zYeMKKzGHGR5vZH9-Eh36yWAjE1zIeTSMrO3eiLSXRQWWmpaYyV8acJxesEfJfUBOiUu4fXlsygke-VygNB3eifC2JVJD2m4NvArnzQKRtXqqbtlrI9wR2y064L8DratcOM_zMyXWgMQ7i9SMeNa9xcd7uQERUDhIpDWsge_RZTKAiCnZL6JD-MNk4tw_MSR1FZMyggOqX3iwCpGOtCdonoJmA3rsPRlQ62gbekwHaRWb2qKcnHwBgy9hV_QO5FVqaZ1_LlztYouS8PbdO8p006ZpBSh6Ds6Q5qMYUgrfBLc74GtYLYPieqKuqqB7yhMDGeIXjZz-DWKoS1rRryj12hQoZY9-OFPNBXxycPAiwUizBIlggLyOIVlnS-kbgsGIofyqCFUR23Cg5GFh7eoH5e0UBEIOpOFd4yu02pRoOmHs4RTvkkLOzyysjwjs9klRx014lsENKoNohewiedCex4ZaHw707gpILKShAXsgTkizocY9m0xgUk8Xhi-4ILlocd9jPMvPJRi3FSdW92UcZQhAKKC5JChBvFZ_DaBd9hoUD_Fy1c9JImdkxH6P-hJ6s0Ad4ZWXZT1MU3224upPTk_KaJMPa9z37hMneIo3AiVgnqe2Usf6IzCF0qHwPv-Jj3etaknloJjF3uNu2lSVoLr7XxfoIzsXkIE1iOCw_QSARUm2NNVtqLvJzlRzIkt96ViRO5c0M-Yvx6Nad4XY0l5LG6kKuwe3Al87gveOb07e1ziicZBuFbOUFdrCIWByCCr3P589-9St6DBXJKyp-XmtZuZVA){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 05 - Enunciado ER 14 Todos Tus Libros  (5)

Vamos a finalizar con los últimos párrafos:

---
Hay que tener en cuenta que un usuario puede realizar múltiples reservas (o ninguna). De cada reserva mantendremos un identificador único, la fecha de la reserva y la librería donde se hace. Cada reserva estará compuesta por una o varias líneas de reserva, donde cada línea estará asociada con la edición física deseada y la cantidad. Por ejemplo, si un usuario reserva dos ejemplares de una edición concreta de 'Dune' y otro de una edición concreta de 'El Hobbit', su reserva tendrá dos líneas de reserva: una Línea 1 asociada a la edición elegida de 'Dune' con la cantidad de 2, y una Línea 2 para la edición elegida de 'El Hobbit' indicando la cantidad de 1. El sistema debe ser capaz de almacenar y distinguir estas líneas dentro de la reserva a la que pertenecen.

Por último, los usuarios pueden valorar los libros (no sus ediciones), con una puntuación, comentario y la fecha teniendo en cuenta que solo se permite al usuario que valore una vez cada libro.

---

Esta parte, tras haber llegado hasta aquí, seguro que puedes hacerla sin ninguna pista.

> **Nombres para el comprobador**: las entidades `Reserva` (`id_reserva`, `fecha_reserva`) y `Linea_Reserva` (`num_linea`, `cantidad`), y las relaciones `realiza`, `gestionada_en`, `contiene_lineas`, `reserva_de_edicion` y `valora` (`puntuacion`, `comentario`, `fecha`).

Escribe el texto BigER necesario para modelar lo indicado en estos párrafos y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 05** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TWdwpZTWfq5GeFLRU-KkgvD13hidVEBk67rtsJRnULh0fgEuEPG8s3kOmlDWwUeops3oKdMQoe40a75hjOJWn2AeS5F2A02z6fl76eLM-wsLRfdllHSx1UIytc8ZvfvY21DzW8ViQHDEJilIpSaHrLvtV48cfR9XvhoeDtWu0MaRSKLSOb64m2w1NMiqmG3HN5uWH3Uz2LS-E6AijRzCeTgYWBUS8WAS6ghbqOVn2YwV9zic3kTIpe4xDakSttfmC_O7FWpDGTT_xMQsz6yeai6ZEDuIX0K3I-Unffvt8b73lvQ--6KugMFP-4omGYKIsvUZcvAYeEpEpx0ZPszinddWbjWn1c16x7fgWOfnTODS6MwyxKwht09aXa5wo0x9CiJhNZicqF3gf7mWuGW35x6i3w-6xillcxUd9xRHAWUMA0Ta9ihGWaNxsfLOIHXU0c6-UoZMcdvybjK8o-jpK6drQsynLZMv9EooWn77BbGfTfDFrI-y6Her0fH2F3hFtgu50mQrrQzN8nr56EJlBCjDzy9niGn7BAn0W2HehXpONa5IfF2YVS_xwul7XEIDodlgI3SnJEVPI1qOR1MmJu0NZX7-Xda-9SKuugZnVk9oGY_2nCtes0cMO2I_fGNQLvPapRawCLnH_DKL4_DgVbSHeL8nmDjR0lHPS-W98iLyQBG7tiZ8YDLcdXGKo4G-jW0t480QDbPUyvJ79F9-ZEfWVj5qRSoQvxzK2eGlTyBhp_Qkilo1ngPAFAmRn_F5hW48yjKhvCsysjRShkT0_PWr2G9gQbdCes5A17CB7P--fG4xRcI15gUlvuHWMLprHlukmJ5U4vdtkMCiOUO0waHuGQUU8GCA1XYe3Azg3NeQOemNgui1ZQvAC4W1IzeOu6kjZv9YGd8dyWSkwsLYDZTFYothghflDotXJEQ0vDJygmAKQ5sQbPs0JMGJjzlyNSlZAY1aisqJzUJwTCiJ2EOs_Q7AAkBdt4HTic2lBH_hTMGLQDZrPEUP7BFPqng1f8KLS8UuOBQ7j3JrfDcfvW5Q_qhRRPFeQ27aeK4uxAOoAnq6mX4XCul4qjpBemvZOblvrCpkV5x5rMbkVje0Xu5roujbMiAmVyGe_9OWUjPZMwYLyGq4pZUR9oYjFw){:target="_blank"}. Se abre en una pestaña nueva.

---
## Resolución del Enunciado ER 16 TravelFun

Los ejercicios a continuación están orientados a resolver el Enunciado ER TravelFun, disponible [aquí](https://github.com/bd-uex/bd-contenidos/blob/main/ejercicios/entidad-relacion/Enunciado%20ER%2016%20TravelFun.md).

Crea el archivo **ModeloTravelFun.erd** con **New Empty ER Model** y añade la línea `notation=crowsfoot` justo debajo de la línea `erdiagram`. Será donde vamos a ir modelando el Enunciado ER TravelFun.

Es otro **examen real**, así que, igual que con Todos Tus Libros, las pistas serán mínimas y cada ejercicio incluye solo los **nombres** que espera el comprobador.

---
### Ejercicio 06 - Enunciado ER 16 TravelFun  (1)

Vamos a comenzar centrándonos en resolver estos párrafos iniciales, que describen el catálogo de viajes:

---
TravelFun es una nueva plataforma de viajes organizados que nace con una misión clara: que cualquier persona pueda reservar desde el sofá de su casa una experiencia de viaje completa y sin sorpresas. Desde un viaje por la Normandía de la Segunda Guerra Mundial hasta otro por los Fiordos Noruegos, pasando por un viaje por la Toscana, TravelFun se encarga de todo y a nosotros nos piden que diseñemos su base de datos.

La plataforma ofrece un catálogo de viajes organizados. De cada viaje guardaremos un código único, su nombre comercial y una descripción. Cada viaje está estructurado en etapas que se identifican por un código único. De cada etapa guardaremos su nombre, descripción y duración en días. Una misma etapa puede formar parte de varios viajes distintos, por ejemplo la etapa "Roma: Coliseo y Vaticano" puede aparecer tanto en el Viaje por la Toscana como en el Viaje por Roma y Nápoles. Dentro de cada viaje las etapas siguen un orden concreto que hay que registrar. Cada etapa garantiza el alojamiento en una localidad concreta, del que solo es necesario saber el número de estrellas, teniendo en cuenta que las visitas de una etapa pueden realizarse en localidades distintas a la del alojamiento.

De las atracciones turísticas que se visitan en cada etapa guardaremos un código único, nombre y descripción. Una etapa puede visitar varias atracciones y una misma atracción puede aparecer en etapas de distintos viajes. Para facilitar el filtrado, las atracciones están clasificadas en tipos estandarizados (museo, monumento, parque temático, lugar histórico, catedral, etc.), con su código, nombre y descripción del tipo, teniendo en cuenta que una atracción puede pertenecer a varios tipos simultáneamente. Dentro de cada etapa las atracciones se visitan en un orden concreto que hay que registrar.

Para facilitar las búsquedas y filtrados, la plataforma mantiene información geográfica detallada. Las localidades pertenecen a países, y las atracciones turísticas están ubicadas en localidades concretas. Esto permite que un usuario pueda buscar, por ejemplo, todos los viajes que incluyen una visita al Coliseo de Roma o todos los que pasan por Italia.

---

De esta parte, pon especial atención a los atributos que no son de ninguna entidad: ¿de quién es el orden de una etapa dentro de un viaje? ¿Y el de una atracción dentro de una etapa? ¿Y el número de estrellas del alojamiento?

> **Nombres para el comprobador**: las entidades `Pais` (`codigo_pais`, `nombre`), `Localidad` (`codigo_localidad`, `nombre`), `Viaje_Organizado` (`codigo_viaje`, `nombre`, `descripcion`), `Etapa` (`codigo_etapa`, `nombre`, `descripcion`, `duracion_dias`), `Atraccion` (`codigo_atraccion`, `nombre`, `descripcion`) y `Tipo_Atraccion` (`codigo_tipo`, `nombre`, `descripcion`), y las relaciones `situada_en`, `incluye_etapa` (`orden_etapa`), `se_aloja_en` (`numero_estrellas`), `es_de_tipo`, `ubicada_en` y `visita` (`orden_visita`).

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 06** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=3fEBAkhURcKdS-MoYqRQJuJxYFxpY9xrxgSqAKal9v052Eh4VqQGPXODsgPDfxWQJgWrs7mSzuaXNEJ9CU3g_pEPCFQrvdZjdGfAkxWDn6LVi6Uo7bbE88H5hEJ7CixrNUpUVgUbflvCrJViMD7K_PZ2-_Cm2bTyqCk3WU_-Dj2u7QOEAubbARvjVyA4uPkevuYipYJy9QXjmWRsoY0W-SvcwNGhT4a48OvUKvaGabGDS0lDVCajGi1qEeYKkJ4h_kTSGx527kYBL8lP7MN6sebAxdNQOD9tDbkk7lcSOA6XvVNDc6HTHPfOWNqIthEXeC6wwiL1HPcgu9wr-qTtBxlBIOU44ed-i2bKf7gXneZwgIdPmiSIBJxDZtLJD0cl5M-ANcE8Q7aUyPqvVp2kCcOYrUJUb7Ydz7wu_Ux2xTZbCimnUn9hqTEGuHHtX-VavwEWdeFaqXmnTO8Dpn3OnEj3kee7u_bOJeZiHnlhGATz5C2O4qjpqfMRLmgsm_grJ5NQzgCJkUs){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 07 - Enunciado ER 16 TravelFun  (2)

Vamos a continuar con el siguiente párrafo:

---
Los viajes organizados se ofertan en distintas ediciones concretas a lo largo del año. Cada edición se identifica por su número dentro del viaje al que pertenece (la edición 1 del viaje A es distinta a la edición 1 del viaje B), almacenando también su fecha de inicio, fecha de fin, precio, estado y el porcentaje del plan amigo que explicaremos más adelante. Antes de que salga cada edición, se cierra definitivamente el equipo de guías que la acompañará durante todo el recorrido, sin posibilidad de cambios una vez iniciado el viaje. Cada edición es guiada por uno o varios guías profesionales. De cada guía guardaremos un identificador único, nombre, dos apellidos, teléfono y email único.

---

De esta parte, pon especial atención a cómo se identifica cada edición. Y lee con atención la frase sobre el equipo de guías: ¿hace falta guardar cómo ha ido cambiando a lo largo del tiempo?

> **Nombres para el comprobador**: las entidades `Edicion_Viaje` (`numero_edicion`, `fecha_inicio`, `fecha_fin`, `precio`, `estado`, `porcentaje_plan_amigo`) y `Guia` (`id_guia`, `email`, `nombre`, `apellido_1`, `apellido_2`, `telefono`), y las relaciones `es_edicion_de` y `guiada_por`.

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 07** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=3fcRIpFVRQG1CmxZAs-d8FU3c31WcSSk-ultd1NllIR0V9fpYmI7lWHUPc86NYLcFVo9_5lpYNs9rtf7LGXHQOYBvSzNn_dy21Fm6LoIfVLvN0sq1QDGzVq9LxQcys_houjnm3bxDMKEo7b9CdQZsprnQO4qIHAPWQqmzg0O1flfbeOTl56K_EJ9YyJY0Oi4uccTkdLPS43IuhV7aFDJzRBEKLsjWev-VZNG-8XPujZs3l-vTZriz77ClVAY6x8Y5WTRCjYIKJlQDMgq2GZfs1Sm-fEXXUgeSb9j3aDlfsYd37ve12TALt1L2eZoFoC03wMDm0QndFEDRSv1LtW4c06HskGJKFfNipWYZ6mSHjhaLsxxr-lHcH3FKbGLeqHfK0eNoBsKhPWG-lKiWI4uDyh1fUQPqHvJh7MFTXH710u3aqTkD9aUplMU8Aa4Hz9mstJel0nJaey6WLBjCgizLmV7WRdg3GbXrrk8Ddcgq0HSsBj89SUxlclo1yiHx4osKRaclT8IaY_HwYHGKDbCNVcm4z5Yab2eXXmyel7iv2aduMpggdq9P_DMaJ9DV9Y_Ygkllo1d8TNccl9iyGv7Bi7fv0RHFmCQmmEsaLy7tw7-dKJ0n54Dt61fxo8vhgR4_8qFaW-uBfHiQGLSJxm7Cd0gIiwbDgdo5VkQoPZqZiCIk5lSCzrU8K7qNDjRYSVE_lnMM0o){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 08 - Enunciado ER 16 TravelFun  (3)

Vamos a continuar con los párrafos que describen a los clientes y el Plan Amigo:

---
Los clientes se registran en la plataforma con un identificador único, nombre, dos apellidos, DNI único, email único, teléfono y su saldo acumulado del plan amigo. Entre los clientes distinguimos dos papeles. Los viajeros son los clientes que participan físicamente en alguna edición de algún viaje, y de ellos, por exigencia de los alojamientos, debemos guardar también su fecha de nacimiento y su nacionalidad (uno de los países registrados en la plataforma). Los compradores son los clientes que han pagado alguna reserva, y de ellos guardamos además su dirección de facturación. Un mismo cliente puede desempeñar los dos papeles, como quien paga su propio viaje, o solo uno de ellos: un padre puede pagar el viaje de sus hijos sin viajar él mismo, y sus hijos serán viajeros sin haber pagado nada. También puede haber clientes recién registrados que todavía no desempeñen ninguno de los dos.

TravelFun dispone de un sistema de recomendación llamado Plan Amigo: un cliente puede haber recomendado la plataforma a uno o varios clientes nuevos, y cada cliente puede haber llegado recomendado, como mucho, por otro cliente. Queremos saber quién recomendó a quién. A partir de ese momento, cada vez que cualquiera de los dos realice una reserva, ambos acumulan un saldo equivalente a un porcentaje del importe de esa reserva, porcentaje que varía para cada edición concreta del viaje (la visita a las playas de Normandía de 2027 puede generar un 3% mientras que ese mismo viaje en 2028 solo un 1%). Ese saldo acumulado puede usarse como descuento en futuras reservas.

---

De esta parte, pon especial atención a las restricciones de la jerarquía y a dónde va cada cosa: ¿quién puede recomendar a quién? ¿Quién acumula saldo? ¿Es algo de un papel concreto o de cualquier cliente?

> **Nombres para el comprobador**: las entidades `Cliente` (`id_cliente`, `dni`, `email`, `nombre`, `apellido_1`, `apellido_2`, `telefono`, `saldo_acumulado`), `Viajero` (`fecha_nacimiento`) y `Comprador` (`direccion_facturacion`), y las relaciones `recomienda`, con los roles `Recomendado` y `Recomendador`, y `tiene_nacionalidad`.

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 08** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TaLIlFSRTmdn3GOS3V597oA0VoaYJI0IujolYZRW8ZZWgoBCBSD-GplswogSneBrWevFIuA-_Bp6SRmlhnUqkz9IzTcQTpcKb8CzpfMcrV82poFjq23OpFuV_DHPP_kgzDIAGwVKzI_TloJFIs20JvJcltzC7RBMLDWXGJ0fsg7Mh1SsyWOMo75k-vFnqAgrcY4-Ca12d-uXpHOsec-B9V2Z1xyQ2HsikVpTaJDbAH3ND8tuB6erY9cU-vfub5Tr7RHv60Cek-147rtdmWbj09e_5vGihwZuSp0CSBXMDTLXysEZxpPTphDyi8-rbj3KOQ2wDdz5IVzENw1vXQ_pbRSR4Z643ZzmlnywLa1xlNe9jRrwEp4yxCGQrN5Bva5iAQCJK-YlayQjVoPjQ8i9IXyhqgPNN3a7h0VSXAK05BYoP3a3AdSn7WkQB6yMxV1uc4J3hTEN9MlN2o9TIJn0KpqWl0HnDmAKUJYjbIsJ0SHP5vChi1ywTxbDJ5daM9bV-RSxl3m3YktX4_9p7Gmm24Ef97Bx3sYZn8IYugNp-YLqvMsqgutP5CGqT7XDE2pvfVLHcWFEiqmC8l5X0YHdFu1XjdV4qTaH_hn97BPhe3PlFHsiTlIJi4IGbLlRypOZ2sppVD5gL3py0aF9df4omwS34cMsOyuz5JcxOeQq2CBwiOU2tA5AI_2jFkPbZqcAv9MpYKdUxFhjr4E_tn_Z-O5i5X7Ogka3m20mAHSblfewQDrP9esvljWCBf7KPfzZr5duLjptuX6zygbTHYJffC3gfMOlfEhD_7JkJkLTx5QIPBfkN6RoONTnl1adRBDaSApjRdHfbPycOoDwJ2Lnkb2YyBt0caZGDkWtas57OPB8IaWi-eMhUBPu62fvqbK8Co0ZKXoS_JvJ532AmVluln9mMr2oPMlFQ-UX9UacqPLkBU5tbDU49hznY_ufs1dCMJ2Q8Q4yFgknX91en3zazDjd5HvnSEe76hVDN-utXUeGuHG1pdBjC1AHri_Bkte-iW_0F3Famd7I3f0G0B1q7oW-HWxedp3X6l1w2mw3hCpDYeL1I1r4_Be20ec84tXpreusCDsbzKNVpzPmGM){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 09 - Enunciado ER 16 TravelFun  (4)

Vamos a finalizar con el último párrafo:

---
Cuando se realiza una reserva se genera un localizador alfanumérico único, almacenando también la fecha de reserva y el precio total pagado. Siempre hay un comprador responsable del pago de la reserva completa, independientemente de si él mismo viaja o no. Cuando se da de alta una edición, se crean en la plataforma todas sus plazas (si una edición tiene 60 plazas, se crean las 60), que se identifican por su número dentro de la edición a la que pertenecen. Cada reserva es siempre para una única edición concreta del viaje y agrupa una o varias plazas de esa edición que estaban libres. Al reservar, el comprador asigna cada plaza al viajero que la ocupará, y en la plaza se guardan las peticiones especiales de ese viajero (como menores que viajan sin acompañante o personas que requieren asistencia por movilidad reducida). Mientras una plaza está libre, no tiene ni reserva ni viajero. No es necesario representar en el diagrama la restricción de que todas las plazas de una reserva sean de la misma edición, ni la de que una plaza tenga viajero solo cuando está reservada.

---

Esta parte, tras haber llegado hasta aquí, seguro que puedes hacerla sin ninguna pista. Solo un consejo: lee con atención qué ocurre con una plaza mientras está libre.

> **Nombres para el comprobador**: las entidades `Reserva` (`localizador`, `fecha_reserva`, `precio_total`) y `Plaza` (`numero_plaza`, `peticiones_especiales`), y las relaciones `realiza`, `tiene_plaza`, `contiene` y `asignada_a`.

Escribe el texto BigER necesario para modelar lo indicado en ese párrafo y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 09** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TWRIlFSRfmpG29IRzR_iW11OE2fNVlD7F2h-ONCW1gzEezSzke8ZRWZtYBxhkJzpr8fvMVwcTPn7fyrZDE8bMeQtoGphtkMdlNEzuZfklvJVN3REnJk9vHvQAf9t_49IVFpdMqYqDl6rvZpTRI8UO-vgj54RE597NFrT6LbQE5QhmSb5Jc8o1GdmugXv0jvmYzLv-0r9CXPSnESVK_o3xJFw0Y9iXQ0LmAKM9Rxi07uHG3R1BjVua0DzoHlp7qv13eOvvVbzPnfb3-YZXPYaHLz1VNwO4LIXZlT4XhZbO4mICrnvhAZab_kfeLSI78imZaGxQ9YkdoFxFFyxsimYdAajUTsIPBdgb5zGvcdhZqS9lyvAPdHAdX8ylqRPXTUPOqNmdNPYaohf4Fk32Uq5SsyapubSRwYBxFjbzGMLWisZ81c0BZ43SA7srP2O7MfcsCJo-7ccDHFJbKC18MihRV9f5g3xUUV1a-3_0BvwECOw_08g9CO1FvkINcpKTq0V2Zfx8iYV85UDeK7zGLg7fPwo__nqnteWW0cFEF91s95BQEcr_dSgoL9n6HamVtthS0opP1Oo-o4NlbEFStSc4YrA8VmPU6o7y3vTznn3s_KeAbPjZ5RlJpnCvp3c9225EQXPHf2wuycbXTJGYhh9UzX4q_MXgmSF60_6zLAF3iAO-4jIslJPnC23N1s85gholHC7RECiApfOTYVh-kn-7wZe5nePTihLul26_y4nODmVQMO0Mb-FHf7r9KUoaSNwQLi3fzQ_DLhGyYtjGOkcQT4Rk3HiwQuq69LfkvDd-UBkrMTXE3VYhI9843kPfMrp04IS9BZDAmr8BQ1Mo7jTd8WE5_rxUzRUVwyHjkCxVwu4O0J3TPu-W5dhraDnNOiJRHv_1dEpUkretAnAunq7lDhERSbZuk0aSLqqNHZDPAawjsk_KT8FX_OADfKkkNrjTKR_0SLBdXCVTJBdCf-SFMLRwzz5VQa9n2YkxYGlGp4iT7RMDlwihZUQtcixpGDbdSX7Q0NZ9wx0ukI6xAmNlqFCdfesz4VM-JQmBhOYReaZMxRBpxjrzET04XLL6lq3J93OtDgp6ftXjizFBilkJwBLnUVOZpqoxfRTv-JbzSs6FEws16n1Ps8whkLgNUBRT4U_-ngBQKqjLHj1Ol2I5aOi6IFr17H2egfNJjIZtDf_TIiUQzbQQ26uCYK381XgEuZAyJHF7YUrhyfs3FRa9R18p9SRWFFMLJZCwA8xTWlXh6PLND8bZEuHd19p3ZH1v_tbBrt2jvC0XLXNb2uV01PEzuP854HVQcTlKitIfbAi0QwtymvBW42x6Vdx1k5bZoEuJU){:target="_blank"}. Se abre en una pestaña nueva.

---
### Fin

¡Enhorabuena! Has modelado correctamente los diagramas Entidad Relación de los enunciados Enunciado ER 14 Todos Tus Libros y Enunciado ER 16 TravelFun.

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20ERD%20resuelto%20por%20Bender.png)

Imagen generada por IA (Gemini Pro 2.5)

---
