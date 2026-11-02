---
title: LAB08 - BigER 1 (respaldo)
---

# LAB08 - Uso de BigER (1)

> **⚠️ Página de respaldo**
>
> Esta página es una copia del LAB08 para cuando el Campus Virtual o el comprobador habitual no están disponibles. Al final de cada ejercicio tienes un enlace para comprobar tu solución, pero **aquí no se registra nada**: guarda tus ficheros `.erd` y, cuando el Campus Virtual vuelva a estar disponible, envía en él tus soluciones de la práctica.

## Objetivos

1.-Antes del Laboratorio, Instalar la extensión BigER de VS Code

2.-Aprender a usar la extensión BigER de VS Code para modelado Entidad Relación

3.-Familiarizarse con la **sintaxis** de la notación BigER, comprendiendo cómo se describen las entidades, atributos, relaciones y cardinalidades.

4.- Modelar **relaciones recursivas** usando **roles**.

5.- Aplicar la notación para resolver la primera versión del **Enunciado ER 00A Estudio Videojuegos** visto en clase.

---
## Contenidos

### Antes del laboratorio -> Instalación de BigER

### Notación BigER

- 1.- Entidades, atributos y claves
- 2.- Relaciones entre entidades y cardinalidades
- 3.- Relaciones recursivas con roles

### Resolución del Enunciado ER 00A Estudio Videojuegos (primera versión)

---
## Antes del laboratorio -> Instalación de BigER en VS Code

Necesitas tener instalados **Visual Studio Code**, **Java 17** y la extensión **bigER UEx**. Si aún no los tienes, sigue las instrucciones paso a paso de la guía [AL09.1 - Instalación y uso de BigER en VS Code](https://github.com/bd-uex/bd-contenidos/blob/main/labs/anexos/AL09.1%20-%20Instalaci%C3%B3n%20y%20uso%20de%20BigER%20en%20VS%20Code.md), que también tienes en tu copia del repositorio en `labs/anexos`.

Si tenías instalada la versión pública de bigER del Marketplace, desinstálala antes: las dos versiones entran en conflicto.


---
## Introducción a la notación textual de BigER (1) Entidades, atributos y claves

La notación textual **BigER** (resumen completo de la notación disponible [aquí](https://github.com/bd-uex/bd-contenidos/blob/main/labs/anexos/AL09.2%20-%20Notaci%C3%B3n%20BigER.md)) es una representación textual que permite describir **diagramas Entidad-Relación** (E/R) de forma estructurada y comprensible.

Esta notación es especialmente útil en entornos donde es más fácil trabajar con texto en lugar de crear diagramas visuales manualmente, como es el caso de la extensión **BigER** para Visual Studio Code. A lo largo de esta sesión aprenderemos gradualmente a utilizar esta notación con ejemplos que van desde lo más básico hasta lo más avanzado.

Antes de comenzar, vamos a crear 2 archivos **.erd** en **VS Code**:

1. EjemplosNotacionBigER.erd
2. ModeloEstudioVideojuegos.erd

Para crear estos archivos, en VS Code, elige Archivo -> Nuevo Archivo y elige **New Empty ER Model**:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Menu%20Nuevo%20Archivo.png)

Cada archivo empieza con una línea `erdiagram NombreModelo`. Justo debajo, añade la línea `notation=crowsfoot`, para que BigER dibuje el diagrama con la notación Crow's Foot que usamos en la asignatura:

```erdiagram
erdiagram EjemplosNotacionBigER
notation=crowsfoot
```

Para ver el diagrama, abre su vista con **Ctrl+Alt+E** (**Cmd+Alt+E** en macOS). Si en algún momento el diagrama se descoloca o se sale de la ventana, **Ctrl+Alt+F** (**Cmd+Alt+F**) lo ajusta a la pantalla.

Ve al archivo EjemplosNotacionBigER.erd, que será sobre el que escribamos los ejemplos con la notación, y empecemos por cómo describir entidades y atributos.

Una **entidad** representa un objeto del mundo real o conceptual que tiene una existencia distinguible. Cada entidad tiene un conjunto de **atributos** que describen sus características.

Escribe lo siguiente en EjemplosNotacionBigER.erd:

```erdiagram
entity Nombre_Entidad {
    atributo_1 key
    atributo_2
    atributo_3
    atributo_4
    atributo_5
}
```

Deberías ver algo similar a lo que se muestra en la siguiente pantalla:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Entidad%20y%20Atributos.png)

Tenemos varios elementos en los que fijarnos:

- Palabra reservada `entity` (ojo, todas las palabras reservadas se escriben en minúsculas): especifica que vamos a definir una nueva entidad.
- **Nombre_Entidad**: es el nombre de la entidad. Por convención, cada palabra empieza por mayúscula y se unen con guion bajo.
- `{`: llave de inicio para indicar que pasamos a describir el contenido de la entidad.
- Lista de atributos, uno en cada línea, en minúsculas y unidos con guion bajo:
    - El atributo (o conjunto de atributos) que sea **clave primaria** se indica con la palabra reservada `key`, y aparece **subrayado** en el diagrama.
- `}`: llave de fin de descripción del contenido de la entidad.

A veces una entidad tiene más de un atributo que podría servir como clave primaria: son las **claves candidatas**. Elegimos una como clave primaria, y el resto son **claves alternativas**. En BigER, las claves alternativas se indican con la palabra reservada `unique`, y aparecen con **subrayado discontinuo** en el diagrama. Por ejemplo, de un coche nos sirven para identificarlo tanto el número de bastidor como la matrícula:

```erdiagram
entity Coche {
    vin key
    matricula unique
    modelo
}
```

> **💡 Nombres de los identificadores**
>
> Los nombres de entidades, atributos y relaciones no admiten tildes ni la letra ñ: escribe `anio`, `direccion` o `curso_academico`.

---
### Ejercicio 01 - Entidades y atributos

Modifica el contenido de la entidad Nombre_Entidad anterior para que pase a ser la entidad **Estudiante**, con los atributos **numero_expediente** (**clave primaria**), **dni** (**clave alternativa**), **nombre**, **apellido_1** y **apellido_2**, de forma que se visualice así:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Entidad%20Estudiante.png)

