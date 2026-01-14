// Traducciones para OLES
const translations = {
  es: {
    // Navegación
    nav: {
      inicio: "Inicio",
      acerca: "Acerca del Observatorio",
      mision: "Misión",
      equipo: "Equipo",
      investigacion: "Investigación",
      estudios: "Estudios",
      publicaciones: "Publicaciones Académicas",
      eventos: "Eventos",
      noticias: "Noticias",
      contacto: "Contacto",
      volverEstudios: "← Volver a Estudios",
      irInicio: "Ir al Inicio →",
      verEstudios: "Ver estudios →",
      verMas: "Ver más →",
      verEquipo: "Ver perfiles completos →"
    },
    // Secciones
    secciones: {
      destacados: "Destacados",
      noticiasRecientes: "Noticias Recientes",
      estudios: "Nuestras Líneas de Investigación",
      agenda: "Agenda",
      equipo: "Nuestro Equipo",
      acerca: "Acerca del Observatorio",
      publicaciones: "Publicaciones Académicas"
    },
    // Hero
    hero: {
      titulo: "Observatorio de Legitimidad",
      subtitulo: "Investigación sobre legitimidad institucional en Chile"
    },
    // Estudios
    estudios: {
      intro: "Conoce las líneas de investigación del Observatorio de Legitimidad.",
      encuestas: {
        titulo: "Estudios de Encuesta",
        descripcion: "Investigaciones basadas en encuestas representativas que analizan percepciones y actitudes sobre legitimidad institucional.",
        corta: "Investigaciones basadas en encuestas representativas que analizan percepciones y actitudes sobre legitimidad institucional."
      },
      cualitativos: {
        titulo: "Estudios Cualitativos",
        descripcion: "Investigaciones cualitativas que profundizan en las experiencias y narrativas sobre legitimidad institucional.",
        corta: "Investigaciones cualitativas que profundizan en las experiencias y narrativas sobre legitimidad institucional."
      },
      prensa: {
        titulo: "Estudios de Prensa y Redes Sociales",
        descripcion: "Análisis de contenido de medios de comunicación y redes sociales sobre legitimidad y confianza institucional.",
        corta: "Análisis de contenido de medios de comunicación y redes sociales sobre legitimidad y confianza institucional."
      },
      datos: {
        titulo: "Estudios de Datos Administrativos",
        descripcion: "Análisis de datos administrativos y estadísticos para comprender patrones de legitimidad institucional.",
        corta: "Análisis de datos administrativos y estadísticos para comprender patrones de legitimidad institucional."
      }
    },
    // Acerca
    acerca: {
      descripcion: "El Observatorio de Legitimidad (OLES) es un centro de investigación dedicado al estudio de la legitimidad institucional en Chile.",
      parrafo1: "Nuestro objetivo es generar conocimiento riguroso y de calidad sobre cómo los ciudadanos perciben y evalúan las instituciones públicas, con especial énfasis en las instituciones de seguridad y justicia.",
      parrafo2: "A través de nuestras líneas de investigación, buscamos contribuir al debate público y a la formulación de políticas que fortalezcan la legitimidad democrática."
    },
    // Footer
    footer: {
      derechos: "© 2024 OLES - Observatorio de Legitimidad. Todos los derechos reservados."
    }
  },
  en: {
    // Navigation
    nav: {
      inicio: "Home",
      acerca: "About the Observatory",
      mision: "Mission",
      equipo: "Team",
      investigacion: "Research",
      estudios: "Studies",
      publicaciones: "Academic Publications",
      eventos: "Events",
      noticias: "News",
      contacto: "Contact",
      volverEstudios: "← Back to Studies",
      irInicio: "Go to Home →",
      verEstudios: "View studies →",
      verMas: "View more →",
      verEquipo: "View full profiles →"
    },
    // Sections
    secciones: {
      destacados: "Highlights",
      noticiasRecientes: "Recent News",
      estudios: "Our Research Lines",
      agenda: "Events",
      equipo: "Our Team",
      acerca: "About the Observatory",
      publicaciones: "Academic Publications"
    },
    // Hero
    hero: {
      titulo: "Legitimacy Observatory",
      subtitulo: "Research on institutional legitimacy in Chile"
    },
    // Studies
    estudios: {
      intro: "Learn about the research lines of the Legitimacy Observatory.",
      encuestas: {
        titulo: "Survey Studies",
        descripcion: "Research based on representative surveys that analyze perceptions and attitudes about institutional legitimacy.",
        corta: "Research based on representative surveys that analyze perceptions and attitudes about institutional legitimacy."
      },
      cualitativos: {
        titulo: "Qualitative Studies",
        descripcion: "Qualitative research that delves into experiences and narratives about institutional legitimacy.",
        corta: "Qualitative research that delves into experiences and narratives about institutional legitimacy."
      },
      prensa: {
        titulo: "Press and Social Media Studies",
        descripcion: "Content analysis of media and social networks on legitimacy and institutional trust.",
        corta: "Content analysis of media and social networks on legitimacy and institutional trust."
      },
      datos: {
        titulo: "Administrative Data Studies",
        descripcion: "Analysis of administrative and statistical data to understand patterns of institutional legitimacy.",
        corta: "Analysis of administrative and statistical data to understand patterns of institutional legitimacy."
      }
    },
    // About
    acerca: {
      descripcion: "The Legitimacy Observatory (OLES) is a research center dedicated to the study of institutional legitimacy in Chile.",
      parrafo1: "Our goal is to generate rigorous and quality knowledge about how citizens perceive and evaluate public institutions, with special emphasis on security and justice institutions.",
      parrafo2: "Through our research lines, we seek to contribute to public debate and the formulation of policies that strengthen democratic legitimacy."
    },
    // Footer
    footer: {
      derechos: "© 2024 OLES - Legitimacy Observatory. All rights reserved."
    }
  }
};

// Función para obtener traducción
function t(key, lang = 'es') {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Retorna la clave si no encuentra traducción
    }
  }
  
  return value;
}

// Función para cambiar idioma
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('olesLanguage', lang);
  
  // Actualizar atributo lang del HTML
  document.documentElement.lang = lang;
  
  // Actualizar botones de idioma
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
  
  // Actualizar todos los elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key, lang);
    
    if (translation && translation !== key) {
      if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
        element.placeholder = translation;
      } else if (element.tagName === 'IMG') {
        element.alt = translation;
      } else if (element.hasAttribute('title')) {
        element.title = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

// Variable global para idioma actual
let currentLang = 'es';

// Inicializar idioma al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  // Intentar obtener idioma guardado
  const savedLang = localStorage.getItem('olesLanguage') || 'es';
  changeLanguage(savedLang);
  
  // Agregar event listeners a los botones de idioma
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
});
