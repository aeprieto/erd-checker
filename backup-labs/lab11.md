---
title: LAB11 - BigER 4 (respaldo)
---

# LAB11 - Uso de Entidades Asociativas

> **⚠️ Página de respaldo**
>
> Esta página es una copia del LAB11 para cuando el Campus Virtual o el comprobador habitual no están disponibles. Al final de cada ejercicio tienes un enlace para comprobar tu solución, pero **aquí no se registra nada**: guarda tus ficheros `.erd` y, cuando el Campus Virtual vuelva a estar disponible, envía en él tus soluciones de la práctica.

## Objetivos

1.- Familiarizarse con la **sintaxis** de las entidades asociativas en BigER.

2.- Distinguir las **entidades asociativas** de las entidades débiles, y saber cuándo usar cada una.

3.- Aplicar la notación para resolver el **Enunciado ER 11 Colegio de Enseñanza de Primaria**, que combina todo lo visto en los laboratorios anteriores.

4.- Aplicar la notación para resolver un examen real de diseño E/R: el **Enunciado ER 13 Todas Tus Series**.

---
## Contenidos

### Antes de empezar

### Notación BigER

- 6.- Entidades asociativas

### Resolución del Enunciado ER 11 Colegio de Enseñanza de Primaria

### Resolución del Enunciado ER 13 Todas Tus Series

---
## Antes de empezar

En este laboratorio vamos a crear tres archivos nuevos, con **New Empty ER Model** y con la línea `notation=crowsfoot` justo debajo de la línea `erdiagram`:

1. **EjemplosAsociativasBigER.erd**, para los ejemplos y el primer ejercicio.
2. **ModeloColegioPrimaria.erd**, para el enunciado del colegio.
3. **ModeloTodasTusSeries.erd**, para el enunciado de las series.

Recuerda que la vista del diagrama se abre con **Ctrl+Alt+E** (**Cmd+Alt+E** en macOS).

---
## Introducción a la notación textual de BigER (6) Entidades asociativas

El modelo Entidad-Relación tiene una regla fundamental e inquebrantable: **una relación solo puede conectar entidades; es imposible que una relación conecte con otra relación**. Un verbo no puede ser el sujeto de otra acción. Pero a veces nos encontramos con una relación **muchos a muchos (M:N) sin repetición** que es tan importante que necesitamos conectarla con otras entidades.

#### El problema guiado: competencias de los puestos de trabajo

**El escenario inicial**: en el departamento de Recursos Humanos de una empresa se definen los puestos de trabajo y un catálogo de competencias profesionales. La relación entre ellos es M:N:

- Un puesto de trabajo (por ejemplo, "Analista de Datos") requiere **varias** competencias (por ejemplo, "SQL Avanzado" y "Visualización de Datos").
- Una competencia (por ejemplo, "Liderazgo de Equipos") es requerida por **varios** puestos de trabajo.

La regla de negocio es que una competencia se asigna **una sola vez** a cada puesto: la pareja puesto-competencia no se repite. Abre el archivo EjemplosAsociativasBigER.erd y escribe este modelo inicial:

```erdiagram
entity Puesto_de_Trabajo {
    id_puesto key
    nombre_puesto
}

entity Competencia {
    id_competencia key
    nombre_competencia
}

relationship requiere {
    Puesto_de_Trabajo[0..N] -> Competencia[0..N]
}
```

**El nuevo requisito (el muro conceptual)**: ahora, Recursos Humanos necesita que cada una de estas asignaciones esté certificada. Es decir, se debe registrar qué **validador** (un directivo o un experto) ha aprobado que la competencia "SQL Avanzado" es necesaria para el puesto "Analista de Datos".

El validador no certifica el puesto en general, ni la competencia en general, sino **la pareja** puesto-competencia. Si intentamos conectar la entidad Validador directamente a la relación `requiere`, nos topamos con el muro conceptual del modelo E/R: **es imposible conectar una relación con otra relación**.

#### La solución: "cosificar" la relación en una entidad asociativa

La solución es transformar la relación `requiere` en una **entidad asociativa**, que nace de una relación M:N para que esta pueda conectarse con otras partes del modelo.

**Paso 1: convertir la relación en una entidad.** La relación M:N se convierte en la entidad asociativa **Requisito_Puesto**. Cada instancia representa el hecho único de que un puesto concreto requiere una competencia concreta.

**Paso 2: analizar su identidad.** Requisito_Puesto **no aporta ningún identificador propio**: su identidad es la combinación de las claves de las entidades que une, `{id_puesto, id_competencia}`. Y esa combinación **no se escribe** en BigER ni aparece en el diagrama: se deduce de las relaciones. Tampoco necesita clave parcial, porque la pareja no se repite.

> **⚠️ Una entidad asociativa no es una entidad débil**
>
> Las dos dependen de otras entidades para identificarse, pero de forma distinta. La débil tiene una **clave parcial** propia que, combinada con la clave de su propietaria, la identifica. La asociativa **no declara ninguna clave**: su identidad es exactamente la pareja que une. BigER no permite que una entidad sea asociativa y débil a la vez.

**Paso 3: usar la entidad para conectar.** Ahora que Requisito_Puesto es una entidad, podemos conectarla con Validador mediante una relación normal, **validado_por**.

La notación utilizada en BigER es la siguiente:

```erdiagram
// La relación M:N se "cosifica" en una entidad asociativa, sin ninguna clave.
associative entity Entidad_Asociativa {
    atributo_1_si_lo_tiene
}

// La relación M:N original se sustituye por dos relaciones asociativas,
// una con cada entidad, con [1..1] en el lado de la entidad.
associative relationship entidad1_participa_en {
    Entidad_1[1..1] -> Entidad_Asociativa[1..N]
}

associative relationship entidad2_participa_en {
    Entidad_2[1..1] -> Entidad_Asociativa[1..N]
}

// Ahora la entidad asociativa, al ser una entidad, puede participar en otras relaciones.
relationship relacion_con_entidad_externa {
    Entidad_Asociativa[0..N] -> Entidad_Externa[1..1]
}
```

