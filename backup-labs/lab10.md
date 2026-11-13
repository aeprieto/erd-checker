---
title: LAB10 - BigER 3 (respaldo)
---

# LAB10 - Uso de Jerarquías

> **⚠️ Página de respaldo**
>
> Esta página es una copia del LAB10 para cuando el Campus Virtual o el comprobador habitual no están disponibles. Al final de cada ejercicio tienes un enlace para comprobar tu solución, pero **aquí no se registra nada**: guarda tus ficheros `.erd` y, cuando el Campus Virtual vuelva a estar disponible, envía en él tus soluciones de la práctica.

## Objetivos

1.- Familiarizarse con la **sintaxis** de las jerarquías en la notación BigER.

2.- Modelar **jerarquías de especialización y generalización**, decidiendo qué subclases están justificadas y qué restricciones de completitud y disyunción tiene cada jerarquía.

3.- Aplicar la notación para resolver el **Enunciado ER 04 The Expanse Completo**.

4.- Repasar todo lo visto en los laboratorios de BigER resolviendo el **Enunciado ER 07 Naves no tripuladas de la OPA**.

---
## Contenidos

### Antes de empezar

### Notación BigER

- 5.- Jerarquías de especialización y generalización

### Ejercicios de jerarquías: la Universidad

### Resolución del Enunciado ER 04 The Expanse Completo

### Resolución del Enunciado ER 07 Naves no tripuladas de la OPA

---
## Antes de empezar

En este laboratorio vamos a crear cuatro archivos nuevos, todos con **New Empty ER Model** y con la línea `notation=crowsfoot` justo debajo de la línea `erdiagram`:

1. **EjemplosEERBigER.erd**, para los ejemplos de la notación.
2. **ModeloEERUniversidad.erd**, para los ejercicios de jerarquías.
3. **ModeloTheExpanseCompleto.erd**, para el enunciado de The Expanse completo.
4. **ModeloNavesNoTripuladasOPA.erd**, para el enunciado de las naves no tripuladas de la OPA.

También necesitarás el archivo **ModeloTheExpanseV1Simplificado.erd** del laboratorio anterior.

Recuerda que la vista del diagrama se abre con **Ctrl+Alt+E** (**Cmd+Alt+E** en macOS), y que **Ctrl+Alt+F** (**Cmd+Alt+F**) la ajusta a la pantalla. Los diagramas con jerarquías suelen ser grandes, así que este segundo atajo te será útil.


---
## Introducción a la notación textual de BigER (5) Jerarquías de especialización y generalización

Dentro de una entidad general, la **superclase**, puede haber subgrupos con características propias: las **subclases**. Entre ellas existe una relación "ES UN": un ingeniero **es un** empleado.

Una subclase hereda **todos los atributos** de su superclase, incluida la clave, y **todas sus relaciones**. Por eso, solo está justificado crear una subclase cuando aporta **algo propio**:

- **Atributos específicos** que no tiene el resto de la superclase. Por ejemplo, el atributo `tipo_ingeniero` de la subclase `Ingeniero`, que es una especialización de la superclase `Empleado`.
- **Relaciones específicas** en las que no participa el resto de la superclase. Por ejemplo, la relación `afiliado_a` con `Sindicato` de la subclase `Empleado_Tiempo_Parcial`, que también es una especialización de `Empleado`.

Una subclase que no aporta ni atributos ni relaciones propias está **vacía**, y crearla es el fallo **L17**: esa distinción cabe en un simple atributo de la superclase.

Cada **jerarquía** agrupa las subclases que se obtienen con un mismo **criterio** de clasificación (por puesto, por jornada...) y tiene dos restricciones:

| Restricción | Pregunta | En BigER | Significado |
|---|---|---|---|
| **Completitud** | ¿Toda instancia de la superclase debe estar en alguna subclase? | `total` | Toda instancia está al menos en una subclase |
| | | `partial` | Puede haber instancias que no estén en ninguna |
| **Disyunción** | ¿Puede una instancia estar en varias subclases? | `disjoint` | Como máximo en una |
| | | `overlapping` | Puede estar en varias a la vez |

La notación utilizada en BigER tiene dos partes:

```erdiagram
hierarchy nombre_jerarquia Superclase completitud disyuncion

entity Subclase extends nombre_jerarquia {
    clave_de_la_superclase key
    atributo_1_de_la_subclase
    ...
    atributo_n_de_la_subclase
}
```

Donde:

- Palabra reservada `hierarchy`, que declara la jerarquía **una sola vez**, con su nombre, su superclase y sus restricciones.
- **nombre_jerarquia**: se nombra por el **criterio** de clasificación, en minúsculas: `por_puesto`, `por_jornada`, `por_tipo_vehiculo`.
- **completitud**: `total` o `partial`. **disyuncion**: `disjoint` u `overlapping`.
- Palabra reservada `extends`, que indica que la subclase pertenece a la jerarquía. Ojo: `extends` va seguido del **nombre de la jerarquía**, no del de la superclase.
- **clave_de_la_superclase**: cada subclase repite la clave de la superclase con `key`, y debe ser **la misma** (fallo **M8** si no lo es). Es el **único** atributo de la superclase que se repite: repetir cualquier otro es el fallo **M9**.
- Resto de atributos **propios** de la subclase.

> **⚠️ Tres detalles importantes**
>
> - Si la jerarquía tiene **una sola subclase**, solo cabe `partial`, sin restricción de disyunción: no hay nada con lo que solaparse.
> - Una misma superclase puede tener **varias jerarquías**, una por cada criterio. Por eso es importante nombrarlas por su criterio.
> - Una entidad solo puede tener **un** `extends`: BigER no admite herencia múltiple. Sí admite jerarquías **multinivel**: una subclase puede ser a su vez superclase de otra jerarquía.

Vamos a verlo con el ejemplo del `Empleado` del Tema 5. Abre el archivo EjemplosEERBigER.erd.

**1.-** En primer lugar, la superclase `Empleado`, de la que van a heredar todas las demás:

```erdiagram
entity Empleado {
    dni key
    nombre
    fecha_nacimiento
    direccion
    telefono
}
```

**2.-** En segundo lugar, una primera jerarquía de `Empleado` **por el tipo de puesto**, con tres subclases que tienen cada una un atributo propio. Un empleado tiene como mucho un puesto de estos tres (`disjoint`), y puede tener otro puesto que no nos interesa modelar (`partial`):

```erdiagram
hierarchy por_puesto Empleado partial disjoint

entity Administrativo extends por_puesto {
    dni key
    categoria
}

entity Tecnico extends por_puesto {
    dni key
    nivel
}

entity Ingeniero extends por_puesto {
    dni key
    tipo_ingeniero
}
```

Tras escribir ese texto, deberías ver algo similar a lo que se muestra en la siguiente pantalla:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Jerarquia%20Empleado%20por%20puesto.png)

Fíjate en cómo se dibuja: cada subclase apunta con una flecha a una caja con las restricciones de la jerarquía, y esa caja apunta a la superclase.

**3.-** En tercer lugar, una segunda jerarquía **por responsabilidad**, con una sola subclase, `Gerente`. No tiene atributos propios, pero está justificada porque participa en una relación propia: solo los gerentes dirigen proyectos. Al tener una sola subclase, la jerarquía solo puede ser `partial`:

