import { type Lang, translations } from "./translations";

const STORAGE_KEY = "lang";

export function getLang(): Lang {
	if (typeof window === "undefined") return "en";
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === "es" || stored === "en" ? stored : "en";
}

export function setLang(lang: Lang) {
	if (typeof window === "undefined") return;
	localStorage.setItem(STORAGE_KEY, lang);
	applyTranslations(lang);
	document.documentElement.lang = lang;
}

export function toggleLang() {
	const current = getLang();
	setLang(current === "en" ? "es" : "en");
}

function applyTranslations(lang: Lang) {
	const t = translations[lang];
	const elements = document.querySelectorAll<HTMLElement>("[data-i18n]");
	for (const el of elements) {
		const key = el.dataset.i18n;
		if (key && key in t) {
			el.textContent = t[key as keyof typeof t];
		}
	}

	const htmlElements =
		document.querySelectorAll<HTMLElement>("[data-i18n-html]");
	for (const el of htmlElements) {
		const key = el.dataset.i18nHtml;
		if (key && key in t) {
			el.innerHTML = t[key as keyof typeof t];
		}
	}
}

export function initI18n() {
	const lang = getLang();
	document.documentElement.lang = lang;
	applyTranslations(lang);
}
