# Guía de estructura del sitio OLES (www.oles.cl)

> Documento de referencia para **entender y modificar** el sitio. Pensado para
> volver a consultarlo y hacer preguntas concretas ("¿dónde cambio X?").
> Verificado contra el código del repositorio (no contra los manuales antiguos).
>
> **Generado por Claude.** No reemplaza a `README.md`, `MANUAL.md` ni
> `TUTORIAL-USO-PAGINA.md`; los complementa y corrige donde estaban desactualizados
> (ver §8).

---

## 1. ¿Qué es este sitio, en una frase?

Es un sitio **Quarto** (`.qmd` = Markdown + R + HTML). Tú editas los archivos
**fuente** (`.qmd`, `.yml`, `.css`, `.js`); al ejecutar `quarto render` Quarto
**genera** la versión publicable dentro de la carpeta **`docs/`**. Esa carpeta
`docs/` es lo que ve el público (vía Netlify → dominio www.oles.cl).

**Regla de oro:** nunca edites `docs/` a mano. Es salida generada; se sobreescribe
en cada render. Edita siempre la fuente y vuelve a renderizar.

---

## 2. Mapa de carpetas (solo lo que importa para editar)

```
oles_cl/
├── _quarto.yml          ← Configuración global: menú (navbar), tema, salida a docs/
├── index.qmd            ← PORTADA (home): video, destacados, noticias recientes, líneas
├── somos.qmd            ← Página "Sobre OLES"
├── contacto.qmd         ← Página de contacto (correo, redes sociales)
├── styles.css           ← Estilos globales (colores, tarjetas, botones, layouts)
├── translations.js      ← Traducciones / textos i18n (atributos data-i18n)
│
├── equipo/              ← Perfiles de personas (1 archivo .qmd por persona)
│   ├── index.qmd        ←   Página "Equipo": define QUÉ personas salen y en qué bloque
│   ├── image/           ←   Fotos del equipo
│   ├── nombre-apellido.qmd      ← perfil de una persona
│   ├── _pub-nombre.md   ←   (GENERADO automáticamente: NO editar a mano)
│   ├── asistentes-anteriores/   ← ex-asistentes
│   └── tesistas/                ← tesistas y pasantes (página jovenes.html)
│
├── estudios/            ← Proyectos y líneas de investigación
│   ├── index.qmd        ←   Página "Proyectos": lista R `cards` que arma las tarjetas
│   ├── <slug>.qmd       ←   página de cada proyecto
│   ├── lineas.qmd       ←   portada de las 4 líneas de investigación
│   └── lineas/linea-*.qmd       ← una página por línea (1 a 4)
│
├── noticias/            ← Noticias (1 carpeta por fecha)
│   ├── index.qmd        ←   Página "Noticias": listing automático
│   ├── AAAA-MM-DD/index.qmd     ← una noticia + su imagen en la misma carpeta
│   └── *.js             ←   scripts de paginación/click del listado
│
├── publicaciones/      ← Publicaciones académicas (1 archivo .qmd por publicación)
│   ├── index.qmd        ←   Página "Publicaciones": listing automático
│   └── AAAA-tema-slug.qmd
│
├── eventos/            ← Eventos (estructura similar a noticias)
├── repositorio/        ← Datos / informes (EPSEP, PDFs)
│
├── _templates/         ← PLANTILLAS para copiar al crear contenido nuevo
├── _footer.html        ← Pie de página común a todo el sitio
├── compilar_publicaciones_perfiles.R   ← script PRE-render (ver §5)
├── patch_noticias_listing.R            ← script POST-render (ajusta el listado)
│
└── docs/               ← ⚠️ SALIDA GENERADA. No editar. Es lo que se publica.
```

---

## 3. Las dos formas en que el sitio arma sus listados

Esto es lo más importante de entender, porque define **dónde** hay que tocar.
Hay dos mecanismos distintos:

### A) Listados AUTOMÁTICOS (solo agregas el archivo y aparece)
Quarto recorre una carpeta solo. **No** hay que registrar nada en otro lado.