Donde:

- Palabras reservadas `associative entity`, que declaran la entidad asociativa.
- **Entidad_Asociativa**: el nombre que le damos, el que mejor represente el hecho que recoge.
- Palabras reservadas `associative relationship`, que declaran cada una de las relaciones que unen la entidad asociativa con las entidades de la relación original.

> **❗ Reglas que valida BigER**
>
> - Una entidad asociativa **no puede declarar claves** (`key` ni `partial-key`), ni ser débil a la vez.
> - Debe participar **al menos en dos** relaciones asociativas.
> - En cada relación asociativa, el extremo de la entidad normal **debe ser `[1..1]`**: cada requisito es de exactamente un puesto y de exactamente una competencia.
> - Puede tener atributos descriptivos, o ninguno. Una entidad asociativa vacía **no** es un fallo M1.

Sustituye el modelo inicial de EjemplosAsociativasBigER.erd por el modelo completo del ejemplo:

```erdiagram
entity Puesto_de_Trabajo {
    id_puesto key
    nombre_puesto
}

entity Competencia {
    id_competencia key
    nombre_competencia
}

entity Validador {
    id_validador key
    rol_empresa
}

associative entity Requisito_Puesto {
}

associative relationship requiere {
    Puesto_de_Trabajo[1..1] -> Requisito_Puesto[1..N]
}

associative relationship es_requerida_por {
    Competencia[1..1] -> Requisito_Puesto[1..N]
}

relationship validado_por {
    Requisito_Puesto[0..N] -> Validador[1..1]
}
```

En el diagrama, la entidad asociativa se dibuja como un **rectángulo con un rombo dentro**, y sus relaciones asociativas como líneas sin rombo:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Entidad%20Asociativa%20Ejemplo.png)

Este modelo nos permite leer dos hechos de negocio distintos y conectados:

1. **Hecho 1**: existe un Requisito_Puesto (un puesto de trabajo requiere una competencia).
2. **Hecho 2**: ese Requisito_Puesto concreto lo ha certificado un Validador.

#### Nota importante: la ausencia de repetición en el tiempo

Este patrón funciona porque la pareja puesto-competencia **no se repite**: un puesto requiere una competencia una sola vez. Si pudiera repetirse (por ejemplo, si las competencias de los puestos se revisaran cada año y quisiéramos guardar el histórico), necesitaríamos un atributo de tiempo, como `anio`, para distinguir las repeticiones. Y como una entidad asociativa no puede tener claves, **dejaría de ser asociativa**: sería una **entidad débil histórica**, con `anio` como clave parcial, que dependería de Puesto_de_Trabajo y de Competencia, como vimos en el laboratorio 2.

| Situación de la pareja | Solución |
|---|---|
| No se repite y no participa en otras relaciones | Relación M:N |
| No se repite y participa en otras relaciones | Entidad asociativa |
| Se repite en el tiempo | Entidad débil histórica |

---
### Ejercicio 01 - Entidad asociativa

Vamos a resolver el ejemplo del **falso ternario** que vimos en el Tema 5. En el mismo archivo EjemplosAsociativasBigER.erd, modela lo siguiente:

- De cada **profesor** se guarda su NIF, su nombre y sus dos apellidos.
- De cada **asignatura**, su código y su nombre.
- De cada **aula**, un identificador, un nombre que también es único y su ubicación.
- Un profesor puede impartir varias asignaturas, y una asignatura puede tener varios profesores, cada uno con su grupo. La pareja profesor-asignatura no se repite.
- Cada uno de estos **encargos docentes** (un profesor en una asignatura) se imparte en un aula como máximo: puede no tener aula todavía, o no necesitarla, como las Prácticas Externas. En un aula se pueden impartir varios encargos, o ninguno.

Antes de escribir nada, piensa: ¿con qué se relaciona el aula? ¿Con el profesor? ¿Con la asignatura? ¿O con la pareja?

Modela el encargo docente como una entidad asociativa llamada **Encargo_Docente**, con sus dos relaciones asociativas, y relaciónala con **Aula** mediante la relación **se_imparte_en**, de forma que se visualice así:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Ternaria%20Falsa.png)

Escribe el texto BigER necesario y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender por qué no es una relación ternaria.

---
## Resolución del Enunciado ER 11 Colegio de Enseñanza de Primaria

