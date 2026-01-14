# OLES - Observatorio de Legitimidad

Sitio web del Observatorio de Legitimidad construido con Quarto para GitHub Pages.

## 📁 Estructura del Proyecto

```
oles-page/
├── 🔧 _quarto.yml          # Configuración (NO MODIFICAR)
├── 🏠 index.qmd            # Página principal (NO MODIFICAR)
├── 🎨 styles.css           # Estilos (NO MODIFICAR)
│
├── 📋 _templates/          # ← PLANTILLAS PARA COPIAR
│   ├── NOTICIA.qmd
│   ├── EVENTO.qmd
│   ├── PERSONA.qmd
│   ├── PUBLICACION.qmd
│   └── PROYECTO.qmd
│
├── 📰 noticias/            # ← AGREGAR NOTICIAS
├── 📅 eventos/             # ← AGREGAR EVENTOS (Agenda)
├── 👥 equipo/              # ← AGREGAR PERSONAS
├── 📚 publicaciones/       # ← AGREGAR PUBLICACIONES
├── 🔬 proyectos/           # ← AGREGAR PROYECTOS
│
├── 🖼️ images/              # ← PONER IMÁGENES
│   ├── logos/              # Logo y hero
│   ├── noticias/
│   ├── eventos/
│   ├── equipo/
│   ├── publicaciones/
│   └── proyectos/
│
└── 📦 docs/                # Sitio generado (automático)
```

---

## 🌟 DESTACADOS

Para que una **noticia** o **evento** aparezca en la sección "Destacados" de la página principal, agregar en el YAML:

```yaml
destacado: true
```

---

## ➕ CÓMO AGREGAR CONTENIDO

### 📰 Nueva NOTICIA

1. Copiar `_templates/NOTICIA.qmd` a `noticias/`
2. Renombrar: `YYYY-MM-DD-titulo.qmd`
3. Editar:

```yaml
---
title: "Título de la noticia"
date: "2026-01-15"
image: "../images/noticias/foto.jpg"  # o URL externa
author: "Equipo OLES"
destacado: true   # ← Para que aparezca en Destacados
categories:
  - "Investigación"
---

Contenido en Markdown...
```

---

### 📅 Nuevo EVENTO (Agenda)

1. Copiar `_templates/EVENTO.qmd` a `eventos/`
2. Renombrar: `YYYY-MM-DD-nombre-evento.qmd`
3. Editar:

```yaml
---
title: "Nombre del Seminario"
date: "2026-03-15"
hora: "10:00 - 12:00 hrs"
lugar: "Sala T202, Facultad de Ciencias Sociales"
image: "../images/eventos/evento.jpg"
destacado: true   # ← Para que aparezca en Destacados
---

Descripción del evento...
```

---

### 👥 Nueva PERSONA

1. Copiar `_templates/PERSONA.qmd` a `equipo/`
2. Renombrar: `nombre-apellido.qmd`
3. Editar:

```yaml
---
title: "Nombre Completo"
cargo: "Investigador/a"   # "Director/a" aparece en Dirección
orden: 10                 # 1 = primero
email: "correo@uni.cl"
image: "../images/equipo/foto.jpg"
areas-interes:
  - "Área 1"
  - "Área 2"
---

## Descripción
Biografía...
```

---

### 📚 Nueva PUBLICACIÓN

1. Copiar `_templates/PUBLICACION.qmd` a `publicaciones/`
2. Renombrar: `YYYY-autor-tema.qmd`
3. Editar:

```yaml
---
title: "Título del artículo"
date: "2025-06-15"
year: 2025
authors:
  - "Gerber, M."
  - "Figueiredo, A."
revista: "Peace and Conflict"
doi: "10.1037/ejemplo"
type: "Artículo"
---

## Resumen
...
```

---

### 🔬 Nuevo PROYECTO

1. Copiar `_templates/PROYECTO.qmd` a `proyectos/`
2. Renombrar: `nombre-proyecto.qmd`

---

## 🖼️ IMÁGENES

### Usar imágenes locales:

1. Guardar en `images/[tipo]/nombre.jpg`
2. Referenciar en QMD:

```yaml
image: "../images/equipo/monica-gerber.jpg"
```

### Usar imágenes externas:

```yaml
image: "https://images.unsplash.com/photo-xxx?w=800&h=400&fit=crop"
```

**Tamaños recomendados:**
- Hero: 1920x1080 px
- Noticias/Eventos: 800x400 px
- Equipo: 400x400 px

---

## 🚀 COMANDOS

```bash
# Renderizar el sitio
quarto render

# Ver preview local
quarto preview

# Subir a GitHub
git add .
git commit -m "Actualización"
git push
```

---

## 🌐 PUBLICAR EN GITHUB PAGES

1. Crear repositorio en GitHub
2. Subir código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/usuario/oles-page.git
   git push -u origin main
   ```
3. En GitHub → Settings → Pages:
   - Branch: `main`
   - Folder: `/docs`
4. ¡Listo! Tu sitio estará en `https://usuario.github.io/oles-page/`

---

## 📝 RESUMEN RÁPIDO

| Contenido | Carpeta | Plantilla | Campo especial |
|-----------|---------|-----------|----------------|
| Noticia | `noticias/` | NOTICIA.qmd | `destacado: true` |
| Evento | `eventos/` | EVENTO.qmd | `destacado: true`, `hora`, `lugar` |
| Persona | `equipo/` | PERSONA.qmd | `cargo`, `orden` |
| Publicación | `publicaciones/` | PUBLICACION.qmd | `revista`, `doi`, `authors` |
| Proyecto | `proyectos/` | PROYECTO.qmd | `estado`, `financiamiento` |

---

## ❓ PROBLEMAS COMUNES

**Las imágenes no cargan:**
- Verificar ruta (debe empezar con `../images/`)
- Verificar que el archivo existe

**El destacado no aparece:**
- Verificar `destacado: true` (no `"true"`)

**Error al renderizar:**
- Verificar YAML bien formateado
- Fechas entre comillas: `date: "2026-01-15"`
