export const translations = {
	en: {
		"nav.home": "Home",
		"nav.about": "About",
		"nav.skills": "Skills",
		"nav.projects": "Projects",
		"nav.contact": "Contact",
		"hero.role": "Software Engineer",
		"hero.tagline":
			"I build performant, elegant software \u2014 from low-level optimization to polished user experiences.",
		"hero.projects": "View Projects",
		"hero.contact": "Get in Touch",
		"about.label": "About",
		"about.title": "Who I Am",
		"about.p1":
			"I\u2019m a software engineer passionate about building things that are both <strong>fast</strong> and <strong>beautiful</strong>. I enjoy diving deep into algorithms, system design, and performance optimization just as much as crafting pixel-perfect interfaces.",
		"about.p3":
			"When I\u2019m not coding, you\u2019ll find me exploring new design patterns, contributing to open source projects, or experimenting with creative coding projects like the boid simulation on this page.",
		"about.stat.exp": "Years Experience",
		"about.stat.curious": "Curiosity",
		"skills.label": "Skills",
		"skills.title": "Tech Stack",
		"skills.lang": "Languages",
		"skills.frontend": "Frontend",
		"skills.backend": "Backend",
		"skills.tools": "Tools",
		"projects.title": "Projects and Companies I Worked With",
		"projects.0.title": "HTTP Server",
		"projects.0.desc":
			"A lightweight, high-performance web server built from scratch in C. Demonstrates low-level socket programming, efficient HTTP request parsing, and strict adherence to C standards.",
		"projects.1.title": "Portfolio Website",
		"projects.1.desc":
			"This portfolio \u2014 built with Astro for zero-JS by default, React for interactive islands, and Tailwind CSS for styling.",
		"projects.2.title": "Te Ayudo",
		"projects.2.desc":
			"At Te Ayudo, I led maintenance, performance optimization, and feature development across the company’s digital ecosystem (mobile, web, and back-office platforms).",
		"projects.3.title": "Librito",
		"projects.3.desc":
			"At Librito, I contributed to the development of the landing page and web application, optimizing backend performance and driving intuitive UI/UX design on the frontend.",
		"projects.links": "Links",
		"contact.label": "Contact",
		"contact.title": "Let\u2019s Work Together",
		"contact.desc":
			"Have a project in mind or just want to chat? I\u2019m always open to discussing new opportunities and interesting problems.",
		"contact.button": "Send a Message",
		"footer.rights": "All rights reserved.",
		"footer.built": "Built with",
	},
	es: {
		"nav.home": "Inicio",
		"nav.about": "Sobre m\u00ed",
		"nav.skills": "Habilidades",
		"nav.projects": "Proyectos",
		"nav.contact": "Contacto",
		"hero.role": "Ingeniero de Software",
		"hero.tagline":
			"Construyo software elegante y de alto rendimiento \u2014 desde optimizaci\u00f3n de bajo nivel hasta experiencias de usuario pulidas.",
		"hero.projects": "Ver Proyectos",
		"hero.contact": "Cont\u00e1ctame",
		"about.label": "Sobre m\u00ed",
		"about.title": "Qui\u00e9n Soy",
		"about.p1":
			"Soy un ingeniero de software apasionado por construir cosas que sean tanto <strong>r\u00e1pidas</strong> como <strong>hermosas</strong>. Disfruto profundizar en algoritmos, dise\u00f1o de sistemas y optimizaci\u00f3n de rendimiento tanto como crear interfaces pixel-perfect.",
		"about.p3":
			"Cuando no estoy programando, me encontrar\u00e1s explorando nuevos patrones de dise\u00f1o, contribuyendo a proyectos open source o experimentando con proyectos de c\u00f3digo creativo como la simulaci\u00f3n de boids en esta p\u00e1gina.",
		"about.stat.exp": "A\u00f1os de Experiencia",
		"about.stat.curious": "Curiosidad",
		"skills.label": "Habilidades",
		"skills.title": "Stack Tecnol\u00f3gico",
		"skills.lang": "Lenguajes",
		"skills.frontend": "Frontend",
		"skills.backend": "Backend",
		"skills.tools": "Herramientas",
		"projects.title": "Proyectos y Empresas con las que trabajé",
		"projects.0.title": "Servidor HTTP",
		"projects.0.desc":
			"Servidor web minimalista de alto rendimiento desarrollado desde cero en C. Implementa programación de sockets a bajo nivel y un manejo eficiente de peticiones HTTP con compilación estricta.",
		"projects.1.title": "Portafolio Web",
		"projects.1.desc":
			"Este portfolio \u2014 construido con Astro para cero JS por defecto, React para islas interactivas y Tailwind CSS para estilos.",
		"projects.2.title": "Te Ayudo",
		"projects.2.desc":
			"En Te Ayudo fui responsable del mantenimiento, la optimización de rendimiento y el desarrollo de nuevas funciones para el ecosistema digital de la empresa (aplicación móvil, plataforma web y backoffice).",
		"projects.3.title": "Librito",
		"projects.3.desc":
			"En Librito participé en el desarrollo de la landing page y la plataforma web, asegurando la optimización del rendimiento en el backend y un diseño UI/UX fluido e intuitivo en el frontend.",
		"projects.links": "Enlaces",
		"contact.label": "Contacto",
		"contact.title": "Trabajemos Juntos",
		"contact.desc":
			"\u00bfTienes un proyecto en mente o solo quieres conversar? Siempre estoy abierto a discutir nuevas oportunidades y problemas interesantes.",
		"contact.button": "Enviar Mensaje",
		"footer.rights": "Todos los derechos reservados.",
		"footer.built": "Construido con",
	},
} as const;

export type Lang = keyof typeof translations;