```erdiagram
hierarchy por_responsabilidad Empleado partial

entity Gerente extends por_responsabilidad {
    dni key
}

entity Proyecto {
    codigo_proyecto key
}

relationship dirige {
    Gerente[1..1] -> Proyecto[1..N]
}
```

Tras escribir ese texto, deberías ver algo similar a lo que se muestra en la siguiente pantalla:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Jerarquia%20Empleado%20por%20puesto%20y%20responsabilidad.png)

**4.-** En cuarto lugar, una tercera jerarquía **por tipo de jornada**, con dos subclases que tienen cada una un atributo propio. Todo empleado tiene una jornada (`total`), y solo una (`disjoint`). Además, una de las dos subclases participa en una relación que no tiene el resto de empleados:

```erdiagram
hierarchy por_jornada Empleado total disjoint

entity Tiempo_Completo extends por_jornada {
    dni key
    salario
}

entity Tiempo_Parcial extends por_jornada {
    dni key
    horas_semanales
}

entity Sindicato {
    codigo_sindicato key
}

relationship afiliado_a {
    Tiempo_Parcial[1..N] -> Sindicato[0..1]
}
```

Tras escribir ese texto, deberías ver algo similar a lo que se muestra en la siguiente pantalla:

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Jerarquia%20Empleado.png)

Fíjate en que `afiliado_a` se conecta a `Tiempo_Parcial` y no a `Empleado`: conectar una relación específica de una subclase a la superclase es el fallo **L19**.

---
## Ejercicios de jerarquías: la Universidad

En los siguientes ejercicios vamos a modelar la jerarquía de la Universidad que se ve en la sección 7.7.A del Tema 5. Abre el archivo **ModeloEERUniversidad.erd**.

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20BigER%20Jerarquia%20Universidad.png)

> **📝 Sobre los atributos de este ejemplo**
>
> En estos ejercicios nos vamos a centrar en la **estructura** de las jerarquías: superclases, subclases, restricciones y niveles. Por eso las subclases solo tendrán su clave. En un diseño real, cada una de ellas tendría que aportar atributos o relaciones propias para estar justificada, como hemos visto. Por ejemplo, la división de los estudiantes por edad solo tendría sentido si los menores tuvieran algún dato propio, como la relación con su tutor legal.

---
### Ejercicio 01 - Jerarquías (1)

En primer lugar, escribe la entidad **Persona_UEX**, que va a ser la raíz de toda la jerarquía:

```erdiagram
entity Persona_UEX {
    nif key
}
```

A continuación, escribe la primera jerarquía de Persona_UEX, cuyas subclases son **Empleado** y **Estudiante**. La llamaremos `por_tipo_relacion` y decide sus restricciones a partir de la imagen.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 01** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=3a5tRolVWQSjbc6mJ041YiRKJEeIM0cVBQLbjAE2vJD55hDLVIUuy387pDhJan49UTNbRntYcfMFq6V04kF3dM67y2XHgrTGWZglDod6fM4Vu5mfmNTPy2PlL5EgPR85eE_47Je8XpFoChaloS5YHWaHN_ysk3bweU4x_Tliga4vgks){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 02 - Jerarquías (2)

Seguimos con el archivo ModeloEERUniversidad.erd. Añade lo siguiente a lo que ya llevas:

```erdiagram
hierarchy por_tipo_empleado Empleado total overlapping

entity Docente extends por_tipo_empleado {
    nif key
}

entity PTGAS extends por_tipo_empleado {
    nif key
}
```

A continuación, escribe la jerarquía `por_tipo_docente` para la especialización de **Docente** en **Catedratico** y **Titular**. Antes de decidir las restricciones, ten en cuenta que existen más tipos de docente que no van a aparecer en nuestra jerarquía (Sustituto, Ayudante...).

Fíjate en que es una jerarquía **multinivel**: `Docente` es subclase de `Empleado`, que a su vez es subclase de `Persona_UEX`.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 02** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=3fIRJolVRQG1CuxYsDEaDQfiEBCiq1mWeqk_73PXIhVDGacgaEJTQT6wnqmFC4cGIDdot9chGYrzKHF_3XDGkWLryD-CI2O9f1p48JwXqKd_7Tm8lV3sO6V-7Xx4OsCB8t4B2hRUFGSjNQ0U8siv7narybRyIjqLexEth5oTm_9k4UaKwHBOZ0Mrx3N5IeL0t3GfN_QsleIvPhDCt6npuYegGugfVYvgF64o-0KNG6sb679LJ6Vlblq1r-ZX0eYtF1V2nN-1QA){:target="_blank"}. Se abre en una pestaña nueva.

---

### Ejercicio 03 - Jerarquías (3)

Seguimos con el archivo ModeloEERUniversidad.erd.

En primer lugar, añade la especialización de **Estudiante** en **Estudiante_Politecnica**. Como no vamos a modelar a los estudiantes del resto de centros, la jerarquía tiene una sola subclase:

```erdiagram
hierarchy por_centro Estudiante partial

entity Estudiante_Politecnica extends por_centro {
    nif key
}
```

A continuación, añade una primera jerarquía de Estudiante_Politecnica por edad:

```erdiagram
hierarchy por_edad Estudiante_Politecnica total disjoint

entity Mayor_De_Edad extends por_edad {
    nif key
}

entity Menor_De_Edad extends por_edad {
    nif key
}
```

Por último, escribe una segunda jerarquía de **Estudiante_Politecnica**, por titulación, con las subclases **Estudiante_Informatica**, **Estudiante_Civil** y **Estudiante_Edificacion**. Antes de decidir las restricciones, ten en cuenta que puede haber estudiantes de varias titulaciones a la vez, y que en la Politécnica hay más titulaciones que estas tres.

Fíjate en que `Estudiante_Politecnica` tiene **dos jerarquías** distintas, cada una con su criterio y sus restricciones.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 03** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=zfCRJolVRQCtymOLKnt2f_XkEOxjkXNSK60F3Qq5Kd2G9643O3duMmg3us0EqmP9EmpUF8vYCDWCWCUUZ1EdQQ6b42LTsE0ICOqxQyi5WpI7kjbzB8eHOiJTF_q7ZVnGj1bmLjsvQH-DOPdO7zCZRIGRQWkIMASetOasyOh80mMuSvYcLekTgAxmgldyUJb3ki8EoJIY3a3ee5_ux4F1DQq0i6qjlDDiZidZKsJp70wB4ThPn4oZrXjga2Lh9MGBRLrpqDC5xVpg-CWnWhaoDihblWkVA3DzpHjjSPPzQqIyEVfPS6fBlzufVgPO1DI_GxcV51eHGyL7Ej_uBD892TpIbFGWIZ8q9NyUKUe7-iqJ1HOOh3topLxnGX1YJq_p5msE3nVayKWyOw){:target="_blank"}. Se abre en una pestaña nueva.

---

## Resolución del Enunciado ER 04 The Expanse Completo