Escribe en la notación BigER cómo modelar la entidad **Estudiante**.


> **🔎 Comprueba tu solución del ejercicio 01** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=HathQohVWUGS7c6GdxQ0D7qpkElgtiluAVLusnMg2_VzVZa7mvefnubAHTXLraiHE3Uld6BfyI1-FL2b0kAsuPsYQI0IBrbthXhDYIJDYJd4C26vH_RB-_9TyhKot6d_EIW1noopB9XxFvYBnaxgnbdo){:target="_blank"}. Se abre en una pestaña nueva.

---
## Introducción a la notación textual de BigER (2) Relaciones y cardinalidades

Vamos a continuar modelando **relaciones** entre entidades.

Una **relación** describe una interacción entre dos o más entidades. Además, es **imprescindible especificar la cardinalidad de la relación**, es decir, con cuántas instancias de una entidad, como mínimo y como máximo, se puede relacionar cada instancia de la otra.

La notación utilizada en BigER es la siguiente:

```erdiagram
relationship nombre_relacion {
    Entidad_1[cardinalidad_minima..cardinalidad_maxima] -> Entidad_2[cardinalidad_minima..cardinalidad_maxima]
    atributo_1_de_la_relacion
    atributo_2_de_la_relacion
    ...
    atributo_n_de_la_relacion
}
```

- Palabra reservada `relationship`.
- **nombre_relacion**: es el nombre que le damos a la relación, en minúsculas y unido con guion bajo. Suele ser un verbo: `matriculado_en`, `trabaja_en`, `es_titular_de`.
- **Entidad_1** y **Entidad_2**: son las entidades involucradas en la relación.
- **cardinalidad_minima..cardinalidad_maxima**: puede ser:
    - `0..1`: mínimo cero, máximo uno.
    - `1..1`: una y solo una instancia.
    - `0..N`: desde cero a muchas instancias.
    - `1..N`: mínimo una instancia, máximo muchas instancias.
- Lista de atributos específicos de la relación, cada uno en una línea.

> **❗ Cómo se lee una cardinalidad en BigER**
>
> La cardinalidad escrita **junto a una entidad** indica con cuántas instancias **de esa entidad** se relaciona **una** instancia de la otra. La flecha `->` no indica ninguna dirección: `A[..] -> B[..]` y `B[..] -> A[..]` significan lo mismo.

