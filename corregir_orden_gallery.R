#!/usr/bin/env Rscript

# Script para corregir el orden de la galería en todas las noticias
# La galería debe estar ANTES del link "Volver a Noticias"

noticias_dirs <- list.dirs("noticias", recursive = FALSE, full.names = TRUE)
noticias_dirs <- noticias_dirs[grepl("^noticias/\\d{4}-\\d{2}-\\d{2}", noticias_dirs)]

cat("Corrigiendo orden de galería en", length(noticias_dirs), "noticias...\n")

for (dir in noticias_dirs) {
  index_file <- file.path(dir, "index.qmd")
  if (!file.exists(index_file)) next
  
  contenido <- readLines(index_file, warn = FALSE)
  
  # Buscar índices de "Volver a Noticias" y ".gallery"
  idx_volver <- grep("Volver a Noticias", contenido)
  idx_gallery_start <- grep("^::: \\{\\.gallery\\}$", contenido)
  
  # Si no hay galería o ya está en orden correcto, continuar
  if (length(idx_gallery_start) == 0) next
  if (length(idx_volver) == 0) next
  
  # Si la galería está DESPUÉS del link "Volver", corregir
  if (idx_gallery_start[1] > idx_volver[1]) {
    cat("  Corrigiendo:", basename(dir), "\n")
    
    # Encontrar el final de la galería
    idx_gallery_end <- idx_gallery_start[1]
    for (i in (idx_gallery_start[1] + 1):length(contenido)) {
      if (grepl("^:::$", contenido[i])) {
        idx_gallery_end <- i
        break
      }
    }
    
    # Extraer la sección de galería (incluye líneas vacías alrededor)
    # Buscar líneas vacías antes de la galería
    inicio_bloque <- idx_gallery_start[1]
    if (inicio_bloque > 1 && contenido[inicio_bloque - 1] == "") {
      inicio_bloque <- inicio_bloque - 1
    }
    
    # Buscar líneas vacías después de la galería
    fin_bloque <- idx_gallery_end
    if (fin_bloque < length(contenido) && contenido[fin_bloque + 1] == "") {
      fin_bloque <- fin_bloque + 1
    }
    
    galeria_bloque <- contenido[inicio_bloque:fin_bloque]
    
    # Eliminar la galería de su posición actual
    contenido <- contenido[-(inicio_bloque:fin_bloque)]
    
    # Recalcular índice de "Volver" después de eliminar
    idx_volver_nuevo <- grep("Volver a Noticias", contenido)
    if (length(idx_volver_nuevo) == 0) {
      cat("    ERROR: No se encontró 'Volver a Noticias' después de eliminar galería\n")
      next
    }
    
    # Insertar la galería ANTES del link "Volver"
    # Buscar líneas vacías antes de "Volver"
    insertar_en <- idx_volver_nuevo[1]
    while (insertar_en > 1 && contenido[insertar_en - 1] == "") {
      insertar_en <- insertar_en - 1
    }
    
    # Insertar la galería
    contenido_nuevo <- c()
    if (insertar_en > 1) {
      contenido_nuevo <- c(contenido_nuevo, contenido[1:(insertar_en - 1)])
    }
    contenido_nuevo <- c(contenido_nuevo, "", galeria_bloque, "")
    contenido_nuevo <- c(contenido_nuevo, contenido[insertar_en:length(contenido)])
    
    # Guardar
    writeLines(contenido_nuevo, index_file)
  }
}

cat("✓ Orden de galerías corregido\n")