Los ejercicios a continuación están orientados a resolver el Enunciado ER 04 The Expanse Completo disponible [aquí](https://github.com/bd-uex/bd-contenidos/blob/main/ejercicios/entidad-relacion/Enunciado%20ER%2004%20The%20Expanse%20Completo.md)

---
### Ejercicio 04 - Enunciado ER 04 The Expanse Completo  (1)

Abre el archivo **ModeloTheExpanseCompleto.erd**, que será donde vamos a ir modelando el Enunciado ER 04 The Expanse Completo.

Para empezar, copia en este archivo el contenido del archivo **ModeloTheExpanseV1Simplificado.erd** que hiciste en el laboratorio anterior, ya que partiremos de él.

Antes de seguir, puedes comprobar que partimos del modelo ER correcto copiando todo el contenido a continuación:


> **🔎 Comprueba tu solución del ejercicio 04** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=xfAdwpFVWQK1CuxYUveaT4qucAx9eCGRDwFZbusF298Z9MJ3dSS7GoqBCt0zLidnCx-qtA7EL8YUkdqt1WprrJOl4GgCQamN64yvyypGVXcBGeeTSFVz9AVb9Q4Ise2u61Z8kQS0pZTjenpw5BzeBFIkkoELcfdVn2HrsHEwIPxHgXM-GMxWt3Vh5npcd6SmXrNoiVve0zhnduwmMFpDwYFKpTNcWJRrLobYcSWTgUDC8UtOxrDIPE5S5PXet9D5tgfcLlK4kUe3RrHnYVte_G15O6GeqdqJv826xd-Pb5eaiJ2_H1CT4hVSLkvmbjH9Fl-EXabhxqJOjYEy-hC33GGm3HDliO2j7sJpV6IzeKgEAXEe0fhiNAQmz2AMpc1Tpd9y8JKsurNjy1LYrFd1CTIYgAhai-ehvgOmsc8LtIxtkuJ_ZYP2zpq6eZ7B4GLICEHH0Qak-Pn8ajgc82_cOx4SG1_qabZ1ZFKQWSCdvF_k5l51h3fylewbq9jl61BooDHn_5DVz_KJKZY-NNSl7E1XaUtkmIAUsRinZVACUtKWhARNbWDb-SohG3P8a4Vs41UoE2JDBDaQXLbk4L9cMW3kB0qtLSA1hh5lwtQiaK4GsGdiabIEdetP7iBNkWQ){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 05 - Enunciado ER 04 The Expanse Completo  (2)

Vamos a comenzar centrándonos en el primer párrafo que contiene cambios con respecto al enunciado simplificado:

---
Por supuesto, en este futuro brillante (o polvoriento, dependiendo del punto de vista), la extracción de **minerales** es lo más importante. Cada mineral tiene un código, un nombre y una descripción física. _Por otra parte, existen **distintas clases de minerales** (silicatos, sulfatos, nitratos, etc.) según su composición química. Esta clasificación debe estar estandarizada. Un mineral sólo pertenece a una de estas clasificaciones, aunque, como es obvio, varios minerales pueden ser de la misma clase. Además, hay minerales que están relacionados con otros, en el sentido de que si se encuentra alguno de ellos, es bastante probable encontrar los otros en algún lugar cercano. Es importante mantener la información de qué minerales están relacionados con otros._

---

En primer lugar, tenemos una nueva entidad fuerte:

- **Clase_Mineral**, con un código de clase de mineral (candidato idóneo a ser clave primaria) y un nombre. Fíjate en que el enunciado pide que la clasificación esté **estandarizada**: por eso es una entidad, y no un simple atributo de Mineral.

Tenemos que modelar también las relaciones contenidas en el párrafo:

- En primer lugar, la relación **agrupa_a** entre Mineral y Clase_Mineral. Por lo que nos dice el enunciado, un Mineral pertenece a una sola clase, mientras que una Clase_Mineral que guardemos en nuestra base de datos siempre tendrá como mínimo un Mineral.
- En segundo lugar, la relación recursiva **relacionado_con** de Mineral consigo mismo. Por lo que dice el enunciado, un Mineral puede estar relacionado con ninguno, uno o varios minerales. Como es una relación recursiva, debemos poner un rol en cada extremo; pero como los dos extremos tienen la misma cardinalidad y significan lo mismo, los roles son intercambiables, así que vamos a llamarlos simplemente "Mineral_A" y "Mineral_B".

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 05** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=xfefIpFVWYKtSmNXlWKeTTyjBkiSAJAK-Tzstir4EBpGXhoStQEsswO-hC7LxjIJioHfU3U3FzVGvSndVVtOytgUO1lyJHdKXZyZBb5FdOtgRxrjsP7SxEvEKF2p-kmYH5v6GaoTfuwA78vGkwnT5sUTUgdWqctB4FKwJGCXW-xqick0xURck8PJcv2hdH1NJwunLOaF1RkAjjs2YysBKNigOMnwrvFDurUPZVnEJwQ9QlmVlKbFmfBzpiw7vHRSaM7eBkOflN_6lyeBOcazljCzV-n_e869847UCxqgZFEX1CLwNBnCyZNEK7cwc-3ICExBOz8h5VjQVGRrqTxLg5hK08ZDHN-xMtYNk3zI1PnWtuGICMFzPyzQ7Vr-TiDFppcwg3mnxlq_zbcRnXrYNESrQqdEQUS82dwbiPuDsJTvMLLCiJwxSuRi7BojhKcYylLYdAFLbl3HW5QI1liHLmBtu9AoL3bkVtNZUGiIDMqC3CvcTD9ZLXBBNZvYMYs4oNCXSMSOu2hMHN8bzIVcK1UJl57IrG-0nm9kQ8-W528TdECeOvh_pGYgC7Ew_A_O9-glevnTLRtqFn_EDkJ8B5CF2_OWpiJKDKKDsDPE7en1COVOnf_rds6sLrPEik4UTankZFRHz71PbIe8tpWrDg-ZXcG-uCmJ1fru3GeMmWXG4Hx5Bambem3vSYs525WWLDlFWhebq_iINZd2){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 06 - Enunciado ER 04 The Expanse Completo  (3)

Vamos a continuar con el siguiente párrafo que contiene cambios con respecto al enunciado simplificado:

---
_La OPA no solo cuenta con naves espaciales, también dispone en cada planeta de vehículos de distinto tipo: vehículos para transporte de personal por la superficie de un planeta, vehículos específicos para la extracción de minerales, etc. Al igual que de las naves espaciales, cada vehículo está identificado por su matrícula, y se almacenan detalles sobre su modelo y también es clave saber en qué planeta está asignado. Todo lo relativo a la gestión de las operaciones y los transportes que se realizan con el resto de los tipos de vehículos no se incluirá de momento en la base de datos._

---

En primer lugar, nos hablan de los vehículos, y podemos ver que hay muchas similitudes entre Vehiculo y Nave_Espacial:

- Los dos tienen matrícula y modelo.
- Los dos están asignados a un Planeta.

También podemos ver algunas diferencias:

- Nave_Espacial tiene el atributo capacidad, que no tiene un vehículo cualquiera.
- Nave_Espacial es el único tipo de vehículo que realiza Vuelos.

Todo esto son pistas de que **Vehiculo es una generalización de Nave_Espacial**: tiene un subconjunto de sus atributos y de sus relaciones. Y como los demás tipos de vehículos (de transporte de personal, de extracción...) no tienen ningún dato ni relación propios, no crearemos subclases para ellos: serían subclases vacías.

Por tanto, debemos modificar el diagrama para:

- Añadir la nueva entidad fuerte **Vehiculo**, con `matricula` como clave primaria y `modelo`.
- Declarar la jerarquía **por_tipo_vehiculo** de Vehiculo. Como Nave_Espacial es su **única** subclase, ya sabes qué restricción de completitud tiene, y que no lleva restricción de disyunción.
- Modificar la entidad **Nave_Espacial**:
    - Pasa a extender la jerarquía `por_tipo_vehiculo`.
    - Como atributos, solo mantiene la clave primaria (`matricula`), que comparte con Vehiculo, y `capacidad`, que es exclusiva suya. El atributo `modelo` pasa a estar solo en Vehiculo: Nave_Espacial lo hereda.
- **Eliminar** la relación `asignada_a` entre Nave_Espacial y Planeta, y crear en su lugar la relación **asignado_a** entre Vehiculo y Planeta, con las mismas cardinalidades. Nave_Espacial hereda esta relación al extender a Vehiculo, y mantenerla también en la subclase sería redundante.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 06** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=xfeZIpZVWcKtSmNXlVggY4BhPVzq8lN5p2JtdCWWiwo0svWo5qjesZgnQpLzSeWtOTOPJNn6nNtJukreZm4uu4gh2DT7NNRXZtKZp2hLl1MjMVoP6JHx-zk48TbdHDaXAaaqQtXRX5guNTyeeGBl8Ftz5V4EBdzH62lJXPRZdn7eQ_obd3d6dWbRHBYcs7F-0KiQUZB_2VGugTq-VX57rrf3Qa56P_QyW0RkgQraMUXGozswBn0JkG-7IKLQzZTUPIQJ82LI4Cpied_XJZNkWCLLU-sU8Eew_1bY0DQDCPywuzBki553Oy7-p9gNgbrp8gHme_0K93XYZkEuCLX8b2YwlIlwRw1KC0JnWylVR98iK8-JyrmO_rXpIirhg6MSIYVubJaM95wPt8poGTtZKtkWW95CmbxkD96Rxw2Pk1PV4Dd6zDqYrlI0JrmRRqlqXiac9hKBnItZfTHeoBRP4CMFqlqKWUzDc2GJiUC4pvVUyvCN2mNEj_KeIvIvf2x1HIMoEdfsliAM9hbK8a1f-zMKkKh2lQWbWFpx1KBe2F4CvdN5Ondd9SepTE9je3g_QNCXYkyKfoGGcv-7txdB_in29z-yI5Rl50WIXjqrghrl1k9QYZ8ddzAspFCXq4Ob9m_TrmvHTOuYRD_waL-aE7puxThnfQ2ovhCaeh6QrSpzxMp3LCLI45VzlqRFsWXRHwVCYXUabP3f5ByFvDk-lvGMl7G2GSzk4cbJiZ56Nw-XDTs_Y3ohII3qq2DlbWsdZcLQlLAMsNzNKX2ZxwjC5O6TcqyqGz2frkb-a51_){:target="_blank"}. Se abre en una pestaña nueva.

