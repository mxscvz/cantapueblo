# Cantapueblo — sitio del festival

Sitio estático armado con Jekyll (soportado nativamente por GitHub Pages).
Bilingüe: español en `/es/`, inglés en `/en/`.

## Estructura

- `_config.yml` — configuración del sitio
- `_layouts/default.html` — plantilla compartida por todas las páginas
- `_includes/nav.html`, `_includes/footer.html` — header y footer, escritos una sola vez
- `assets/css/style.css` — todos los estilos
- `es/`, `en/` — el contenido de cada página, por idioma
- `index.html` — redirige automáticamente según el idioma del navegador

## Reemplazar los marcos de foto por fotos reales

En `es/historia.html` y `en/history.html` hay tres `<div class="photo-frame">`
con textura rayada — son placeholders. Para poner una foto real:

1. Guardá la imagen en `assets/img/` (por ejemplo `assets/img/1989.jpg`)
2. Reemplazá esto:
   ```html
   <div class="photo-frame"><span>Foto: edición 1989</span></div>
   ```
   por esto:
   ```html
   <img src="{{ '/assets/img/1989.jpg' | relative_url }}" alt="Cantapueblo 1989" style="width:100%; aspect-ratio:4/3; object-fit:cover;">
   ```

## Programa (bento grid)

`es/programa.html` / `en/programme.html` cargan las tarjetas desde
`assets/data/programa.json`. Hoy tiene 3 entradas de ejemplo, marcadas como
tales. Para agregar coros reales, sumá objetos al mismo JSON con esta forma:

```json
{
  "country_es": "Brasil",
  "country_en": "Brazil",
  "name": "Nombre del coro",
  "desc_es": "Descripción breve en español.",
  "desc_en": "Short description in English."
}
```

No hace falta tocar el HTML — la página lee el archivo automáticamente.

## Dirección visual

Fondo marfil claro, tipografía editorial (Fraunces) + neutra (Inter),
acentos mínimos con los colores del logo (cian, lima, naranja, dorado) solo
en hovers, etiquetas y detalles pequeños — nunca en bloques grandes. El
logo en `assets/img/logo.png` tiene el fondo blanco removido, funciona
igual de bien sobre este fondo claro.

## Reproductor de audio

En `es/programa.html` / `en/programme.html` hay un reproductor `<audio>`
nativo sin archivo cargado todavía (los controles se ven pero no hay
sonido). Para activarlo con una grabación real:

1. Guardá el archivo de audio en `assets/img/` o una carpeta `assets/audio/`
2. Agregá el `src`:
   ```html
   <audio controls>
     <source src="{{ '/assets/audio/ejemplo.mp3' | relative_url }}" type="audio/mpeg">
   </audio>
   ```

## Estructura de sección (importante al agregar contenido nuevo)

Cada `<section class="section">` ahora ocupa todo el ancho de pantalla (el
fondo y la línea divisoria llegan de punta a punta). El contenido va
siempre adentro de un `<div class="section-inner">` para quedar centrado
con el mismo ancho que el resto del sitio. Si agregás una sección nueva,
respetá este patrón:

```html
<section class="section reveal">
  <div class="section-inner">
    ...tu contenido...
  </div>
</section>
```

## Logo con scroll

El logo entra grande en el header y se achica al bajar la página
(`assets/js/header-shrink.js` agrega la clase `scrolled` al header después
de 60px de scroll). Es puramente visual, no afecta la navegación.

## Movimiento al hacer scroll

`assets/js/reveal.js` hace que los elementos con clase `reveal` aparezcan
con un fade + desplazamiento suave a medida que entran en pantalla (en vez
de estar todos visibles de entrada). Respeta `prefers-reduced-motion`. Para
sumarlo a un elemento nuevo, agregá `class="reveal"` (o `reveal reveal-1`,
`reveal-2`, `reveal-3` para escalonar varios dentro del mismo bloque).
Elementos que se agregan por JavaScript después de cargar la página (como
las tarjetas de Programa) necesitan llamar a
`window.CantaReveal.observe(elemento)` manualmente — el observer no los ve
solo.

## Sobre el contenido narrativo

El texto de "Qué buscamos", "Nuestras acciones", "Nuestros diferenciales",
la cita de bienvenida y el cronograma de conciertos salen del Manual de
Procedimientos 2019 y de la Propuesta para Coros 2026 — son textos reales
de la organización, no inventados. El cronograma de Programa está descrito
como estructura típica, sin fechas ni sedes 2027 confirmadas todavía.

