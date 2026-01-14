# ============================================
# Script de Render para OLES Page
# ============================================
# Este script renderiza todo el sitio web usando Quarto
# 
# Uso:
#   source("render.R")
#   
# O desde la terminal:
#   Rscript render.R
#   
# Alternativamente usar Quarto directamente:
#   quarto render
# ============================================

# Verificar que Quarto está instalado
check_quarto <- function() {
  result <- system("quarto --version", intern = TRUE, ignore.stderr = TRUE)
  if (length(result) == 0) {
    stop("Quarto no está instalado. Por favor instálalo desde https://quarto.org/")
  }
  message("✓ Quarto versión: ", result)
}

# Renderizar el sitio
render_site <- function() {
  message("\n========================================")
  message("  Renderizando sitio OLES")
  message("========================================\n")
  
  # Verificar Quarto
  check_quarto()
  
  # Renderizar
  message("\n📄 Renderizando páginas...\n")
  result <- system("quarto render", intern = TRUE)
  cat(result, sep = "\n")
  
  message("\n========================================")
  message("  ✅ Sitio renderizado exitosamente!")
  message("  📁 Output en: docs/")
  message("========================================\n")
  
  # Mostrar instrucciones
  message("Para ver el sitio localmente:")
  message("  quarto preview")
  message("")
  message("Para publicar en GitHub Pages:")
  message("  1. Haz commit y push a tu repositorio")
  message("  2. En GitHub, ve a Settings > Pages")
  message("  3. Selecciona 'Deploy from branch'")
  message("  4. Selecciona la rama 'main' y carpeta '/docs'")
}

# Ejecutar si se llama directamente
if (!interactive()) {
  render_site()
} else {
  message("Funciones disponibles:")
  message("  render_site() - Renderiza todo el sitio")
}