---

### Ejercicio 07 - Enunciado ER 04 The Expanse Completo  (4)

Vamos a continuar con el siguiente párrafo que contiene cambios con respecto al enunciado simplificado:

---
_Como otra gran novedad, la OPA, siempre buscando mantener el orden en sus operaciones por todo el sistema solar, también necesita llevar un control detallado del **personal** que trabaja en sus centros mineros. Así, cada persona de la OPA está identificada por un número único de personal y se registran datos como su nombre completo, pasaporte (ya sea de la Tierra, Marte o algún otro), la fecha en la que se unió a la OPA, el centro minero al que está asignado, y su puesto (que puede ser desde directivo, astronauta, técnico de extracción, o hasta incluso uno de esos conductores que maniobran cargueros por los túneles de las minas). Además, cada uno de los **centros** debe tener un coordinador. Este coordinador, por supuesto, solo puede ser alguien con un puesto de directivo de la OPA, y solo puede estar al mando de un centro a la vez. La OPA necesita saber, y con precisión, desde cuándo este directivo está a cargo del centro y nos dicen que no es necesario saber qué Directivos pudo tener anteriormente un Centro. También es necesario saber qué astronautas fueron los afortunados en pilotar los vuelos teniendo en cuenta que varios astronautas pueden pilotar un vuelo._

---

En primer lugar, parece claro que vamos a tener una nueva entidad fuerte para representar al personal:

- **Personal**, con un número de personal (candidato idóneo a ser clave primaria), pasaporte (también candidato a ser clave primaria, pero lo dejaremos como **clave alternativa**), nombre completo (como no nos dan más detalles, lo dejaremos como un único atributo), fecha de alta y puesto.

Asociada a esta nueva entidad tendremos la relación **trabaja_en**, para almacenar en qué Centro trabaja cada miembro del Personal. Por lo que nos dice el enunciado, una persona trabaja en un solo Centro, mientras que un Centro que guardemos en nuestra base de datos siempre tendrá como mínimo una persona trabajando en él.

Después, nos indican que todos los centros deben tener un coordinador que solo puede ser alguien con un puesto de directivo, y que es necesario saber qué astronautas pilotan los vuelos. Es decir, hay **dos partes** del Personal que tienen relaciones que no tiene el resto:

- Los **directivos**, que coordinan centros.
- Los **astronautas**, que pilotan vuelos.

Las dos subclases salen del **mismo criterio** de clasificación, el puesto, así que pertenecen a **una sola jerarquía**, que llamaremos `por_tipo_personal`. Para decidir sus restricciones, piensa si una persona puede tener dos puestos a la vez, y si hay puestos (técnico de extracción, conductor...) que no tienen subclase.

Las dos subclases solo se distinguen del resto del Personal por sus relaciones:

- **Directivo**, con la relación **coordina** con Centro. Además, necesitamos almacenar en la relación la fecha de inicio de la coordinación. Las cardinalidades se deducen del enunciado: todo centro tiene un coordinador, y un directivo solo puede estar al mando de un centro a la vez.
- **Astronauta**, con la relación **pilota** con Vuelo. Por lo que nos dice el enunciado, un Vuelo puede tener varios astronautas pilotándolo, y siempre tendrá al menos uno, mientras que un Astronauta puede no haber pilotado todavía ningún vuelo.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 07** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=zfUdI5FVWcKtznw0jRnEpdBuuPZI3vms66dIRnrtGpaawRqFtzmqnOzLCvV-vQw_Rg_phVx6pjkLYSjfakJR--oZJix3Gw1Q1DNtFJk9WHGpViNkQNHUhsmKWBZT9Ckd1YXaeuaLpAFXpoLjAhXIVNUogxS6z0VK4rkEzwd1DP78SxAVW523GTf0IsIjDE1Wz9IEJOvvlXGoHf0s0rFdb4-q8sxTNm8Mx25izwukZnIyGrVRImf2tHuQxMoQWDZul4ZzIgNS05EZkf0kV3DaJTiyocXMfQ8FF4x-88Idbr0LEfoV2-PfD_YZEVGQs7GivBn5AnVCQqc4gbX9JCtpb_uq0dUJSdPMTcNh3bty2ndo9RQEbKDFcsm8tds3zzQpoXXczZ1oEqpR8tQ87KlllqnSiwXcUeQ2YrGp6gQfMYtf3otJ5Kyjf6ESFhzGN0NC7e01-AORdwIXfJ-yvep0YuQiCxpyqky92TCKEkiA0mKvcDGglUCdQiiESO367iaQcs9NcH599aY7R29tZAmBM7MrNm-e__DCcNboy9xNByDypxpLi-MtSqTwKLYYs2EEImOeC-hS5oEMKoZtm7QR1JvIt2zqhgRatNH39VvRKq2YCYOcmtDsS14iFNZ6Rd0IzZknpCY0J-dawDEAMRmLZQkCSvUZ2jRnz7N7UAVKiHJSfMhzO3QGyVfj9LmhnfIw-vDkYmUrE1IPbxZPO3onk074-XkdDY8yfQ_2eArbX-aP3HwlGtsMrWrVyoQOLDoWMY3R_ygufWQ4y1tFrs9fnL7KLdJ8yKUgIu634Q9A6AkV2BG9JqS58OeLudPl6RFJToEpDJ89LywyYKUkEZlfSE5vUXxLEyRJuPDQOQRQJRGaGjTF4EcqgybLMopJfbkO398vp_PGdz6DJ1d-ORxRsncEamUcFVK52_xTjHsFL8DlnEeErJO6wDTHj5awL3-5f9Fp6mmmdFc5_VrViU40665j){:target="_blank"}. Se abre en una pestaña nueva.

