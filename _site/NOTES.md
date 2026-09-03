# Notas técnicas — Cantapueblo

Referencia de trabajo para seguir editando el sitio. No es para gente de
afuera del proyecto — el README público está en `README.md`.

## Pendiente

Nada bloqueante por ahora. Contacto ya tiene Email, Instagram, Facebook y
Ubicación reales (se sacó el campo de teléfono/WhatsApp).

## Estructura de archivos

- `_config.yml` — configuración del sitio
- `_layouts/default.html` — plantilla compartida por todas las páginas
- `_includes/nav.html`, `_includes/footer.html` — header y footer, escritos una sola vez
- `assets/css/style.css` — todos los estilos
- `assets/js/reveal.js` — animación de scroll-reveal
- `assets/js/header-shrink.js` — logo grande que se achica al hacer scroll
- `assets/img/carousel/` — las 15 fotos del carrusel de Historia
- `assets/data/programa.json` — datos de los coros en Programa (bento grid)
- `es/`, `en/` — el contenido de cada página, por idioma
- `index.html` — redirige automáticamente según el idioma del navegador

## Estructura de sección (al agregar contenido nuevo)

Cada `<section class="section">` ocupa todo el ancho de pantalla. El
contenido va siempre adentro de un `<div class="section-inner">` para
quedar centrado con el mismo ancho que el resto del sitio:

```html
<section class="section reveal">
  <div class="section-inner">
    ...tu contenido...
  </div>
</section>
```

## Dirección visual

- **Colores**: fondo marfil claro, texto grafito. Acentos de los colores
  del logo (cian, lima, naranja, dorado) solo en hovers, etiquetas y
  detalles chicos — nunca en bloques grandes.
- **Tipografía**: Space Grotesk en títulos, Inter en cuerpo de texto.
- **Liquid Glass**: las tarjetas (pilares, bento, contacto, cronograma,
  timeline, stats del hero, cita destacada, carrusel) usan vidrio
  esmerilado — fondo semitransparente + `backdrop-filter: blur()`. Hay
  manchas de color fijas detrás de todo el sitio (`body::before`) para que
  el blur tenga algo debajo. Se ve mejor en Chrome/Safari recientes;
  en navegadores viejos degrada a una tarjeta blanca semi-transparente
  sin blur, no se rompe.
- Para agregar una tarjeta nueva con el mismo estilo: clases `glass` +
  `glass-hover` (el hover agrega el zoom + elevación al pasar el mouse).

## Movimiento al hacer scroll

`assets/js/reveal.js` hace que los elementos con clase `reveal` aparezcan
con un fade + desplazamiento suave al entrar en pantalla. Respeta
`prefers-reduced-motion`. Para escalonar varios elementos del mismo
bloque, sumá `reveal-1`, `reveal-2`, `reveal-3`.

Elementos agregados por JavaScript después de cargar la página (como las
tarjetas de Programa) necesitan `window.CantaReveal.observe(elemento)`
manualmente — el observer no los detecta solo.

## Hero (Inicio)

La foto del Aconcagua es ahora el fondo del hero (`.hero-photo-band`), con
un degradé oscuro (`.hero-overlay`) para que el título en blanco se lea
bien encima. Los stats (35+, 20+, 2000) se movieron a su propia sección
debajo, ya no están superpuestos a la foto.

## Carrusel de fotos (Historia)

`.carousel` es una galería horizontal full-bleed que se desliza con
touch, trackpad o mouse — y ahora también con flechas y una barra
deslizante (`assets/js/carousel.js`, funciona por `.carousel-wrap`). Para
agregar una foto:

```html
<figure class="carousel-item reveal glass glass-hover">
  <img src="{{ '/assets/img/carousel/16.jpg' | relative_url }}" alt="descripción de la foto">
</figure>
```

Sin `figcaption` — se decidió no poner texto al pie de las fotos.

## Programa

`es/programa.html` / `en/programme.html` / `fr/programme.html` muestran
el cronograma típico del festival (Concierto Bienvenida, Concierto de
los Pueblos, etc.) — contenido real de la Propuesta para Coros 2026,
descrito como estructura típica, sin fechas ni sedes 2027 confirmadas
todavía.

