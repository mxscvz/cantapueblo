# Notas técnicas — Cantapueblo

Referencia de trabajo para seguir editando el sitio. No es para gente de
afuera del proyecto — el README público está en `README.md`.

## Pendiente

- Falta confirmar el **teléfono/WhatsApp** en Contacto (`es/contacto.html`,
  `en/contact.html`) — hoy dice "CONFIRMAR". Email, Instagram y Facebook
  ya son los reales.

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

## Carrusel de fotos (Historia)

`.carousel` es una galería horizontal full-bleed que se desliza con
touch, trackpad o mouse. Para agregar una foto:

```html
<figure class="carousel-item reveal glass glass-hover">
  <img src="{{ '/assets/img/carousel/16.jpg' | relative_url }}" alt="descripción de la foto">
</figure>
```

Sin `figcaption` — se decidió no poner texto al pie de las fotos.

## Programa (bento grid)

`es/programa.html` / `en/programme.html` cargan las tarjetas de coros
desde `assets/data/programa.json`. Hoy tiene 3 entradas de ejemplo,
marcadas como tales. Para agregar coros reales, sumá objetos con esta
forma (no hace falta tocar el HTML):

```json
{
  "country_es": "Brasil",
  "country_en": "Brazil",
  "name": "Nombre del coro",
  "desc_es": "Descripción breve en español.",
  "desc_en": "Short description in English."
}
```

El cronograma de conciertos (Concierto Bienvenida, Concierto de los
Pueblos, etc.) es contenido real de la Propuesta para Coros 2026, descrito
como estructura típica — sin fechas ni sedes 2027 confirmadas todavía.

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