---

## Resolución del Enunciado ER 07 Naves no tripuladas de la OPA

Los ejercicios a continuación están orientados a resolver el Enunciado ER 07 Naves no tripuladas de la OPA disponible [aquí](https://github.com/bd-uex/bd-contenidos/blob/main/ejercicios/entidad-relacion/Enunciado%20ER%2007%20Naves%20no%20tripuladas%20de%20la%20OPA.md).

Es un enunciado más largo que los anteriores, porque repasa casi todo lo que hemos visto hasta ahora: entidades estandarizadas, relaciones recursivas, entidades débiles, históricos y, por supuesto, jerarquías. Lo resolveremos en seis pasos, de forma que al final de cada uno tendrás un modelo completo y correcto con lo que llevemos del enunciado.

---
### Ejercicio 08 - Enunciado ER 07 Naves no tripuladas de la OPA (1)

Abre el archivo **ModeloNavesNoTripuladasOPA.erd**, que será donde vamos a ir modelando el Enunciado ER 07 Naves no tripuladas de la OPA.

Vamos a comenzar centrándonos en los párrafos que describen las naves y su desarrollo:

---
_Para empezar, de cada nave no tripulada hay que almacenar el código que la identifica, su nombre, peso, longitud, anchura, velocidad teórica que puede alcanzar y la capacidad prevista._

_Es muy importante saber la etapa actual de desarrollo en que se encuentra cada nave y desde cuando. Las naves se desarrollan siguiendo una serie de etapas estandarizadas (1.  Conceptualización inicial, 2. Diseño, 3. Modelo a escala,.., 9. En producción) de forma secuencial, es decir, cada nave solo pasa por cada etapa una vez a lo largo de su desarrollo. De cada una de estas etapas habrá que guardar su código único y su nombre._

_Además, la OPA nos ha pedido que, para la correcta gestión de su planificación, también es necesario mantener en la base de datos las etapas completadas por las que ha pasado cada nave almacenando la fecha de inicio y la fecha de fin de cada etapa completada._

_Hay que tener en cuenta también que hay algunas naves que han surgido como evolución de otra previa (sólo de una) y esta relación desea conocerse. Hay que tener en cuenta que una nave puede haber evolucionado hacia varias naves diferentes._

---

En primer lugar, tenemos dos entidades fuertes:

- **Nave**, con un código (candidato idóneo a ser clave primaria), nombre, peso, longitud, anchura, velocidad teórica y capacidad prevista: `codigo_nave`, `nombre`, `peso`, `longitud`, `anchura`, `velocidad_teorica` y `capacidad_prevista`.
- **Etapa_Desarrollo**, con un código de etapa (clave primaria) y su nombre: `codigo_etapa` y `nombre_etapa`. Fíjate en que el enunciado dice que las etapas están **estandarizadas**: por eso son una entidad, y no un simple atributo de Nave.

Tenemos que modelar también las relaciones contenidas en estos párrafos:

- En primer lugar, la relación **en_etapa_actual** entre Nave y Etapa_Desarrollo, con la fecha desde la que la nave está en esa etapa (`fecha_desde`). Por lo que nos dice el enunciado, una Nave está siempre en una sola etapa, mientras que en una etapa puede no haber ninguna nave en este momento, o haber varias.
- En segundo lugar, las **etapas completadas** por cada nave, con su fecha de inicio y de fin (`fecha_inicio` y `fecha_fin`). Aquí hay que decidir si es una relación M:N o un histórico con una entidad débil. La clave está en la frase _"cada nave solo pasa por cada etapa una vez"_: como una misma pareja de nave y etapa **no se repite**, no hace falta ninguna entidad débil, y basta con una relación M:N con atributos, que llamaremos **completada_por**. Una nave puede no haber completado todavía ninguna etapa, y una etapa puede no haber sido completada aún por ninguna nave.
- Por último, la relación recursiva **evoluciona_de** de Nave consigo misma. Una nave puede haber surgido de otra como mucho (o de ninguna, si es un diseño original), y una nave puede haber evolucionado hacia ninguna, una o varias naves. Como es una relación recursiva, necesita un rol en cada extremo: en este caso los dos extremos no significan lo mismo, así que los llamaremos "Original" y "Derivado".

Fíjate en que la etapa actual y las etapas completadas son dos relaciones distintas: la etapa actual todavía no ha terminado, así que no tiene fecha de fin.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 08** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=3eyRAolVRQCtzmNdFVahT7U33thFzXcv8wegfKUf_tPwaag7LmIA4ftAMrk6GzUeTKJ4fKFyI6wX0GXvWmj_vhd5yP8YfWehyQ6o_JgnOuPlBhdv0TXBM_5kRIaeUguB2Oq7rXPpwVMVL3ma1nyHNRWsxlBy9sTBrpYz_tLdAj719xExFYbKdwYALjpCto29j0kIkPFLzhxSstfYKGcWwzFQXJT25aqh1kWOsdRJprSxCkc6pL_jr6n3aJtmsjI86CAL0umiWUoOVJBp205kKloH2SPO5Jc6gfoXx6bVZ_ebiqTbJDvQAkjQ8mwY2QPic2n9rPKMXhK_MA){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 09 - Enunciado ER 07 Naves no tripuladas de la OPA (2)

Vamos a continuar con los párrafos que describen a los empleados:

---
_La OPA quiere que la base de datos mantenga la información de todos sus empleados (ingenieros, astronautas, directivos, mecánicos, administrativos, etc..) involucrados en el desarrollo de las naves y la realización de las pruebas. En concreto quiere almacenar su número único de empleado, nombre, apellidos y su categoría profesional._

_Cada nave tiene un único ingeniero aeroespacial como empleado responsable de su desarrollo, que solo es responsable de esa nave._

---

En primer lugar, tenemos una nueva entidad fuerte:

- **Empleado**, con un número de empleado (clave primaria), nombre, los dos apellidos y su categoría profesional: `numero_empleado`, `nombre`, `apellido_1`, `apellido_2` y `categoria_profesional`.

Después, nos dicen que cada nave tiene un ingeniero aeroespacial responsable. Esta relación no la puede tener cualquier empleado, sino solo los ingenieros aeroespaciales: es una pista de que necesitamos una **subclase**.

- **Ingeniero_Aeroespacial**, que extiende a Empleado a través de una jerarquía que llamaremos **por_tipo_empleado**, porque el criterio de clasificación es la categoría profesional. Por ahora es su **única** subclase, así que ya sabes qué restricción de completitud tiene y que no lleva restricción de disyunción.
- La relación **responsable_de** entre Nave e Ingeniero_Aeroespacial. Por lo que nos dice el enunciado, cada nave tiene un único ingeniero aeroespacial responsable, y cada ingeniero aeroespacial solo es responsable de esa nave.

¿Y el resto de categorías (astronautas, directivos, mecánicos...)? No tienen ningún dato ni relación propios, así que no crearemos subclases para ellas: serían subclases vacías, y la categoría ya queda recogida en el atributo `categoria_profesional`.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 09** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=3TERAklUWfitG8uoC10k3sCp0U-vZP3ODtKHLAaZm4d-N5CTG7cHDhkUB4Ba7krB04lZFs-7acyF4NkSqlAvowQ9gxZuUlg25IxYPXql73mWe7OIGU7DT7Cy8vzTgJzE5e_I6Fwk7eF-yLN22RoD5qXrEVAzlWPnaolEnEK2RcPaQPVAh4ILumxzbc2icPlc0p_mzi8fsSFJJmOzMsMZUxXg7FESFSzE8tNArV8pHemb9un0c3Qu3g2XmiMfzBWZ0ZbIcNQ1bq0h8GVoDmCuUSP-THxZ9nZ9Quat0Vn4QUgXoZWF26uJONr5yiQpeDIcFZRGhiLkH2c6qcV8D0fIsxQ_jM-168PDXGVFCMETfUNBIHBjPJvu-ZjtWhVJPjPtmnkDvVHvPQPqkMet-lw5fZVgxfHDbc9NgO60S9W8B1KNwVrquDJ1XD77oUj_Fak124BoWRlxG7RewEG5GINBrymWjfOyCc9r){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 10 - Enunciado ER 07 Naves no tripuladas de la OPA (3)

Vamos a continuar con los párrafos que describen a los ingenieros de software:

---
_Entre los empleados, también están los ingenieros de software que se caracterizan por estar asignados a una nave. Es necesario conocer la nave a la que está asignado un ingeniero de software en la actualidad y desde cuándo, teniendo en cuenta que en un momento concreto un ingeniero de software solo está asignado a una nave mientras que una nave puede tener asignados varios ingenieros de software._

_La asignación de ingenieros de software a las naves, sin embargo, va cambiando a lo largo del tiempo. Por este motivo, la OPA quiere tener constancia también de todas las asignaciones a otras naves que puede haber tenido un ingeniero de software a lo largo del tiempo, junto con su fecha de inicio y fecha fin._

---

Los ingenieros de software también tienen relaciones que no tiene el resto de empleados, así que necesitamos otra subclase:

- **Ingeniero_Software**, que sale del **mismo criterio** que Ingeniero_Aeroespacial (la categoría profesional), así que extiende la **misma jerarquía** `por_tipo_empleado`. Ahora la jerarquía tiene dos subclases, así que tienes que revisar sus restricciones: piensa si hay empleados que no son de ninguna de las dos, y si un empleado puede tener dos categorías a la vez.

Tenemos que modelar también la asignación actual y el histórico de asignaciones:

- La relación **asignado_a** entre Ingeniero_Software y Nave, con la fecha desde la que el ingeniero está asignado (`fecha_desde`). Por lo que nos dice el enunciado, un ingeniero de software está asignado en cada momento a una sola nave, y una nave tiene asignados uno o varios ingenieros de software.
- El **histórico de asignaciones**, con su fecha de inicio y de fin (`fecha_inicio` y `fecha_fin`). Esta vez, a diferencia de las etapas completadas del Ejercicio 08, nada impide que un ingeniero vuelva a una nave en la que ya estuvo, así que la misma pareja **sí puede repetirse**: necesitamos una entidad débil, **Asignacion_Historica**, con la fecha de inicio como clave parcial.

La pregunta clave es: ¿de qué entidad o entidades depende Asignacion_Historica? Piensa si un ingeniero puede empezar dos asignaciones el mismo día, y si una nave puede recibir varios ingenieros ese mismo día. Como un ingeniero solo está asignado a una nave en cada momento, para distinguir una asignación basta con el ingeniero y la fecha de inicio:

- Asignacion_Historica depende solo de Ingeniero_Software, a través de la relación débil **es_de**. Un ingeniero puede no tener todavía asignaciones anteriores, o tener varias.
- Con Nave se relaciona mediante una relación normal, **ha_tenido**: cada asignación es a una sola nave, y una nave puede no haber tenido ninguna asignación anterior, o tener varias. Si la hiciéramos depender también de Nave, dependería de más entidades de las necesarias.

Fíjate en que, igual que en el ejemplo de la Asignación Departamental de Empleados del Tema 5, mantenemos la relación con la asignación actual aunque podría deducirse del histórico: así el histórico solo guarda asignaciones terminadas, y no tendremos fechas de fin vacías en todas las asignaciones en curso.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 10** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TAdI5FVWfm5Z2HPVSklkdBhTfxX80gybjLo4wrv-Gxa97xgop-KQ4v-7pXGrDJ5uTIuo9sZE_VGvakgHxPY4KL_cF2xKhM8VVuPIjdhqQo5zIac6R_40BD62dPkwZyGW41bqjOeeRzMMUrh4ReMHroP6cx9CHIUjA1TQAa1ucp8B1aYCuVUScANrHK3rwKwG-FQtltG3fQxDNz02w6yK1BQ1exhCJDSwHJWYlbsh89LGiI7BXrDj7d2tAv8_W7jxqiF6nbJhPDiHS_9UR6QlbBT0UlXPavJ-2Sn7qvncnBTCaK_VB8j2WPGsL_nuhmzAehPDkccJc9gSt3mKft7mtOGlWqZu4rbZKyk9V84hTkLd4Y0Csp5XkAKLuCXHimzaM1jLYkn9ccyvVitFy3ga0Rzg6IfBYTNgKmjpyZ0GkoeOtrz0hlvnr7WcoL22W7uYKXMVTpvKmO2BjfX3qmdqwhmMyxVhIylh2yiiJFc_OXfmijnbGZo-b_5HKzjlCw_WfJKQ9xQ2VuPRdvplx2meYPYEzQbxo7DAKsq090mH6vnH81JudXC_wEsT1dPCIDqFg6hcdGmDevLv1a7zotFOhIsxkenEWjzOwKkKQ){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 11 - Enunciado ER 07 Naves no tripuladas de la OPA (4)

Vamos a continuar con los párrafos que describen los prototipos y las pruebas:

---
_La norma de la empresa es que de una nave se fabrican varios prototipos para pruebas. De los prototipos, además de la nave de la que es prototipo, debe saberse su número de serie único que lo identifica, su número de transpondedor (también un número único para poder circular en el espacio) y la fecha de fabricación._

_Hay que guardar las pruebas que realizan los prototipos. Todas las pruebas tienen en común que se identifican por un número único y hay que saber qué tipo de prueba es, la fecha de la prueba, la hora y la duración de esta junto con el prototipo que se utilizó y qué empleado supervisó la prueba (las pruebas pueden ser supervisadas por cualquier empleado). Además, hay que almacenar un informe con las conclusiones de la prueba._

_Además, para el tipo de pruebas extraplanetarias (entre dos planetas) hay que tener en cuenta también que necesitan obligatoriamente que un astronauta vaya dentro del prototipo vigilando que este se comporta correctamente. Hay que recalcar que los astronautas probadores no están asignados a los prototipos, sino a las pruebas extraplanetarias. De las pruebas extraplanetarias también es necesario almacenar el número total de kilómetros recorridos y el consumo de combustible realizado._

---

En primer lugar, tenemos dos nuevas entidades fuertes:

- **Prototipo**, con su número de serie (clave primaria), su número de transpondedor (también único, así que será una **clave alternativa**) y su fecha de fabricación: `numero_serie`, `numero_transpondedor` y `fecha_fabricacion`.
- **Prueba**, con su número de prueba (clave primaria), su tipo, fecha, hora, duración e informe: `numero_prueba`, `tipo`, `fecha`, `hora`, `duracion` e `informe`.

Y sus relaciones:

- **es_prototipo_de**, entre Prototipo y Nave. Cada prototipo es de una sola nave, y de una nave se pueden fabricar varios prototipos, aunque una nave que esté todavía en sus primeras etapas puede no tener ninguno.
- **utiliza**, entre Prueba y Prototipo. Cada prueba utiliza un solo prototipo, y un prototipo puede no haber hecho todavía ninguna prueba, o haber hecho varias.
- **supervisada_por**, entre Prueba y Empleado. Cada prueba la supervisa un solo empleado, y un empleado puede no haber supervisado ninguna prueba, o varias. Fíjate en que el enunciado insiste en que la prueba puede supervisarla **cualquier** empleado: por eso la relación es con la superclase Empleado, y no con una subclase.

Después vienen las pruebas extraplanetarias, que tienen datos y relaciones propios que no tiene el resto de pruebas, así que necesitamos una nueva jerarquía:

- **Prueba_Extraplanetaria**, que extiende a Prueba a través de la jerarquía **por_tipo_prueba**, con los kilómetros recorridos y el consumo de combustible (`kilometros_recorridos` y `consumo_combustible`). Es su única subclase, porque el resto de tipos de prueba no tienen nada propio. Por eso, además, mantenemos el atributo `tipo` en Prueba: sigue haciendo falta para saber de qué tipo es cada una de las demás pruebas.
- **Astronauta_Probador**, una nueva subclase de Empleado. Como sale del mismo criterio que las anteriores (la categoría profesional), extiende también la jerarquía `por_tipo_empleado`, que ahora tiene tres subclases. Sus restricciones no cambian: sigue habiendo empleados sin subclase, y cada empleado tiene una sola categoría.
- La relación **es_controlada_por** entre Prueba_Extraplanetaria y Astronauta_Probador. Cada prueba extraplanetaria necesita obligatoriamente un astronauta, y cada astronauta probador ha participado al menos en una prueba extraplanetaria. Fíjate en que el enunciado aclara que los astronautas no están asignados a los prototipos, sino a las pruebas: por eso la relación es con Prueba_Extraplanetaria, y no con Prototipo.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 11** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TYdI5FVWfmlZ2HLVSklkdBhTfxXs0Cc8xhtLABo_fz4MiKW5I4qW2YLmCHYmYPVHLq_cdjqYc5nmGxsl-F-9MWEVMWSGmWGTUGi6jRfp8eC8OrKd8-y0RB6cMA2x6V3Iuwfaazc_ECJAQmSEAS_JRrOfUOqqPtRatdUTFQQkqTUTzT24uRVGXY4h19ELO5SuVx1ROrKZcZKC64lS-w8KQrZMMpaEXDv-pPJphVjSQI6oqV0c96OM6nFnOtYi-tu6778m9Hep6ZU_WfCpxwiTz3bWUJZPYXFp8_5va98ynJJgQEsARvMh9xtAv4fImGticuPpqb-BQlc7DBXXz6bGQdL5EuBAiJdNEUYR_ZM-EkrS_0jUXGDPMqugUJmAN1iu66kvTe6msB3O-h4oC_fF_-o9HcIZGT_ZSUxAsBEMXfaa3DFikwetUWjdvqasYSmeSjrCCvpjHCiJFdQlkLNzixezTUXYDYkXZEbTkkYYg7-hjm6lEV61zg-xgiFGSlOkVRBRdsPWtJ3xHZbG8bPpfGW__a9ZLQat1pGfQ5CxrAcUsX9NjtNt5KmmvV5UnVjKDD3CieUOnb5mvdUjfM1369tJA4F816o9gvGla4OIG3MWycsEJ3dBuGtv3Px9Jzw4AsJGKGMMs-h7Mi8Vu0nd_hSK_Mpf0kxZi-ftMo7fG3BTgZ8H33vnANSL2_W4IDAq047F6MxsEOwa_8Q28eJCt4dkR0TI0ogT3rmrEQrlHjwj3kCHbtJoXLjar7reYNphoSMlyYzX7mrAWByZWpARpERzo71LiMLzCsltDN_SVhxqOGz052Ncu49XiN5ZwZAF77owAO9Ft8C72Eh8rmjWKPvAVe8LI3Z6NJVkwPAHKZJaaxL){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 12 - Enunciado ER 07 Naves no tripuladas de la OPA (5)

Vamos a continuar con el párrafo que describe las incidencias:

---
_Durante la realización de cada prueba, a veces, pueden haber sucedido diferentes incidencias que deben ser registradas. Así, para cada prueba hay que saber todas las incidencias que se pudieron producir durante su realización. En concreto, es necesario saber el número de incidencia dentro de cada prueba en particular, junto con una descripción de la incidencia, la fecha y la hora en que se produjo y el grado de gravedad de la incidencia._

---

La frase clave es _"el número de incidencia dentro de cada prueba en particular"_: el número de incidencia solo es único dentro de su prueba (la incidencia 1 de una prueba es distinta de la incidencia 1 de otra). Es decir, una incidencia no se puede identificar por sí sola, y además no tiene sentido sin la prueba en la que se produjo:

- **Incidencia** es una entidad débil, con el número de incidencia como clave parcial, su descripción, fecha, hora y grado de gravedad: `numero_incidencia`, `descripcion`, `fecha`, `hora` y `grado_gravedad`.
- Depende de Prueba a través de la relación débil **sufre**. Cada incidencia es de una sola prueba, y en una prueba puede no haberse producido ninguna incidencia, o varias.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 12** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TYdA1ZUWfmtn-HO0eCNFVlq9D5iIL9V4_jyDgUpYT-6B0Zkr9oCjY7eFaSUtH6tnN-nIHUeBWgDFTndzRiC42xEGIi09kQ6zmuPwjjVHNrOtl2gG9j50BD62dPowZzfVx9-fYWQE_ReMy9YZbPt7IS7okyUiU_FMO7KFSFi_wCYIfbBUG2FAsHQ9xTgobjfrkkRTDfsRACaCXc9owhon4JlY8jqTgyBXzXsyN-kMxxTzZOFk7goHO1fh6OLk0qXjZoqMTQ6C5jg6ejAelmd7l20kS1Ibm_0vi8bz3tUwGkTX1ggg6omnPFbZcetPnVyt4nndrNDAdVFRzs-7Wahm3VpvY24rCjCH630g0e6uY9OKbvXUOBgWuA79PDiusIrLV0usJKQZiWHcsn1kmIwmLtRucIaJZmqGzV_60p4C8ByYRhuOq8HuIPUElU8j1lzNQpHZMZUzkLe8s7yvLJWhuewyZofVVOyUwZnUedZVYblPzajRpdv7iXPgwG80hReLHTBXOOXNR0Bx7jqRb_qpwuc9jdVdEsQ5cbLtgQnumFEMEmH3fxkSy8JVM4DEIHMZxU6mFyac_fv2nsPVUDgsifDQzb4OTWDn0lyEbDvCK-U2lOviCJBXq6EX-5mCKXLFajyVgVaTlikPvI68T20zUrQpxfsuwQDsE5GepiAaV6Jg1aKQCZOfwr8Qcv0Bok_5wY9b-fPqQQ8-zu5FSLAhoFMaGaBjejoHNk4rYqfi0rEXpW9gP73WCSKbi-6dA4sDa3NgWzAhRMNeUlOkuwTRraQRLIX11I2HlN7-Dik40YJ7Y2DjqLzIi-It0JTpZWv8HhHfUMePVaqa4h7BkfviWwAhMo3dyMPF6zPqu2C0dCheUoCvdBiIJMr86Lkjqs64k4Wb17rWx4yaEwPbSFRNeQDx3sKCePGIVNl4Iv17n0b-qZz){:target="_blank"}. Se abre en una pestaña nueva.