Vuelve al archivo EjemplosNotacionBigER.erd y añade lo siguiente:

```erdiagram
entity Titulacion {
    codigo key
    nombre
}

relationship matriculado_en {
    Estudiante[1..N] -> Titulacion[1..1]
    fecha_matriculacion
}
```

Según la regla de lectura:

- `Estudiante[1..N]`: **una** titulación tiene entre 1 y N estudiantes matriculados.
- `Titulacion[1..1]`: **un** estudiante está matriculado en exactamente una titulación.

Tras escribir ese texto, deberías ver algo similar a lo que se muestra en la siguiente pantalla:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Relacion%20Estudiante%20Titulacion.png)

En la notación Crow's Foot, cada extremo de la línea lleva **dos marcas**:

- La marca **más cercana a la entidad** indica la cardinalidad **máxima**: una barra significa 1 y una pata de gallo significa N.
- La marca **más alejada** indica la cardinalidad **mínima**: un círculo significa 0 y una barra significa 1.

Fíjate también en que el atributo `fecha_matriculacion` aparece en la parte inferior del rombo: es un atributo **de la relación**, no de ninguna de las dos entidades, porque describe la matrícula de ese estudiante en esa titulación.

> **💡 Si el diagrama no sale en Crow's Foot**
>
> Si se te olvidó la línea `notation=crowsfoot`, también puedes cambiar la notación haciendo clic en el botón <img src="https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Bot%C3%B3n%20Notaci%C3%B3n.png" width="20" alt=""> de la barra del diagrama y eligiendo Crow's Foot.

Por último, BigER también permite modelar **relaciones ternarias** entre tres entidades. La única diferencia es que se encadena una tercera entidad con su cardinalidad:

```erdiagram
relationship nombre_relacion {
    Entidad_1[cardinalidad_minima..cardinalidad_maxima] -> Entidad_2[cardinalidad_minima..cardinalidad_maxima] -> Entidad_3[cardinalidad_minima..cardinalidad_maxima]
    atributo_1_de_la_relacion
    ...
}
```

---

## Introducción a la notación textual de BigER (3) Relaciones recursivas con roles

Una entidad puede relacionarse **consigo misma**: por ejemplo, un `Usuario` `sigue` a otro `Usuario`. Son las **relaciones recursivas**.

Para que se entiendan, cada participación lleva un **rol**: un usuario actúa como seguidor y otro como seguido. Como un actor de teatro que interpreta dos papeles distintos.

La notación utilizada en BigER es la siguiente:

```erdiagram
relationship nombre_relacion {
    Entidad[cardinalidad_minima..cardinalidad_maxima | "rol_1"] -> Entidad[cardinalidad_minima..cardinalidad_maxima | "rol_2"]
    atributo_1_de_la_relacion
    ...
}
```

Donde:

- Palabra reservada `relationship`.
- **nombre_relacion**: es el nombre que le damos a la relación.
- **Entidad**: la entidad involucrada en la relación, que aparece en los dos extremos.
- **cardinalidad_minima..cardinalidad_maxima**: se lee igual que en cualquier otra relación. En las recursivas, lo habitual es `0..1` en un extremo y `0..N` en el otro, o `0..N` en los dos.
- **rol_1** y **rol_2**: el papel que desempeña la entidad en cada extremo de la relación, siempre entre comillas.
- Lista de atributos específicos de la relación, cada uno en una línea.

Vuelve al archivo EjemplosNotacionBigER.erd y añade lo siguiente:

```erdiagram
relationship es_mentor_de {
    Estudiante[0..1 | "Mentor"] -> Estudiante[0..N | "Mentorizado"]
}
```

Leído con la regla de siempre:

- `Estudiante[0..1 | "Mentor"]`: un estudiante tiene **como mucho un** mentor.
- `Estudiante[0..N | "Mentorizado"]`: un mentor puede tener **ninguno o muchos** mentorizados.

Tras escribir ese texto, deberías ver algo similar a lo que se muestra en la siguiente pantalla:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Relacion%20Estudiante%20Titulacion%20Mentor.png)

Puedes ver como ahora en cada extremo de la relación es_mentor_de aparece el rol tomado en cada extremo de la relación por el Estudiante.

---
## Resolución del Enunciado ER - Enunciado ER 00A Estudio Videojuegos 

