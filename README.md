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