## Tipografía

Cambié Fraunces (serif editorial) por **Space Grotesk** en títulos — más
geométrica y contemporánea — manteniendo Inter en el cuerpo de texto.

## Fotos

Sumé 6 fotos reales que subiste, elegidas con un criterio narrativo
puntual, no al azar:

- **Hero (Inicio)**: `hero-aconcagua.jpg` — el Concierto en las Alturas,
  al pie del Aconcagua, como pediste.
- **Cita de bienvenida (Inicio)**: `quote-portrait.jpg` — una directora
  dirigiendo en vivo, junto a la cita de tu papá sobre la emoción de cada
  concierto.
- **Historia**: `historia-1/2/3.jpg` — un concierto en Mendoza, una
  delegación internacional y otra vista del Aconcagua. Los captions
  describen lo que la foto muestra realmente (son de ediciones recientes,
  no reconstruyen archivo de 1989 — evité poner una fecha falsa).
- **Programa**: `programa-photo.jpg` — público y coro en un concierto
  nocturno.

Las originales están en `assets/img/`, comprimidas para web (JPEG
progresivo, ~50–300 KB cada una). Si querés cambiar alguna, reemplazá el
archivo manteniendo el mismo nombre, o cambiá el `src` en el HTML.

## Liquid Glass

Las tarjetas (pilares, programa, contacto, cronograma, timeline, stats del
hero, cita destacada) usan un estilo "vidrio esmerilado": fondo
semitransparente + `backdrop-filter: blur()`, con manchas de color suaves
fijas detrás de todo el sitio (`body::before`) para que el efecto de vidrio
tenga algo de color debajo para desenfocar. Se ven mejor en Chrome/Safari
recientes — `backdrop-filter` no anda en navegadores muy viejos, pero
degrada bien (se ve como una tarjeta blanca semi-transparente sin blur).

Las tarjetas con clase `glass-hover` además hacen un leve zoom + elevación
al pasar el mouse — la clase `.glass-hover` puede agregarse a cualquier
tarjeta nueva junto con `.glass`.

## Carrusel de fotos (Historia)

`es/historia.html` / `en/history.html` tienen una galería horizontal
(`.carousel`) que ocupa todo el ancho de pantalla y se desliza con touch,
trackpad o mouse. Usa las 11 fotos que no se usaron en otro lado del
sitio (`assets/img/carousel/01.jpg` a `11.jpg`). Para agregar una foto
más, sumá otro `<figure class="carousel-item reveal glass glass-hover">`
con su `<img>` y `<figcaption>`.

## Fotos — actualización

- La foto de la cita de tu papá ahora es una donde él aparece en escena
  (`quote-portrait.jpg`, reemplazada).
- La foto de Programa ahora es una toma de coro en escenario con
  iluminación (`programa-photo.jpg`, reemplazada).
- Saqué "Mendoza, Argentina — desde 1989" de arriba del título del hero.

## Actualización — todo a un solo carrusel

Historia ya no tiene fotos sueltas de distinto tamaño: las 15 fotos
(las que estaban en la intro + las del carrusel + la que sacamos de
Programa) viven todas en `assets/img/carousel/01.jpg` a `15.jpg`, todas
del mismo tamaño, sin captions. Programa ya no tiene foto propia. La foto
del hero en Inicio ya no tiene esquinas redondeadas y ocupa todo el ancho
de pantalla.

## Datos de contacto reales

Email, Instagram y Facebook ya son los reales. Solo falta el teléfono/
WhatsApp, marcado como pendiente en la nota interna de la página.

## Antes de publicar

Buscar "CONFIRMAR" / "CONFIRM" en `es/contacto.html` y `en/contact.html`
y reemplazar por el email, teléfono e Instagram reales.

## Ver el sitio en tu computadora antes de subirlo (opcional)

Requiere Ruby instalado.

```
gem install bundler jekyll
bundle init
bundle add jekyll
bundle exec jekyll serve
```

Después abrí `http://localhost:4000/cantapueblo/` en el navegador.

Esto es opcional — también podés subir los cambios directamente a GitHub
y ver el resultado en unos minutos en la URL pública, sin instalar nada
localmente.

## Publicar cambios

```
git add .
git commit -m "mensaje describiendo el cambio"
git push
```

GitHub reconstruye el sitio automáticamente después de cada `push`. El
resultado queda disponible en `https://mxscvz.github.io/cantapueblo/`
(puede tardar uno o dos minutos en actualizarse).
