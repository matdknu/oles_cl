# Página Web OLES

Sitio web del Observatorio de Violencia y Legitimidad Social (OLES), construido con Quarto.

## Estructura del Proyecto

```
oles-page/
├── _quarto.yml          # Configuración principal de Quarto
├── _templates/          # Plantillas para crear contenido nuevo
├── index.qmd            # Página principal
├── styles.css           # Estilos personalizados
├── translations.js      # Sistema de traducción ES/EN
├── noticias/           # Directorio de noticias
├── equipo/             # Perfiles del equipo
├── estudios/           # Líneas de investigación
├── eventos/            # Eventos y seminarios
├── publicaciones/      # Publicaciones académicas
└── docs/               # Sitio compilado (GitHub Pages)
```

## Cómo Agregar una Noticia

### 1. Crear carpeta con fecha

Crea una nueva carpeta en `noticias/` con el formato `YYYY-MM-DD`:

```bash
mkdir noticias/2026-02-15
```

### 2. Crear archivo index.qmd

Dentro de la carpeta, crea un archivo `index.qmd` con esta estructura:

```yaml
---
title: "Título de la noticia"
description: "Breve descripción o bajada de la noticia"
date: "2026-02-15"
author: "Nombre del Autor"
categories: [Noticias]
image: "featured.jpg"
title-block-banner: false
---

::: {.featured-image}
![](featured.jpg)
:::

Contenido de la noticia aquí...

[← Volver a Noticias](../index.html)
```

### 3. Agregar imagen principal

- Agrega una imagen llamada `featured.jpg`, `featured.png` o `featured.jpeg` en la misma carpeta
- Esta imagen aparecerá:
  - Entre el título y la bajada en la noticia individual
  - Como miniatura en el listado de noticias
  - En las noticias recientes de la página principal

### 4. Imágenes adicionales (opcional)

Para agregar más imágenes en el contenido:

```markdown
::: {.gallery}
![](foto1.jpg) ![](foto2.jpg) ![](foto3.jpg)
:::
```

## Compilar el Sitio

### Compilar todo el sitio

```bash
quarto render
```

### Compilar solo la página principal

```bash
quarto render index.qmd
```

### Compilar una noticia específica

```bash
quarto render noticias/2026-02-15/index.qmd
```

## Agregar Miembros del Equipo

1. Crea un archivo en `equipo/` con el formato `nombre-apellido.qmd`
2. Usa esta estructura:

```yaml
---
title: "Nombre Completo"
about:
  template: trestles
  image: https://via.placeholder.com/400x400
  links:
    - icon: envelope
      text: Email
      href: mailto:correo@ejemplo.com
categories: [Investigadores]
---

Biografía y descripción del miembro del equipo...
```

## Agregar Estudios

1. Crea un archivo en `estudios/` con nombre descriptivo
2. Incluye en el YAML:
   - `title`: Nombre del estudio
   - `description`: Descripción breve
   - `estado`: "en-curso" o "finalizado"
   - `periodo`: "2020-2024"

## Sistema de Traducción

El sitio tiene soporte para español e inglés:
- Las traducciones están en `translations.js`
- Los textos traducibles usan el atributo `data-i18n`
- El selector de idioma está en la esquina superior derecha

## Publicar Cambios

El sitio se publica automáticamente desde la carpeta `docs/`:

1. Compila el sitio: `quarto render`
2. Los archivos HTML se generan en `docs/`
3. Haz commit y push a GitHub
4. GitHub Pages sirve automáticamente desde `docs/`

## Plantillas Disponibles

En la carpeta `_templates/` hay plantillas para:
- Noticias nuevas
- Otros tipos de contenido

Puedes copiar estas plantillas como punto de partida.

## Notas Importantes

- **Imágenes featured**: Deben estar en la misma carpeta que el `index.qmd`
- **Fechas**: Usa formato ISO `YYYY-MM-DD` en el YAML
- **Categorías**: Mantén consistencia con las categorías existentes
- **Compilación**: Siempre compila antes de hacer commit

## Soporte

Para dudas o problemas, contactar al equipo técnico de OLES.