Los ejercicios a continuación están orientados a resolver el Enunciado ER 11 Colegio de Enseñanza de Primaria, disponible [aquí](https://github.com/bd-uex/bd-contenidos/blob/main/ejercicios/entidad-relacion/Enunciado%20ER%2011%20Colegio%20de%20Ense%C3%B1anza%20de%20Primaria.md).

Este enunciado combina todo lo que hemos visto: entidades, relaciones, una entidad débil, jerarquías y una entidad asociativa. Abre el archivo **ModeloColegioPrimaria.erd**, que será donde vamos a ir modelándolo.

---
### Ejercicio 02 - Enunciado ER 11 Colegio de Enseñanza de Primaria  (1)

Vamos a comenzar centrándonos en los 3 primeros párrafos:

---
Un pequeño colegio de un pueblo, que solo imparte enseñanza de primaria desea organizar toda la información de que dispone para lograr una eficiente gestión de estudiantes, cursos, docentes y asignaturas. Los supuestos que quieren recoger inicialmente se especifican a continuación.

Cuando un estudiante ingresa en el colegio se deben facilitar sus datos personales (nombre, apellidos, sexo y fecha de nacimiento); el colegio le asigna un número de expediente único que se mantendrá a lo largo de toda su etapa escolar. Así mismo, dado que los estudiantes son habitualmente menores de edad, se debe recoger información de, al menos, uno de los tutores (puede ser la madre, el padre o cualquier otra persona a la que está a cargo) del estudiante. Para los tutores debe conocerse su nif, nombre y apellidos, profesión, dirección completa y un teléfono de contacto. También debe conocerse el tipo de relación que le une al estudiante, es decir, si la persona es la madre o el padre o cualquier otra relación. Además de la información anterior, si un estudiante sufre algún tipo de enfermedad, alergia o tiene algún grado de discapacidad debe reflejarse también, especificando una descripción de esta y si se requiere algún tipo de atención especial en el colegio.

Con respecto a los docentes, se debe mantener información personal del mismo (dni, nombre y apellidos, dirección y teléfono), el salario y la cuenta corriente para el ingreso del salario. Hay que tener en cuenta que casi todos los docentes llevan a sus hijos a estudiar a este mismo colegio en el que trabajan.

---

En primer lugar, parece claro que tenemos la entidad fuerte **Estudiante**, con número de expediente (candidato idóneo a ser clave primaria), nombre, los dos apellidos, sexo y fecha de nacimiento: `numero_expediente`, `nombre`, `apellido_1`, `apellido_2`, `sexo` y `fecha_nacimiento`.

Además, nos dicen que, si un estudiante tiene alguna necesidad especial, guardemos su descripción y la atención especial que necesita. Es decir, tenemos una subclase de Estudiante, **Estudiante_Especial**, con atributos propios que no tienen todos los estudiantes: `descripcion` y `atencion_especial`. Como es la única subclase, ya sabes qué restricción tiene su jerarquía.

También vamos a tener a los **tutores** (la madre, el padre o cualquier otra persona que tenga al estudiante a su cargo) y a los **docentes**. Si analizamos estas dos posibles entidades, vemos que tienen algunas similitudes y algunas diferencias.

Las similitudes son:

- Son personas adultas de las que hay que guardar un NIF (candidato idóneo a ser clave primaria), nombre, los dos apellidos, teléfono y dirección: `nif`, `nombre`, `apellido_1`, `apellido_2`, `telefono` y `direccion`.

Las diferencias son:

- De las personas **tutoras** hay que guardar su profesión (`profesion`), y además tienen una relación, **a_cargo_de**, con los estudiantes. Fíjate en que el tipo de relación (madre, padre...) no es un dato del tutor ni del estudiante, sino de la pareja: por eso es un atributo de la relación, que llamaremos `relacion`.
- De las personas **docentes** hay que guardar su salario y su cuenta (`salario` y `cuenta`). Además, tendrán algunas relaciones específicas que modelaremos cuando lleguemos a los párrafos correspondientes.

Con todo esto, ya podemos suponer que vamos a crear una jerarquía con la superclase **Persona** y las subclases **Tutora** y **Docente**. Para decidir sus restricciones, piensa si puede haber personas que no sean ni tutoras ni docentes, y fíjate en la última frase del tercer párrafo.

Escribe el texto BigER necesario para modelar todas estas entidades y la relación a_cargo_de, y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 02** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=xfGRAklUWQCtyeOKYuGZUx6XWK6KaPSMZoPEM3gz3VkKwq53oIvj8Ggi-eVF_c2JwyNDnxgMuKtnEdJUJLIBIPKpF6cOqWxQIeuTM9FKYlvTnCSSMTqvcRYyX2PrxYwxkxVs3b_ON2zrEg44cJK0vCrzXVdT71s1B5E5kpdqdiC3v9rt7hTgsRcEfTJWOseeHs4EHimvavxOuz9n-8aUiAAx64y2UxMGyfpcxPal7--8JpAIPF5q6SHPLh7xNlR4J5xfidq0HF3BecX-4ffYCtzIVAY3U2zydwGjKLzVyiS10WxWMY8Y0IyCUXc-rv5kTbmENCi5HFhAylrSM1K2P8K781Qz0ibOfkzbwICeegqCxtQ4sjOKa7oM9rt8Kq-bvQcumInAaKbS-n4){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 03 - Enunciado ER 11 Colegio de Enseñanza de Primaria  (2)

Vamos a continuar centrándonos en los 2 siguientes párrafos:

---
La educación en el colegio se organiza en torno a los distintos cursos de primaria, identificados por un número de curso; además se guarda una descripción general del curso. Algunos docentes son responsables de un curso (como máximo de uno) y esta información debe conocerse; téngase en cuenta que un curso sólo tiene como responsable a un docente.

Para cada curso se desea tener almacenados una serie de objetivos de aprendizaje que deben alcanzarse en ese curso (por ej. escribir las vocales, conocer los números del 1 al 10 o aprender a sumar con una cifra); estos objetivos son particulares de cada curso y aunque pueden parecerse, no pueden repetirse para distintos cursos. Cada objetivo tiene un código único interno consecutivo de objetivo dentro del curso concreto, (es decir, el primer objetivo para el curso 1º tendrá el valor 1 para este campo, el segundo el 2, etc… mientras que el primer objetivo del curso 2º también tendrá el valor 1, el segundo el 2, etc..). Para cada objetivo, habrá de almacenarse una descripción.

---

En primer lugar, parece claro que tenemos la entidad fuerte **Curso**, con número de curso (candidato idóneo a ser clave primaria) y descripción: `numero_curso` y `descripcion_curso`.

Además, hay que establecer la relación **responsable_de** entre Docente y Curso. Las cardinalidades de los dos lados se deducen directamente del enunciado.

Vamos ahora a modelar los objetivos de aprendizaje. Tal y como nos dice el enunciado, un objetivo no tiene ningún atributo que lo distinga de los objetivos de los demás cursos: tiene una descripción y un código que solo es único **dentro de cada curso**. Además, ¿qué pasaría con la información de los objetivos si desapareciera el curso al que pertenecen?

Todo esto nos tiene que llevar a modelar **Objetivo_Aprendizaje** como **entidad débil** que depende de Curso, con el código del objetivo como clave parcial (`codigo_objetivo`) y su descripción (`descripcion_objetivo`), y a unirla con Curso mediante la **relación débil** **tiene**.

Escribe el texto BigER necesario para modelar estas dos entidades y estas dos relaciones, y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 03** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=xfGdIpFVRcCtSmPIIvbpuUZLilCxFr3parhcT9BD8veUEcWUZ5e7wWrp5xxhGSeswrfnf_nhE-LP4qcL9PyHK2FRxrBkzWmRHPTTeLusXaD-uUDV-KSoqt5DR3lZ3CuiW0EzkDWlNH7T7TOn9CDDXBeS-ymz08BROVniaAM_bR2wvtjepNy-8k4VZK3hX_Fwc8Mi6MKfBw5jBc8CJ9Hs5VXieXWmaGySSfzWGiag8xJSKM6IUZcNPI7Uh6-vq_qxZwvFAA1ToutN9fmmKerRx_xrHY0PR5MBfvVI7_6uyVZ1RN-cDsAlmt60FGku4EUX7GMMhmdPaK6eSA8K8KRRtD8r9QiA9sZ0YivQZ8U8vtuFTkcLdPU7gIXT0kzthJSkppWbAz2WKxJ95YSk6nwYO09k_f5WDz0fFdZQ6-5LbM9Ovxy08NvSteHIZjPzV6zsKy_sbNtStyH8QBUAVaODiRtEqo7kVKeVK2NV7DhBwJmKrMazRCgEz6Z6gvIRBKA2nqPZsyxJEoZd){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 04 - Enunciado ER 11 Colegio de Enseñanza de Primaria  (3)

Vamos a continuar centrándonos en los 2 siguientes párrafos:

---
Desde el punto de vista de la docencia, los docentes en el colegio están agrupados en departamentos (matemáticas, lengua y literatura, idiomas, etc.) y cada docente sólo puede pertenecer a uno de los departamentos. Cada departamento se encarga de organizar un grupo de asignaturas, de las que se conoce un código único y el nombre. Es necesario aclarar que lo que entiende el colegio como asignaturas son Matemáticas, Lengua, Educación Física, etc., lo que implica que la misma asignatura pueda impartirse en varios cursos: por ejemplo, la asignatura de nombre Matemáticas se imparte tanto en 1º de primaria como en 5º de primaria.

Con el fin de organizar la docencia, debe mantenerse información de qué asignaturas hay en cada curso, cuántas horas tiene asignadas en cada curso. Es norma en el colegio que una asignatura en un curso sea impartida por un único docente aunque un docente podría impartir varias asignaturas en el mismo o distinto curso.

---

En primer lugar, tenemos dos nuevas entidades fuertes:

- **Departamento**: aunque el texto no da atributos explícitos (solo ejemplos), necesitaremos una clave primaria, `codigo_departamento`, y un atributo `nombre_departamento`.
- **Asignatura**: de forma similar, tendremos una clave primaria, `codigo_asignatura`, y un atributo `nombre_asignatura`.

El primer párrafo también define dos nuevas relaciones:

- Docente **pertenece_a** Departamento.
- Departamento **organiza** Asignatura.

Las cardinalidades de los dos lados de estas relaciones se deducen directamente del enunciado.

El segundo párrafo tiene una estructura más compleja. Nos pide "mantener información de qué asignaturas hay en cada curso, cuántas horas tiene asignadas en cada curso":

- El atributo `horas` no pertenece a Curso (¿horas de qué?) ni a Asignatura (las horas dependen del curso). Pertenece a la **combinación** de ambos.
- La cardinalidad máxima es N en los dos lados: un curso tiene varias asignaturas y una asignatura está en varios cursos. Es una relación M:N con el atributo `horas`.

Pero el final del párrafo dice que "una asignatura en un curso sea impartida por un único docente" y que "un docente podría impartir varias". Es decir, el docente no imparte la asignatura en general, ni el curso en general, sino **la pareja** asignatura-curso. Si intentamos conectar Docente directamente con la relación entre Curso y Asignatura, nos topamos con el muro conceptual del modelo E/R: **es imposible conectar una relación con otra relación**.

La solución es transformar esa relación en una **entidad asociativa**, como en el ejemplo de los puestos de trabajo:

- La relación M:N se convierte en la entidad asociativa **Asignatura_Curso**. Cada instancia representa el hecho de que una asignatura concreta se imparte en un curso concreto.
    - No aporta ningún identificador propio: su identidad es la combinación de las claves de Curso y Asignatura, que no se escribe.
    - No necesita clave parcial porque la pareja **no se repite**: cada asignatura aparece una sola vez en cada curso.
    - Tiene como atributo `horas`.

Además, necesitamos crear las dos **relaciones asociativas** que la unen con las entidades de la relación original, con `[1..1]` en el lado de cada entidad:

- Curso **consta_de** Asignatura_Curso.
- Asignatura **se_imparte_en** Asignatura_Curso.

Ahora ya podemos modelar que "una asignatura en un curso sea impartida por un único docente" y que "un docente podría impartir varias". Para ello crearemos la relación **imparte** entre Docente y Asignatura_Curso.

Escribe el texto BigER necesario para modelar estas 3 nuevas entidades y las 5 relaciones indicadas, y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 04** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=xfCfIpFVWYKtTmPLIv82uV1L5lK9guWfcjjlsloYNh_wi2QlmxJKIHlBfdE6k8BmmlwuqG3ELcYUkFqpuhc7bHtLIbCu4cq2xGnycMHmTYIttY5fDiCmllpTJZpZYOX2H4tZh7RGS4JORwK3A31aDXCsJhnNetJ0oa7us2SpRSJUJA0NO5aPcBlyaAe59xpiZsGTAFRZszdrOS1_oGHGuG5EJEiLhQt1uIypisl53JdZRhdQDZTf9UYmTgSRHvWhBJx3BqxtEnIvzhZe6HVkUpeiKF4-5teBBqR7LZIJA3DFNgZEzBJ9RRCSsejmibnbVckJ0EvzJ9eyNpoiGhYvK2dvuJHaaVTAhH41-TO1R9Iwez4VlDdnJF94oqB9m4YisYyFoaeSaqKkw80I7vMQS7EJJRMwrAnfqLbEXRz6yryjcJLv021qkk2Y3RUZ41ft9wQojNuCjReJps51pR8kPV0ebDjoMrhuIwwfTEpaHuPWRf_Z1T_rWNhQJ2pR2FCA0_i81ctGqgdL_zSywGrpvJ4vhdJ1qoGz9PpEkkZglrzkT3z5xmvLE18l9z_Yv4cIgD3wWk6Wq8HeCTpG8kdoTPV-ykmYazY8K4ZF5k07BCM014RZ0w1kCghWp0q1P6Uigvg4i3tOmRofaJZA09YfpBalkqI9Jw0eysQVBAgVH4PKSi9N){:target="_blank"}. Se abre en una pestaña nueva.