Los ejercicios a continuación están orientados a empezar a resolver el Enunciado ER 00A Estudio Videojuegos que hemos visto en clase, disponible [aquí](https://github.com/bd-uex/bd-contenidos/blob/main/ejercicios/entidad-relacion/Enunciado%20ER%2000A%20Estudio%20Videojuegos.md).

Decimos "primera versión" porque todavía no hemos visto las **entidades débiles**: vamos a modelar todo lo que podemos con lo que sabemos hasta ahora, y en el laboratorio 2 revisaremos las partes que lo necesiten.

---
### Ejercicio 02 - Enunciado ER 00A Estudio Videojuegos (1)

Abre el archivo ModeloEstudioVideojuegos.erd, que será donde vamos a ir modelando el enunciado.

Vamos a comenzar centrándonos en los 2 primeros párrafos:

---
En un rincón de Cáceres, entre encinas y conexiones de fibra óptica, ha nacido **Dehesa Pixel Studios**, un estudio de videojuegos que empezó con tres amigos y una pizza fría y que hoy ya no cabe en una hoja de cálculo. Su fundadora, Marta, está harta de perder la cuenta de quién trabaja en qué, así que te ha pedido que diseñes una base de datos para organizar el estudio.

De cada **desarrollador** se guarda su DNI, su número de cuenta bancaria (donde se le ingresa el sueldo, y que es distinta para cada desarrollador), su sueldo, su especialidad (programación, arte, sonido, diseño...), su nombre y sus dos apellidos. Los desarrolladores se organizan en **equipos**, cada uno con un código único y un nombre también único. Un equipo trabaja desde una o varias **sedes**, de cada una de las cuales se guarda la ciudad y la dirección; eso sí, un equipo nunca tiene dos sedes en la misma ciudad. Cada desarrollador pertenece exactamente a un equipo, aunque puede haber equipos recién creados que todavía no tengan a nadie. Además, un equipo puede tener un líder, que es uno de los desarrolladores, y del que se guarda la fecha desde la que lidera el equipo. Un desarrollador lidera como mucho un equipo, y un equipo puede quedarse temporalmente sin líder si el anterior se ha marchado.

---

Por ahora vamos a fijarnos solo en las **entidades** y sus **atributos**; las relaciones las modelaremos en los siguientes ejercicios. Estos párrafos nos dan dos entidades:

- **Desarrollador**: con un DNI único (candidato idóneo a ser clave primaria), un número de cuenta bancaria que también es único (así que será una **clave alternativa**), sueldo, especialidad, nombre y dos apellidos.
- **Equipo**: con un código único (candidato idóneo a ser clave primaria), un nombre que también es único (otra **clave alternativa**) y sus sedes.
    - Ten cuidado con las sedes: un equipo puede tener **varias**, así que son un **atributo multivalor**. Con lo que hemos visto hasta ahora, solo podemos representarlas como un atributo `sedes` de Equipo. En el laboratorio siguiente veremos qué hay que hacer con los atributos multivalor.
    - Ten cuidado también con el líder: aunque el enunciado hable del líder de un equipo, **no es un atributo de Equipo**. Es una relación con Desarrollador, que modelaremos en el siguiente ejercicio.

Escribe el texto BigER necesario para modelar los desarrolladores y los equipos, de manera que nuestro diagrama ER tenga estas dos entidades tal y como se muestran en la siguiente imagen:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Estudio%20Videojuegos%20parte%201.png)


> **🔎 Comprueba tu solución del ejercicio 02** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=BfORIkhUWQCtyePq21Qpof1_qMbf7NKB0oV-UQvx-bArJtLc8uho8p34GWD46cX2DzUX7ckvR45jmDzcAI7Kki6pmeDMZfgWrcFi875ZNCyjm0suxvQAplfHxyXhIsnA9OoMZHzwDgf1eioQiWY2i1NGHJBRD56VhSjEvjus9ZMrmoGHp2PiYqkI2jbJDcSRktMbj3b55n3X_V-K3_a8tYpQIX7cvAvlRc1EXXqRWoKSe8BfmPxzPf75z6h8_Cw){:target="_blank"}. Se abre en una pestaña nueva.

---

### Ejercicio 03 - Enunciado ER 00A Estudio Videojuegos (2)