| Página | Cómo | Para agregar algo |
|---|---|---|
| **Noticias** (`noticias/index.qmd`) | `listing` de `*/index.qmd`, orden por fecha | Crea la carpeta `noticias/AAAA-MM-DD/index.qmd` y listo |
| **Publicaciones** (`publicaciones/index.qmd`) | `listing` de los `.qmd` de la carpeta | Crea `publicaciones/AAAA-slug.qmd` y listo |
| **Noticias recientes** (portada) | Bloque R en `index.qmd` toma las 3 más recientes por `date` | Solo crea la noticia con `date` |
| **Destacados** (portada) | Bloque R en `index.qmd` toma las que tengan `destacado: true` | Pon `destacado: true` en el YAML de la noticia |

### B) Listados con LISTA EXPLÍCITA (hay que editar el índice además del archivo)
El archivo nuevo **no aparece solo**; hay que añadirlo a una lista.

| Página | Dónde está la lista | Qué editar al agregar algo |
|---|---|---|
| **Equipo** (`equipo/index.qmd`) | Cada bloque del YAML `listing:` tiene un `contents:` con la **lista explícita** de archivos `.qmd` | Crea `equipo/nombre.qmd` **y** añade su ruta al `contents:` del bloque correcto |
| **Proyectos** (`estudios/index.qmd`) | Bloque R con la lista `cards <- list(...)` (≈ línea 266) | Crea `estudios/slug.qmd` **y** añade una entrada `list(slug=..., ...)` |

> ⚠️ **Punto clave** (donde los manuales antiguos se equivocan): la página
> **Equipo NO es automática por categoría**. Cada bloque (`direccion`, `comite`,
> `investigadores-principales`, `adjuntos`, `doctorantes`, `asistentes`,
> `colaboradores-externos`) lista **archivos uno por uno** en `contents:`. Si
> creas un perfil pero no lo agregas a la lista correcta, **no se verá**. Cada
> perfil debe estar en **un solo** bloque.

---

## 4. "Quiero cambiar X → toco Y" (tabla de navegación rápida)

| Quiero… | Archivo(s) a editar | Notas |
|---|---|---|
| **Nueva noticia** | `noticias/AAAA-MM-DD/index.qmd` + imagen en esa carpeta | Aparece sola en /noticias. Copia `_templates/noticia-template.qmd` |
| **Destacar una noticia en la portada** | YAML de esa noticia: `destacado: true` | No se toca la portada |
| **Nueva persona en el equipo** | `equipo/nombre-apellido.qmd` + foto en `equipo/image/` + añadir al `contents:` de `equipo/index.qmd` | Plantilla: `_templates/PERSONA.qmd` |
| **Ex-asistente / tesista** | `equipo/asistentes-anteriores/` o `equipo/tesistas/` | Tesistas se ven en `jovenes.html` |
| **Nueva publicación** | `publicaciones/AAAA-slug.qmd` | Aparece sola; usa `authors: [slug, ...]` para vincular a perfiles |
| **Nuevo proyecto/estudio** | `estudios/slug.qmd` + entrada en la lista `cards` de `estudios/index.qmd` | Plantilla: `_templates/proyecto.qmd` |
| **Editar una línea de investigación** | `estudios/lineas/linea-1..4.qmd` (texto) / `estudios/lineas.qmd` (portada de líneas) | Las 4 tarjetas de líneas en la HOME están en `index.qmd` |
| **Cambiar la portada (home)** | `index.qmd` | Video, textos fijos, botones, líneas, logos |
| **Cambiar el menú superior (navbar)** | `_quarto.yml` (sección `website: navbar:`) | Añadir/renombrar/reordenar secciones |
| **Cambiar estilos (colores, tarjetas, botones)** | `styles.css` | Afecta a todo el sitio |
| **Cambiar el pie de página** | `_footer.html` | Común a todas las páginas |
| **Cambiar "Sobre OLES"** | `somos.qmd` | |
| **Cambiar contacto / redes** | `contacto.qmd` | |
| **Actualizar EPSEP / repositorio** | `repositorio/epsep.qmd` (+ PDF en `repositorio/`) | |
| **Cambiar textos traducibles / idioma** | `translations.js` (atributos `data-i18n`) | |

---

## 5. Los dos scripts que corren solos al renderizar

Definidos en `_quarto.yml`:

- **`compilar_publicaciones_perfiles.R`** → corre **antes** del render (`pre-render`).
  Lee todos los `publicaciones/*.qmd`, mira su campo `authors: [slug1, slug2]`, y
  **genera** los archivos `equipo/_pub-<slug>.md` con la lista de publicaciones de
  cada persona. Por eso cada perfil incluye `{{< include _pub-nombre.md >}}` y la
  lista de publicaciones aparece sola.
  → **Nunca edites los `_pub-*.md` a mano**: se regeneran y perderás los cambios.

- **`patch_noticias_listing.R`** → corre **después** del render (`post-render`).
  Ajusta el HTML del listado de noticias (paginación/orden).

**Consecuencia práctica:** si tocas publicaciones o equipo, ejecuta `quarto render`
desde la raíz para que se regeneren los `_pub-*.md` y todo quede consistente.

---

## 6. Cómo vincular una publicación con las personas (campo `authors`)

En el YAML de `publicaciones/AAAA-slug.qmd`:

- `author:` → texto visible de la cita (ej. `"Gerber, M., Figueiredo, A."`).
- `authors:` → **lista de slugs** = nombres de archivo de perfil **sin `.qmd`**.
  Ej.: `authors: [monica-gerber, ana-figueiredo]`.

Cada slug debe coincidir **exactamente** con el nombre del archivo en `equipo/` (o
`equipo/asistentes-anteriores/`). Si no coincide, la publicación no se asocia al
perfil. Tras editar, hay que volver a renderizar (corre el script pre-render).

---

## 7. Flujo de trabajo estándar

1. Copia la plantilla adecuada de `_templates/`.
2. Crea/edita el `.qmd` con un nombre de archivo en minúsculas con guiones (el
   nombre define la URL y, en perfiles, el slug para `authors`).
3. Revisa el YAML con cuidado (es la causa #1 de que algo "no aparezca").
4. Pon las imágenes/PDF en la carpeta correcta.
5. Si es equipo o proyecto: **añade el archivo a su índice** (§3-B).
6. Ejecuta `quarto render` desde la raíz.
7. Revisa el resultado en `docs/` (o levantando una vista previa).

Requisitos del entorno: **R** con el paquete `yaml` instalado
(`install.packages("yaml")`), además de Quarto.

---

## 8. Diferencias con los manuales antiguos (qué creer)

El repo ya trae `README.md`, `MANUAL.md` y `TUTORIAL-USO-PAGINA.md`. Son útiles,
pero algunos puntos quedaron desactualizados frente al código actual:

1. **Equipo NO es automático por categoría.** `MANUAL.md` §2 y `TUTORIAL` §9 dicen
   que basta con poner la `categories` correcta. **Falso hoy.** `equipo/index.qmd`
   usa `contents:` con lista explícita de archivos por bloque. Hay que añadir el
   archivo a la lista. (El `README.md` sí lo describe bien.)

2. **Las tarjetas de Proyectos se generan con R, no con HTML a mano.**
   `MANUAL.md` §4 y `TUTORIAL` §6 dicen que se editan tarjetas HTML manuales en
   `estudios/index.qmd`. Hoy hay un bloque R con la lista `cards <- list(...)`
   (≈ línea 266) que las construye; para añadir un proyecto se agrega una entrada
   `list(slug=..., picsum=..., lineas=...)` a esa lista. (El `README.md` es correcto.)

**En caso de duda, la fuente de verdad es el código `.qmd`/`.yml`, no los manuales.**

---

## 9. Glosario mínimo

- **`.qmd`**: archivo fuente Quarto = YAML (entre `---`) + cuerpo Markdown/HTML/R.
- **YAML / front matter**: bloque entre `---` al inicio del archivo; define título,
  fecha, imagen, categorías, etc. Errores aquí suelen romper la página.
- **`listing`**: motor de Quarto que arma grillas de tarjetas a partir de una
  carpeta o de una lista de archivos.
- **slug**: el nombre de archivo sin extensión; define la URL y el vínculo con
  publicaciones.
- **render**: ejecutar `quarto render` para regenerar `docs/`.
- **pre-render / post-render**: scripts que Quarto corre antes/después del render.