La sección "Coros participantes" (bento grid cargado desde
`assets/data/programa.json`) se sacó por ahora — era de datos de
ejemplo. Vuelve cuando exista la base de datos real de coros (fases 1-3
del plan grande). El archivo JSON y el layout `.bento` siguen en el
proyecto, listos para reusar en ese momento.

## Reproductor de audio

Hay un `<audio controls>` sin archivo cargado (los controles se ven, no
hay sonido). Para activarlo con "El Canto Grande" real:

```html
<audio controls>
  <source src="{{ '/assets/audio/el-canto-grande.mp3' | relative_url }}" type="audio/mpeg">
</audio>
```

## Contenido narrativo

El texto de "Qué buscamos", "Nuestras acciones", "Nuestros diferenciales",
la cita de bienvenida y el cronograma de conciertos salen del Manual de
Procedimientos 2019 y de la Propuesta para Coros 2026 — son textos reales
de la organización, no inventados.

## Idiomas (ES / EN / FR)

El menú y el selector de idioma se generan solos desde `_data/i18n.yml`
— ahí vive la ruta y la etiqueta de cada sección, por idioma. Para
agregar un idioma nuevo, sumás un bloque más a ese YAML con el mismo
formato y creás la carpeta correspondiente con sus páginas — no hay que
tocar `nav.html` para el menú. El footer sí tiene un texto fijo por
idioma con un `{% if %}` simple en `_includes/footer.html`.

## Ajustes de esta vuelta

- Arreglado un bug de CSS por el que el subtítulo del hero (sobre la
  foto) se veía gris oscuro en vez de blanco — dos reglas con la misma
  especificidad competían y ganaba la incorrecta. El subtítulo también
  cambió de tipografía (ahora Space Grotesk) y tiene una sombra de
  texto sutil para legibilidad.
- El overlay oscuro sobre la foto del hero es más fuerte.
- El carrusel ya no muestra la scrollbar nativa ni la barra de progreso
  propia — solo las flechas.
- La tarjeta de Ubicación en Contacto linkea a mendoza.tur.ar.
- El stat "2000" del hero ahora dice "Año 2000" / "Year 2000" / "Année
  2000" para que quede claro que es un año.
- "Reconocido en el mundo coral" tiene la clase `section-feature`:
  fondo con tinte cian + vidrio, con líneas divisorias propias arriba y
  abajo.

## Secciones destacadas (section-feature)

`.section-feature` es la base (líneas divisorias + vidrio); el color se
agrega aparte con una segunda clase: `.tint-cian`, `.tint-naranja` o
`.tint-lima`. Hoy en uso: "Un festival coral internacional" con
`tint-naranja`, "Reconocimiento en el sector" con `tint-cian`. Para una
sección nueva destacada, sumá `section-feature` + una de las variantes de
color.

## Hitos de Historia — fuente

Los hitos de 1997, 1998/2001, 2008 y 2018 (ediciones del festival fuera
de Mendoza: Viña del Mar, Quito, Río de Janeiro, Guarenas, Ciudad de
Panamá) y la mención de directores/artistas invitados salen del Manual de
Procedimientos 2019, página 9 — son datos reales, no inventados.

## Banner de foto (Historia)

`.photo-band` es un componente genérico (foto de fondo + degradé +
título encima) — el mismo lenguaje visual que el hero de Inicio, pero más
bajo y pensado para encabezar una sección, no toda la página. Se puede
reusar en cualquier página nueva.

## Dos carruseles en Historia

- **"Los primeros acordes"** (`assets/img/carousel2/`, 19 fotos): momentos
  de archivo de cierres del festival, insertado en medio del timeline
  (entre 1998/2001 y 2000) a propósito.
- **"Una melodía que sigue creciendo"** (`assets/img/carousel/`, 38
  fotos): el resto del archivo fotográfico. Los artistas con nombre
  propio (Nito Mestre, Teresa Parodi, Orozco Barrientos, Jairo) van
  primero, con caption; el resto, sin caption, después.

En ambos, solo llevan `<figcaption>` los artistas invitados relevantes:
Ariel Ramírez, Vitale-Baglietto, Opus 4 y Lito Nebbia en el primero;
Nito Mestre, Teresa Parodi, Orozco Barrientos y Jairo en el segundo. Para
que una foto tenga caption, sumale la clase `named` al `<figure>` y un
`<figcaption>` adentro.