Vamos a continuar con el tercer párrafo:

---
Lo que de verdad importa en el estudio son los **videojuegos**. Cada uno tiene un código único, un título también único y un argumento. Cada videojuego lo desarrolla exactamente un equipo, y puede haber equipos que todavía no hayan desarrollado ninguno. Los videojuegos se dividen en **niveles**: de cada nivel se guarda su número, su nombre, su dificultad y su duración estimada. La numeración de los niveles empieza en 1 en cada videojuego, así que el nivel 1 de un juego y el nivel 1 de otro son niveles distintos. 

---

De nuevo, vamos a fijarnos solo en las entidades. Este párrafo nos da dos más:

- **Videojuego**: con un código único (candidato idóneo a ser clave primaria), un título que también es único (otra **clave alternativa**) y un argumento.
- **Nivel**: con un número, un nombre, una dificultad y una duración estimada.
    - Con lo que hemos visto hasta ahora, el único atributo que podemos usar como clave primaria es el número. Modela Nivel con `numero` como clave primaria, pero **fíjate bien en lo que dice el enunciado sobre la numeración de los niveles**: volveremos sobre ello al final del laboratorio.

Escribe el texto BigER necesario para modelar los videojuegos y los niveles, de manera que nuestro diagrama ER tenga estas dos nuevas entidades tal y como se muestran en la siguiente imagen:
![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Estudio%20Videojuegos%20parte%202.png)