---
### Ejercicio 13 - Enunciado ER 07 Naves no tripuladas de la OPA (6)

Vamos a finalizar con el párrafo que describe las revisiones:

---
_La OPA tiene como política realizar cada día revisiones periódicas a varios prototipos. Así, debe poder saberse en todo momento las revisiones que ha pasado cada prototipo. En concreto, de cada revisión pasada por cada prototipo hay que saber la fecha de la revisión y un informe con el resultado de la revisión. También es necesario saber los empleados que han realizado la revisión, teniendo en cuenta que cada revisión es realizada por varios empleados y que un empleado puede realizar muchas revisiones. Como algunas revisiones pueden ser debidas a algunas de las incidencias que se producen durante las pruebas, la OPA también quiere almacenar si una revisión es debida a una o varias incidencias. Hay que tener en cuenta que puede haber tanto incidencias que no den lugar a revisiones como otras incidencias que provoquen varias revisiones._

---

Las revisiones no tienen ningún identificador propio: se distinguen por el prototipo y la fecha en que se hacen. Como la OPA hace las revisiones **cada día**, un prototipo pasa como mucho una revisión al día, así que la fecha basta para distinguir las revisiones de un mismo prototipo:

- **Revision** es una entidad débil, con la fecha de la revisión como clave parcial y el informe con su resultado: `fecha_revision` e `informe`.
- Depende de Prototipo a través de la relación débil **pasa**. Cada revisión es de un solo prototipo, y un prototipo puede no haber pasado todavía ninguna revisión, o varias.