**Nota**: `NEBBIA_EN_MALVINAS.jpg` era un duplicado exacto (mismo archivo,
byte a byte) de `Lito_Nebbia.jpg` — se sacó del sitio, Lito Nebbia queda
solo en "Los primeros acordes".

## Ajustes de esta vuelta

- **Audio real**: "El Canto Grande" ya suena en Programa
  (`assets/audio/el-canto-grande.mp3`), sacó la nota de "falta cargar".
- **Foto de Historia sin recortar de más**: `.photo-band` pasó de una
  altura fija en `vh` (que recortaba mucho arriba/abajo si la pantalla
  era proporcionalmente más ancha que la foto) a `aspect-ratio: 1.93/1`,
  calcado a la proporción real de `historia-bg.jpg`.
- **Foto de la cita intercambiada**: `quote-portrait.jpg` ahora es el
  retrato de estudio de Alejandro Scarpetta; la foto que antes estaba ahí
  (arengando desde el escenario) pasó a `carousel/20.jpg`, en "Una
  melodía que sigue creciendo".
- **Carrusel más grande y sin marco**: las fotos ya no tienen borde,
  esquinas redondeadas ni sombra — quedan pegadas una a la otra, sin
  espacio entre ellas, y son más grandes (480px de alto en desktop, antes
  320px). El caption de los artistas con nombre ahora es un texto blanco
  superpuesto abajo de la foto (con degradé), no un pie separado, porque
  ya no hay marco donde ponerlo aparte.

## Vuelta atrás — carrusel

El experimento de fotos grandes y sin marco no convenció; el carrusel
volvió a como estaba: marco de vidrio (`.glass`), gap entre fotos, 320px
de alto en desktop / 240px en mobile, captions como pie de foto simple
(no superpuestos).

## Foto principal de Historia — cambiada de nuevo

`historia-bg.jpg` ahora es "CIERRE LARGO copy" (antes era "cierre_96
copy", que pasó a ocupar el primer lugar de "Los primeros acordes" para
no perderla). El `aspect-ratio` del banner se ajustó a la proporción real
de esta foto (2.54:1, más panorámica que la anterior).

## Ajustes de esta vuelta

- **Texto justificado**: todos los párrafos largos (`main p`) se
  justifican, con la última línea alineada a la izquierda
  (`text-align-last: left`) para que no quede una palabra sola centrada.
- **Historia — banner de foto**: el párrafo de la intro se sacó; lo único
  que sobrevivió ("Cantapueblo nació en la ciudad de Godoy Cruz, Mendoza,
  en 1989.") pasó a ser el pie dentro del marco de la foto, con el mismo
  estilo `.tagline` que usa el hero de Inicio.
- **Definición de la foto de Historia**: `CIERRE LARGO copy` es de
  1568×616px nomás — no hay forma de sacarle más nitidez de la que tiene.
  Lo que sí hice fue capar el ancho del banner a `max-width: 1568px` (su
  resolución real), así nunca se estira más allá de su tamaño nativo en
  pantallas grandes, que era la causa del efecto "borroso". En pantallas
  angostas sigue ocupando el 100% como antes.
- Se sacaron los subtítulos de los dos carruseles de Historia y el
  párrafo sobre directores/artistas invitados.
- El segundo carrusel de Historia se renombró a "Una melodía que se
  sigue escribiendo".

## Ver el sitio en tu computadora antes de subirlo

Requiere Ruby instalado (ver instrucciones de instalación con Homebrew si
hace falta).

```
gem install bundler jekyll
bundle init
bundle add jekyll
bundle exec jekyll serve
```

Después abrí `http://localhost:4000/cantapueblo/`. Jekyll actualiza el
sitio automáticamente cada vez que guardás un cambio — solo hay que
recargar el navegador. Esto es opcional: también podés subir directo a
GitHub y ver el resultado en la URL pública en 1-2 minutos.

## Publicar cambios

```
git add .
git commit -m "mensaje describiendo el cambio"
git push
```

GitHub reconstruye el sitio automáticamente después de cada `push`.