> **🔎 Comprueba tu solución del ejercicio 03** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=3fcdI5klRcKtznzdflfCXr4TegR3NXRlM5lLHdBPGun8FIyVP8TQujWEdgAOs1Y8ikzvv4apbgVzNE73JAk_FBFsh8J-5PhuhTFrxxnb1jGoQCPk4IhPGeLAfWk5cJCkB8bEfsSxIjjIe667IySWa-QLfVXkEsaZ-YhS1Nz3ic_25YBJBE9x7HeB4m3tS2rnqG39raAA6Onomi3JIHtxIn17xsB6AwX-ASfJSOKnc0r6EKScK99_NjO517P6Xkp-uUPj66_xKELthgIKityefB2Hx_g2QdY4ndFAqb7F0xE_yMcdq8vlQUugV7yG2jge6FWzxyNUmryfsV2ycNUE93Qeb14FTNAiAZcokjAxKnq4KHbaRgOvmFG6lJFYaZyW72tv7dQU4rmjD_BRoqvVHH0gV0bXgGRwipkCDM14fuZVHpuCiaS3SLUjXRJr_hJEB7LfujCo0sa0op7wfKVFmsya_PKT4SFgn-k5egdOGgRlmRBBUu0pkTQtSrKzhiSa-nV17AnoYFC_udQZvRpleSuWtg-jlLgq8emEBcBnTg0SRJxetx2zg7PT2JnAkD0R3TkuXr458kXObif_rZDAb8Zq12zPFcUb8uTLAHJMk3OEi369OYvosTAFwwjaihijwlU70mcdA7nJnIYs9jOhfjPvieaVD6DxnoPFIsyyu4udm1VUFIhCJ6bPewwcoVpngoSkJh-fb7OIyWxL3Woa_Vuh5kjQ86KGbfUbfVASWxHYhBXxfovXjvN8AxvoC6ifTQocUPfJl5YCLdgHcr4gNcZ6scHOA-p7){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 04 - Enunciado ER 00A Estudio Videojuegos (3)

Vamos a modelar las relaciones del segundo párrafo, entre Desarrollador y Equipo:

- En primer lugar, la relación **pertenece_a** entre Desarrollador y Equipo. Por lo que nos dice el enunciado, un Desarrollador pertenece a un Equipo y solo a uno, mientras que puede haber Equipos recién creados sin ningún Desarrollador, y otros con muchos.
- En segundo lugar, la relación **lidera** entre Desarrollador y Equipo. Por lo que dice el enunciado, un Equipo tiene como mucho un líder, y puede no tener ninguno temporalmente, mientras que un Desarrollador lidera como mucho un Equipo, y la mayoría no lidera ninguno. Además, de esta relación tenemos que guardar un atributo llamado **fecha_inicio_lider**, ya que no es un dato del Desarrollador ni del Equipo, sino de que ese desarrollador lidere ese equipo.

Fíjate en que entre las mismas dos entidades hay **dos relaciones distintas**: es perfectamente válido, porque cada una representa un hecho diferente del negocio.

Escribe el texto BigER necesario para modelarlas y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente cada relación, y comprueba con la regla de lectura que cada cardinalidad dice lo mismo que el enunciado.


> **🔎 Comprueba tu solución del ejercicio 04** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=1fAdw5lVRcKtyXwg7eE7ZydbPd1yNXRlM2k8p1bq9f1o_byUZI-XujUkstIr7n13qQCs8KUZUQFR5Gv7uEL-7tNMxmZINkHSf0gLjdNmraver-5kmh-nU7ewZzK6bINiuhTx2Bi_x77Lp9HYYC5cq1EPVQ7q5_CjwsGjc1busFwN6M1YI7WkhDBD-WJkWUkNyqidNLFEO5MJTGeiRDjQmOOntdV-lwaEeO31LqJZhIs7DCxX1QCSUSma0EH_oBQQAcCbzsxRc9VhZk5ey19A2aEbdL3pkmVroflutSFtw3SURxb13-f7IanQCQZGxPB9yq_m7Qv889SYcS7c4IXq-mprBIj8IbLtQz10JrKwXfVD1voJuw3khlACFaKHs6TlhQ3_kjevYDienD_tHzN6xKURFJ5uMTbGLqu_VopojXMvo0aICSntxyzGrNbKwfOtAvAwmX-QIP3c6OVz3Z8jfSS7kysQs0zbmsZrcRr2QaP9lsS1fYQeo2nly45VFZqrLwtD43eWb2oV2nIudS7HfWn7KKA4MCqQoEvXETvcB8URpz5US_9Cvxu9nTWzv65kJ___fSD0Ln7fpAJy36gE5IgZMd_Po7D526VVBlFsjoU3pIPulOu4SKc4ZG9gXSbQjaypLIp9GLd-tcz30Mfec3ie4huGpYtEdsmXdA){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 05 - Enunciado ER 00A Estudio Videojuegos (4)

Vamos ahora con las relaciones del tercer párrafo:

- En primer lugar, la relación **desarrolla** entre Videojuego y Equipo. Por lo que nos dice el enunciado, un Videojuego lo desarrolla exactamente un Equipo, mientras que un Equipo puede no haber desarrollado ningún Videojuego todavía, o haber desarrollado muchos.
- En segundo lugar, la relación **forma_parte_de** entre Nivel y Videojuego. Por lo que nos dice el enunciado, un Nivel forma parte de exactamente un Videojuego, mientras que un Videojuego puede no tener ningún Nivel todavía o tener muchos.

Escribe el texto BigER necesario para modelarlas y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente cada relación.


> **🔎 Comprueba tu solución del ejercicio 05** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=JTAdw5lVRfmlZzFLNNZ2krHX24jLb1zNiZrj0JPAzouhB5c6G3Kj-2FP-VBDuZpRs5SO8H0khEBlsSdLFMnzzX_1Ck4ZMMN5OlKSx3eKtsCc3fqcMJcCscI-La56pH-kJ8bEHpD3r82VhAd1OHueTzxoEuzIwMLEq_psQvinQRPf8tp4ohE1_Xl4R_V8-XKDHV6NMgK-uF4dMpxvxDe4F4KRElazXLVtnawwts_DhpVwn2FxYe8OkjbSKAIE6zsL3c1AVpj9HMqarsjXCmdkpyghoS-a1RmnizeqFXjkAAYdLyonTjiakoPxifICM0R6VbjWQi-7F8rBvr1wgf_mdFjXlPoLgvxHTyE5psbwjtcqtvM0_r03R0dM-4Sxj54o5zS_cl9qyq6Plrcx9t6J4HcrysgE_RRa-e5JnjBqzHEwbLJtf3kUrz8FW4NGnOufdLuWHJWzjt2OVJEr54ELr1DdQBVeW8apRz6Zem-uFrqqPK_7ytZy8xP7GxHSWqdmRxFgf27PBjuW2hLPBS364i434Vcd5bORPKFKiWCAKZHH66N5H8gfTrFcBmOWDsznNYjVAWufczjPcbTwAeY9V8GcYphJHIR_9UQAugQ23Z7BQsAK3SyuGEx2YeW7L4M_NIrwxcgU1Y3952QSRhlnv8OMfw){:target="_blank"}. Se abre en una pestaña nueva.

