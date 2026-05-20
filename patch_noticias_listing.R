# Post-render: paginación y estructura del listado de noticias en docs/
f <- "docs/noticias/index.html"
if (!file.exists(f)) {
  invisible(NULL)
} else {
  html <- paste(readLines(f, warn = FALSE, encoding = "UTF-8"), collapse = "\n")

  html <- gsub("<p>:::</p>\n?", "", html, perl = TRUE)

  html <- gsub(
    "pagination: { item:",
    'pagination: { inner: "#listing-noticias-pagination .pagination", item:',
    html,
    fixed = TRUE
  )

  # Cerrar .list.grid antes de no-matching y nav (List.js borra nodos que no son ítems)
  html <- gsub(
    "(<div class=\"list grid quarto-listing-cols-[34]\">\\s*)([\\s\\S]*?)(\\s*<div class=\"listing-no-matching)",
    "\\1\\2</div>\n\\3",
    html,
    perl = TRUE
  )

  # Quitar cierre de div duplicado y "n" suelta del arreglo anterior
  html <- gsub(
    "</a>\\s*</div>\\s*</div>\\s*</div>\\s*(<div class=\"listing-no-matching\")",
    "</a></div></div>\n\\1",
    html,
    perl = TRUE
  )
  html <- gsub("</div>\\s*n\\s*(<div class=\"listing-no-matching\")", "</div>\n\\1", html, perl = TRUE)

  # List.js deja data-src en páginas 2+; forzar src para que se vean las fotos
  html <- gsub(
    '<img loading="lazy" data-src="([^"]+)"',
    '<img loading="lazy" src="\\1"',
    html,
    perl = TRUE
  )

  writeLines(strsplit(html, "\n", fixed = TRUE)[[1]], f, useBytes = TRUE)
}