---

### Ejercicio 05 - Enunciado ER 11 Colegio de Enseñanza de Primaria  (4)

Llegados a este punto, solo nos falta modelar este párrafo:

---
Para poder elaborar las actas a partir de la base de datos, el colegio quiere mantener información de los estudiantes matriculados en cada asignatura de un curso, la fecha de matriculación, así como de las calificaciones que ha ido obteniendo en las tres evaluaciones distintas de cada curso. Hay que tener en cuenta que, aunque de manera excepcional se puede repetir un curso en educación primaria, el colegio nos ha pedido que no contemplemos este caso.


> **🔎 Comprueba tu solución del ejercicio 05** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=xfcbI5FVWYOtzn2MYFnFoOxilZqpe9KZxHIJUkQVeMVSJvcFwRuihS2LJ6S3Uxr6Lp-jaV4q5VFq_WaAev6bRBp_73SrwukllJJBRkidgpI1zmwNHlF6wXP2rdwmFdjJ1P3gcjWhNi-jQkSuTlUyRrS6_qqR_jPfs_CkFOEaVHjSwOIKO5QPUHlyaAfZ1xpiZsGTAFRZs-3WNMtyg_AZNcdwas4qlfVcP24JqGm3MDgSqkGLHNk36HUmUgSTHokhIJxLaTnhSwnZv44yU5TVLct0H87kdOUMymILfdx-mc0LBtUsMupHZGe6sje66xkXMPXaRSpMYk0tAB74WbIkOB0drlfYRNUUWbnCRkjsekC7gREVnd4e3CF_MsAcHsppIAXLjCRWOGcqFVkxowytSGQ5dtQl8DHadbYC-CyAFyX5TG9tdv_btCnN6TwZwuQHYBkqyk35fKast9cDzTrytc8JaqiG6xUtzVZ42w9g7FprdZgjtXNZiXrXdFPxpQEXqyfb_UEUsbgfbTbZjLmGmVXY5rD22t0yXoPrg5-_Y5Ir7Gjv3sUX6kjQknzut48Q6WNLUtvLkU6fRFy9-QWqN7F0_E8j37vGmUYXUKweF3HIUMwsBHlm6EG-oRgWss_6ilyFl09E9GyUP_zzh4EFgCQVCqTIt0D_ZxyV6c09gIJj8UKKecBoka9Xo73Q8RuBEyvbRKzXE459){:target="_blank"}. Se abre en una pestaña nueva.