---

### Ejercicio 06 - Enunciado ER 00A Estudio Videojuegos (5)

Para terminar, nos falta el último párrafo:

---
Por último, los desarrolladores trabajan en los videojuegos, y el estudio necesita saber cuántas horas semanales dedica cada desarrollador a cada juego en el que trabaja. Un desarrollador puede trabajar en varios juegos a la vez, o en ninguno si acaba de llegar, y un juego en preproducción puede no tener todavía a nadie asignado. Como en Dehesa Pixel Studios creen que nadie aprende solo, los desarrolladores veteranos **mentorizan** a los recién llegados: cada desarrollador tiene como mucho un mentor, y un mentor puede mentorizar a varios desarrolladores.

---

Este párrafo nos da dos relaciones más:

- La relación **trabaja_en** entre Desarrollador y Videojuego. Por lo que nos dice el enunciado, un Desarrollador puede trabajar en ningún Videojuego o en muchos, y un Videojuego puede tener ningún Desarrollador asignado o muchos. Además, tenemos que guardar las **horas** semanales que dedica cada desarrollador a cada juego. ¿Es un atributo del Desarrollador? ¿Del Videojuego? Piensa detenidamente dónde ponerlo.
- La relación **mentoriza** de Desarrollador consigo mismo. Es una **relación recursiva**, así que necesita **roles**: un desarrollador actúa como "Mentor" y otro como "Mentorizado". Por lo que nos dice el enunciado, un Desarrollador tiene como mucho un Mentor, y un Mentor puede mentorizar a ninguno o a muchos Desarrolladores.

Escribe el texto BigER necesario para modelarlas y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente cada relación.


> **🔎 Comprueba tu solución del ejercicio 06** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=1THhIkhUWZmtG0swxqaB882pgO3GOEXODlKpQnVrHQxVDq_xaBJvfEzqJcCByKSyMncb_FhNgODuNGrKGEZX4HhfF8SOm5xMPbZMBU5-p9-yPe0sSnQjSm67k1z2Jpk0Anzog_ssvWeqNRF1INTB6T2hLFlYX559hmCI5-hYixKgP37oJOZf2WH7E6ovayA0b6c97uDjfJUFpnWYqlY8XP6Jy3lB4bQ5s-Nj6YYT3iyT9QaQwMuMfxjhCx5qaQriGfU4muqMPVepbIcm3sNJ4IMn2oW7XFiMaNVITNEdkh7hbOA8kkTNlkxt6psx_SF3Ep5N-G72CSjuhSC2cg_ebwJqRsLK53u7Mmg600jg21BdCTiMcdppP1q9zwUXg482aHjfCqkcWmG5QXoWHnrDvUvtpjzppVdy4uGWW4yQLRNrjhFD-LtOfp5mwsi3lH45XVEo07mxFEPyDIFtAK9kQ53GkjNnOOfQ4hv5_rgW0NzHg7qUZ62QvUc){:target="_blank"}. Se abre en una pestaña nueva.

---
### Fin

¡Enhorabuena! Has modelado la primera versión del diagrama Entidad-Relación para el Enunciado ER 00A Estudio Videojuegos. Pero, como en el diagrama que vimos en clase, todavía tiene **dos problemas**. Antes de terminar, intenta responder a estas dos preguntas:

1. ¿Es correcto `numero` como clave primaria de **Nivel**? Vuelve a leer lo que dice el enunciado sobre la numeración de los niveles: ¿qué pasa con el nivel 1 de dos juegos distintos?
2. ¿Es correcto el atributo `sedes` en **Equipo**? Recuerda que un equipo puede tener varias sedes, y que de cada una el enunciado nos pide la ciudad y la dirección.

No hace falta que cambies nada en el modelo: en el siguiente laboratorio veremos la herramienta que resuelve los dos problemas, las **entidades débiles**, y empezaremos precisamente revisando estas dos decisiones.

Guarda bien el archivo ModeloEstudioVideojuegos.erd: lo necesitarás en el siguiente laboratorio.

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20ERD%20resuelto%20por%20Bender.png)

Imagen generada por IA (Gemini Pro 2.5)

---