Y sus relaciones con otras entidades:

- **realizada_por**, entre Revision y Empleado. Cada revisión la realizan uno o varios empleados, y un empleado puede no haber realizado ninguna revisión, o muchas. Como cualquier empleado puede realizar revisiones, la relación es con la superclase Empleado.
- **debida_a**, entre Revision e Incidencia. Una revisión puede no deberse a ninguna incidencia (las revisiones periódicas), o deberse a una o varias, y una incidencia puede no haber dado lugar a ninguna revisión, o a varias.

Fíjate en que Incidencia, aunque sea una entidad débil, puede participar en otras relaciones como cualquier otra entidad.

Escribe el texto BigER necesario para modelar todo esto y visualiza el resultado en el diagrama en VS Code. Antes de continuar, asegúrate de entender cómo se está representando gráficamente todo.


> **🔎 Comprueba tu solución del ejercicio 13** en el [comprobador de respaldo](https://aeprieto.github.io/erd-checker/erd-checker.html?c=_TUdA1ZUWfmtn-HO0eCNFVnqGqka749nAKFeh6zON6yEqnwcgBr6dp1v3UsSv2t1v16Lg9Qg5EDHcMDI0jHkv8xDQbdFI61lrKm6EOFKAjQCtCAIv9kEDmvz_3y0ShSgocreNWQS17FzUI2MgqxE2no4b8x94h_kfC-4x0N_BWk0QoMIR2E95gPAIUejkvbpr_dwzPShXWauLCbTAsrOJznhSQ6asAyBQTXsyNukMxxVzZWFk7jrnyyfhqKLs1aXvZomNzQyqjTN1mmsAMDrzmY_VstDSb2EsE-hg698ynJJgQEsBRvMh9NtDP4fImGtaTTvmYMy9MZ-iPrs1uPD4X4yuETcKrt2rtaFGkoFBUHmSP3jAHGDnAdnU3tj6XCFqh-qtPSIMobAtSlxg0mV4ocGgk_r5c2H0TpFTDNs4rpyYRhuOq8HuIPUblU8jVFzNQpHZMZUzkLe8q7yvLJGhoewyZsfVVOyU0ZnEefZXt472p6SUIEwFo3Rzqkb600OoC4UDu6n1iFP3SI9_Fi0NDie-6I3Je0T7-ribFTvGTH2-7r9NjtN9yn7AJHk_Rol7MoD7_ydYt0PZb6-udUKqi9jzZzZgE8ymK2-BwTJ6l8e_2t8ZxkR5ZN-AvQrtDQRCNd85riR5oYz3tm9Vu0nd_hSK_Mrf0mR0T8SF7bTxN-YaSd8H33PHGUByno4noDPi047ZyMxsEOwS_8E28f5Ct4dEeNmxlr2RJXUwKuv4kR4JNqf31ISrSRKaS-7dD4sPa39gSzAhdtcoykGgkXSXnyEebDxAaKg-vRNatfUMl_if4vDw-oAjZhA0N0A1s6NAVR-LliTBWGSB6tNqhIrxSml-EGxQbmS6AgmD3qZRnODVmTSpE46jOAHXd1veaK3NDjcCmKRWx4zaEgPbWFRCeQDh3sKyaPGEVPl4AuzjdQVzjmz3JpZVDkFNzGwcbT8FyUPHVlFlyZIS1RrsSyesltiKRBs6M_5dwMVxRjSe1gnB_ETqi7VPSMCrWk){:target="_blank"}. Se abre en una pestaña nueva.

---

¡Enhorabuena! Has modelado correctamente los diagramas Entidad Relación de los enunciados Enunciado ER 04 The Expanse Completo y Enunciado ER 07 Naves no tripuladas de la OPA.

![](https://raw.githubusercontent.com/bd-uex/bd-contenidos/main/imgs/BD%20-%20ERD%20resuelto%20por%20Bender.png)

Imagen generada por IA (Gemini Pro 2.5)

---