---

Este párrafo final ya deberíamos poder modelarlo sin más pistas. Aun así, fíjate en dos detalles:

- Los estudiantes no se matriculan de una asignatura en general, sino de **cada asignatura de un curso**. ¿Qué entidad del modelo representa eso?
- El enunciado dice que, aunque se puede repetir curso, **no hay que contemplarlo**. ¿Qué cambiaría en el modelo si sí hubiera que contemplarlo?

> **Nombres para el comprobador**: la relación `matriculado` (`fecha`, `nota_1`, `nota_2`, `nota_3`).

Escribe el texto BigER necesario para modelar lo indicado en ese párrafo y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.

## Resolución del Enunciado ER 13 Todas Tus Series

Los ejercicios a continuación están orientados a resolver el Enunciado ER 13 Todas Tus Series, disponible [aquí](https://github.com/bd-uex/bd-contenidos/blob/main/ejercicios/entidad-relacion/Enunciado%20ER%2013%20Todas%20Tus%20Series.md).

Este enunciado es un **examen real** de diseño E/R, así que esta vez las pistas serán mínimas: es tu oportunidad de comprobar si eres capaz de resolver un enunciado completo por tu cuenta. Abre el archivo **ModeloTodasTusSeries.erd**, que será donde vamos a ir modelándolo.

Como en los ejercicios anteriores, cada ejercicio incluye los **nombres** que espera el comprobador para que reconozca tu solución. Solo los nombres: decidir qué es cada cosa, sus claves y sus cardinalidades es cosa tuya.

---
### Ejercicio 06 - Enunciado ER 13 Todas Tus Series  (1)

Vamos a comenzar centrándonos en resolver estos párrafos iniciales:

---
Los emprendedores de TodosTusSeries.com han decidido crear la plataforma definitiva para que los adictos a las series en España puedan encontrar su próxima serie y nos han encargado diseñar su base de datos considerando todos los aspectos que se detallan a continuación.

Para empezar, necesitamos almacenar información completa sobre las series que incluiremos en nuestro catálogo. Cada serie tendrá un identificador único, su título, una sinopsis, la fecha de lanzamiento, y el estado actual (en emisión, finalizada, cancelada sin avisar, etc.). Es fundamental recordar que en el mundo del streaming moderno, las series pueden ser producidas por múltiples productoras a la vez; de hecho, es cada vez más común ver colaboraciones entre estudios internacionales, por lo que una serie puede tener varias productoras involucradas. De cada productora guardaremos su identificador, nombre y URL.

Las series necesitan estar clasificadas por géneros para que los usuarios puedan encontrar fácilmente lo que buscan. Mantendremos un catálogo estandarizado de géneros con su identificador, nombre y descripción. Una serie puede pertenecer a múltiples géneros (podemos tener un drama sin más o una mezcolanza “drama-ciencia-ficción-comedia"), y por supuesto puede haber géneros que aún no tienen ninguna serie asignada en nuestro catálogo inicial. Además, para evitar que los padres acaben poniendo "The Walking Dead" a sus hijos de 5 años pensando que es sobre senderismo, mantendremos un sistema de clasificación por edades. Cada clasificación tendrá su identificador y edad mínima recomendada. Todas las series deben tener asignada una clasificación por edad obligatoriamente.

---

Esta parte es muy sencilla y no debería suponer ningún problema llevarla a cabo.

> **Nombres para el comprobador**: las entidades `Serie` (`id_serie`, `titulo`, `sinopsis`, `fecha_lanzamiento`, `estado`), `Productora` (`id_productora`, `nombre`, `url`), `Genero` (`id_genero`, `nombre`, `descripcion`) y `Clasificacion_Edad` (`id_clasificacion`, `edad_minima`), y las relaciones `producida_por`, `clasificada_como` y `tiene_clasificacion`.

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 06** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=Pa2RAolVWUKiS_dUTbSXUFBNWD1IRCQAagLYzTtQIqr0IVO9pM08_1Tm8pumimwcNFt4CLFNHYVmmTkvsPkEt3z-GHnMN7A-8B_NOpSvCyV9wHvht8UGXxaeFOY0Yh3cW_SGOK7qtUbmH-E6y_oM5gQjYXOtvppumstDfCk0DSgjKcK05LGfGoGAxmL4w093ixLTXRZzyErP2r6LDIOnKP8NhwWptflcTaQhE0NolTBzffk0r4kMlkfzbl6-xVRKt0aaE4OQed2AFqz02u-EybONTk1d9Qr7323t9kwGsUZH-5rYorqL8iUTHsaP756yUg){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 07 - Enunciado ER 13 Todas Tus Series  (2)

Vamos a continuar con los siguientes párrafos:

---
Hay que tener en cuenta que podemos tener series de una sola temporada o series con muchas temporadas (por ejemplo, Stranger Things ya tiene 4 temporadas emitidas, pero ya se está rodando la temporada 5). Cada temporada se identifica por su número dentro de la serie y además almacenaremos un resumen de sus novedades principales respecto a la temporada anterior (por ejemplo, para la temporada 3 de Stranger Things ese campo contendría algo del estilo de “Se presenta una nueva amenaza para Hawkins y sus habitantes: el Azotamentes”). Cada temporada contendrá un número variable de episodios: de cada uno de ellos guardaremos su número para esa temporada, su título propio, fecha de primera emisión, duración y sinopsis.

El aspecto multiidioma es crucial en nuestra plataforma. Mantendremos un catálogo estandarizado de idiomas con identificador y nombre. Cada episodio puede tener audio disponible en varios idiomas (al menos uno) y subtítulos en otros tantos (no es obligatorio tenerlos), pero no necesariamente coinciden; por ejemplo, podríamos tener una serie con audio en inglés y coreano, pero con subtítulos disponibles en español, francés e italiano (o incluso sin subtítulos).

---

De esta parte, pon especial atención a las posibles entidades débiles. Fíjate en que el número de episodio solo es único dentro de su temporada, y el de la temporada solo dentro de su serie: ¿de quién depende cada uno? Ten cuidado, además, con las cardinalidades de los idiomas del audio y de los subtítulos.

> **Nombres para el comprobador**: las entidades `Temporada` (`numero_temporada`, `novedades`), `Episodio` (`numero_episodio`, `titulo`, `fecha_primera_emision`, `duracion`, `sinopsis`) e `Idioma` (`id_idioma`, `nombre`), y las relaciones `pertenece_a`, `contiene`, `audio_disponible` y `subtitulos_disponibles`.

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 07** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=1fCRIpFVWcKtTmPLIu-1T-YoAVhxCU30n7YoFibSdizZYXXjAuLoPyP535pGtC9cOZCvc9tRfHb-GBGFN-SpYBjlnF50XMDzNiSgKyVVIHDLfPQArAoyyHO8X-OSMLTcmP_XEoBUJNTaCPyWKppGIl-CTXAZraBXCCk5zB3_pTlFfwxazwNFHyxGYJRtPrZ2OFyGZ7_gYvkwBNz0cxhH09RJpeO3mKjzndaHhbjddfUBBeeXZ0maUAqVGMq2jFVNAhGanfvhflKVc4tVWTTjAOwPIVIs-ZwoAFlkD_6_FD-r59BBgsiKaR606aARFFwZYPp5nA-4ONpZjkqt3MTuX8yvVLTZGUFB3jd_cC1eZWG5a8pVsN5G2Y_MJXueR-EcCkfnD26oQYzTtcJnjH8w_T4Oi_x3IBvGbmtd7NFf4YWNzrtW31h8HLCsr6_0LVwUKtENvdFSJVYI806NTxrujBIbZbRlrbcTPTG-Dr-x9sE1cn8rR2bnHKYkTIbD63rUs1G7heBEOTCQQMH7K1_iui_W1xWnZg){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 08 - Enunciado ER 13 Todas Tus Series  (3)

Vamos a continuar con el siguiente párrafo:

---
Detrás del telón aparecen las personas que participan en las series. De estas personas guardaremos su identificador, nombre, apellido, fecha de nacimiento, nacionalidad y una pequeña bio. Las personas que nos interesan se pueden dividir en creadores, directores e intérpretes. Para empezar, nada impide que una misma persona sea a la vez creador, director e intérprete. De los creadores, hay que saber qué series han creado teniendo en cuenta que puede haber series con varios creadores.  Los directores pueden dirigir varios episodios en distintas series y un episodio puede ser dirigido por varios. El tema de los intérpretes y sus actuaciones en episodios es más complejo. De los intérpretes hay que saber su nombre artístico (rara vez usan su nombre de normal). Un intérprete puede actuar representando uno o varios personajes en uno o varios episodios de una serie. De los personajes hay que saber su nombre y descripción. Hay que tener en cuenta que un mismo personaje puede ser interpretado por distintos intérpretes en distintos episodios de la misma serie. Por ejemplo, el personaje de Geralt de Rivia en la serie The Witcher ha sido interpretado primero por Henry Cavill y luego por Liam Hemsworth. Incluso en un mismo episodio, un mismo personaje puede ser interpretado por varios intérpretes, representando distintas versiones (por ejemplo, "Geralt niño" interpretado por un actor infantil y "Geralt anciano" interpretado por otro actor en un flashback). Es fundamental registrar los minutos exactos que dura cada una de estas actuaciones (es decir, cuántos minutos aparece el "Geralt niño" de ese actor, y cuántos el "Geralt anciano" del otro actor, en ese episodio). También debe almacenarse una breve descripción de esa versión específica, como "niño", "adulto" o "anciano", para darle contexto.

---

De esta parte, pon especial atención a las actuaciones de los intérpretes haciendo distintos personajes en los episodios. Es un caso muy especial: en el primer laboratorio de BigER vimos la sintaxis de las relaciones ternarias, pero aún no las habíamos usado en ningún enunciado. La pista definitiva para este caso es que tienes que revisar la sección 6 del Tema 5.

> **Nombres para el comprobador**: las entidades `Persona` (`id_persona`, `nombre`, `apellido`, `fecha_nacimiento`, `nacionalidad`, `bio`), `Creador`, `Director`, `Interprete` (`nombre_artistico`) y `Personaje` (`id_personaje`, `nombre`, `descripcion`), y las relaciones `ha_creado`, `dirige_episodio` y `actuacion` (`minutos`, `version_del_personaje`).

Escribe el texto BigER necesario para modelar todas estas entidades y relaciones y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 08** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=9fYbIpZVWcK1DuxY8qNSlB14RBX-bYWqyPKJPv5tNSoBw7TomUUia2YPTQ1ucBYpNRKc01V69xVO8SjWMSuK7j1_F8SOi9ZSPDkSkLpAu2yV0KrCCM0LX-ekS6XkCG-vaXhyiZQXK0im6G58m8QUM9S10rdJePTPgRtxVHoajSi9JDGfoa1XYcIf31_olz1pyHwr_YM6hSKcQE3ZZHthnir1ASTqmywzP82E4diOCwlK7x3e89zs3RuOyTWDtiJWnnhcSslzp96abdkeafWl6pEj-_WpQJupxgNvbTM-EnAdjRnw91I1TtKelu3bpNMnaxGEjU8pcTD6wrKQu_zIlr5RC9_gkdc0EBOMeY5IWNb5CP6jGt3Y95uzLXQZAZH9yh0zWdV2ZcLmq0zh_zDapgAAW1s32Z7kZ0TAq3ibjR0wIOzoiawPhe9XEW45W4fvEOhNyZ6GibccQgTgwcrKyjb0W3PMOkdLG_ztvUYyrUkTvwV7yOMmGY6J9Q9Koy7JjnPnysgCEn95of3eEauUHlUA8V-wuAXYErnsgbcaZNwqJ1mgoB5rXnQecQ7W4h-TQ2TK5geHJ3eComjlb0-ZNbUreGywHQPaZ537S8RinZ9zJODG1TR5PA3eORj8VEtY1dxzdlkzq9-W2xtrw6EKKywewmARDeTR6FuW72anIbTPi9bIRD2TODKq_H2mHqsk3mRHHfYFkTtjGbQdsaFZ36QBmUPlW_Q-3zfeXl6VaGUGPt77xBjoiEhF3JlFgZjylwIf0lfca7ay-RMwK13lSD0CO5K0Zw){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 09 - Enunciado ER 13 Todas Tus Series  (4)

Vamos a continuar con el siguiente párrafo:

---
 También mantendremos las plataformas de streaming disponibles en España con su identificador, nombre comercial, y URL. El sistema de derechos de emisión de las series es complejo: cada plataforma puede tener licencias para emitir diferentes series durante períodos específicos, con fechas de inicio y fin. Una serie puede estar disponible en múltiples plataformas simultáneamente o puede cambiar de plataforma según expiren los contratos.

---

De esta parte, ten en cuenta especialmente la última frase: "Una serie puede estar disponible en múltiples plataformas simultáneamente o puede cambiar de plataforma según expiren los contratos".

> **Nombres para el comprobador**: las entidades `Plataforma` (`id_plataforma`, `nombre_comercial`, `url`) y `Derechos_Emision` (`fecha_inicio`, `fecha_fin`), y las relaciones `licencia_plataforma` y `derechos_serie`.

Escribe el texto BigER necesario para modelar lo indicado en ese párrafo y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 09** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=9fWfIpFVWYKtSWPLoq61T-aoCkB3CX30n7aoFkZSMmXbYXX7ge_ovyL535JdN2JidyjGcrQhB9vBUmE4YNmpglaOnj3OLbmaKdH-Bgb66FPqK6Hu9MdF7pWtOzzzHRFUboJ1AQ7vyKG2KKHHbWCBrtiZXMFPkl4eACeaZG5lX6EuLIpDiMOG1Ud6aSmEsnvAi-AwNqaho79HXYt7BYZ5oXBg3StT4Wextc28o_VruZPXWQLSlpBnk5Xner1FAHsSaC0p8IsFZSxjn-Cr6DEIRiRHXUpQqHiLM14v6kOs0xxCkSGQlO5iM0R8aKSXz9pFXfv2aQ1I-SRgkaqz3BnNw-hei3L7iK9o_xBV3-OGSPjOZpwUf7LgbJ70AKzhMFG1vmp_JrZoDDissViC2D0hEBn32EJ_U-XuoQ7o4LJRJAXsWB_NR5TJSoXpYxi7t-oj7TPbTkfTQb5Yl_MB8AZgIaWuEyQ8TKQHugkYSKcwa3GUoy8jwr6_AhIuvr_-psrUIjonpEYUNmw6Rh3GQT3adIUeWBl6A2_ledSN8ihY7-Mm0CHkTfGV6vzXqrKkcVDBhvH5J6glBqFmHnx1Tm1jJ7IjmRuE4VfmjSeMLxhfaiwPoXk2rm0DtXG6bJmr6ZmDQ2eT7roCESOAUpZQl0YOKTgXAlXc6seBx1bHIj-PCFy8rrkz6H5HfiNZmsoLJn1e24X7daQ4EbXAIZbzxiD8p_812OgtQ8rTfJIT63jDe3KyeEbnnIj4JxWrMNfMiC0aD_wrJLwbMg_su_VJO7t7s0F40_r6sJL0UtGhJL04DKhG6oCQ6A1XHz2FA-XYMRIztrOMKd18ETf1o0rLgyCqq8G_5r0St71wA738I0mCMQx74bJOIQhmakzltvfdXJ91LfxqoEU){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 10 - Enunciado ER 13 Todas Tus Series  (5)

Vamos a finalizar con el siguiente párrafo:

---
Para la comunidad de usuarios, registraremos usuarios con identificador, email y nombre de usuario. Los usuarios pueden tener plataformas favoritas, valorar series con una puntuación y un comentario, y también valorar episodios individuales, pero en este caso solo con puntuación. Además, un usuario puede crearse distintas listas personalizadas de series, a las que se les dará un número consecutivo para cada usuario, y tendrán un nombre y descripción. Estas listas pueden ser compartidas con otros usuarios y hay que saber con quienes.

---

Esta parte, tras haber llegado hasta aquí, seguro que puedes hacerla sin ninguna pista.

> **Nombres para el comprobador**: las entidades `Usuario` (`id_usuario`, `email`, `nombre_usuario`) y `Lista` (`numero_lista`, `nombre`, `descripcion`), y las relaciones `favorita`, `valora_serie` (`puntuacion`, `comentario`), `valora_episodio` (`puntuacion`), `crea_lista`, `incluye_serie` y `compartida_con`.

Escribe el texto BigER necesario para modelar lo indicado en ese párrafo y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 10** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=9fWLIp5VRcKtx0CEYEluToyzWhlIMVz8ABjzrNGpOlPfVib6ZnC6yiAL2AXKXpcQPUWmc5V5aUrIFhFmiu6c4oGPfEtCoaPZUE6fDYTEiO9ddx6BHXGXoifnXTshzqa_oWofnVpNocKhbybg_1NMUabLXpxQ1erlYYRIWyNrE72-rPQxbckuURqQUQanQin_jL5bivXYzSX9kODKnDT9B2srE6cS1wXmvEEcCJyRND2m3abYxt4UoqDSCxSb_EXLW6QTNpQFhazXoDqyFLHxQii5w05HyLfKpQj-VSwCxR8aIW7AkWKksgSzRzbICmQ_8WWNOi7M1lEOEN3OusOe_bEUMPfACe5lCf9hOS_Sr8jNAFFxHKijWUiHCERZ5BMunv2gmMbayYGhMOUIsvnBvRrBVPji1dARX59LHhMpIfmU2CGoE3aarTKEPwapah0ju-dqWCLUdnuWCL_K9ezIN_sMVu2So5EjtUOLYqcwa0FykI8mqMtvVdaughIsnd8D6c9ruNDdgKBfa9NBQT2idIVe62ZSVkibnZeNjii47OMm2kGYV-8yH93DBa5aFLOeSLElAWZN_2LLvax2IW4neowwzGdNJ1QVxWOKLuQl4Ynx58O7imQZhwUkarjzCXtpH3NkB8naVx6vJ5JBy-O6dBDI8gYUWx_SawTyPLfF7GiRAmixxRIYBk1os0oP7sdFlMGpJsQ-ThTeUKkJQ12GJdfAtU_jvMULCS_YD_tu5GZsgUtv_Dzi80hNVLpoAWahF5YlkPO80tlf6VcG2MbdZhPr_QoZvb90TjSxxbZTgFuLQUHGcXEQJKhrwmgwo3vmXo-L134A5yyoRtvSVFIGNOlE63EyaXzwyJCvPMhhKFcSSNJ-T7OPPh7cwrnjI0eozR3FduZ_UJs_PyujN680jSTEJQzsqzMa8trtS34te8Ix7ZIpaLDUGyz-0VV6YsvL5fX544HdkbF0xwkKft4-jXYBhhNWruDPhwg0DDsAnGmiAiG30A0P8o7b9lt5Y8RuNPpVqZ5WnKtpmU3dLguRF36IXecGy2va-ruVh7m97exgLI3su3I){:target="_blank"}. Se abre en una pestaña nueva.

---
### Fin

¡Enhorabuena! Has modelado correctamente los diagramas Entidad Relación de los enunciados Enunciado ER 11 Colegio de Enseñanza de Primaria y Enunciado ER 13 Todas Tus Series.

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20ERD%20resuelto%20por%20Bender.png)

Imagen generada por IA (Gemini Pro 2.5)

---
