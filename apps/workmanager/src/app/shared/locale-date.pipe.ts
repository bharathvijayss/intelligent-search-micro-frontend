import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'en8LocaleDate',
  standalone: true
})
export class LocaleDatePipe implements PipeTransform {

  static transform(date: Date | string, mode?: "d" | "t" | "df" | "dt" | "tf"): string | null {
    switch (mode) {
      case "dt":
        return formatLocaleDate(date, getDateTimeFormat());
      case "t":
        return formatLocaleDate(date, getTimeFormat());
      case "df":
        return getDateFormat();
      case "tf":
        return getTimeFormat();
      default:
        return formatLocaleDate(date, getDateFormat());
    }
  }

  transform(
    date: Date | string | null,
    mode?: "d" | "t" | "df" | "dt" | "tf"
  ): string | null {
    if (!date) {
      return date;
    }
    return LocaleDatePipe.transform(date, mode);
  }

}

export function getTimeFormat() {
  return "HH:mm";
}

export function getDateFormat() {
  return "dd/MM/yyyy";
}

export function getDateTimeFormat() {
  return `${getDateFormat()} ${getTimeFormat()}`;
}

export const DEFAULT_LANGUAGE = "en-gb";

export function getBrowserLocaleCode() {
  const lang = (
    navigator.language ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).userLanguage ||
    DEFAULT_LANGUAGE
  )
    .trim()
    .toLowerCase();
  if (lang.match(/de/i)) {
    return "de-de";
  } else if (lang.match(/ru/i)) {
    return "ru-ru";
  } else if (lang.match(/ro/i)) {
    return "ro-ro";
  } else if (lang.match(/hu/i)) {
    return "hu-hu";
  } else if (lang.match(/pl/i)) {
    return "pl-pl";
  } else if (lang.match(/fr/i)) {
    return "fr-fr";
  } else if (lang.match(/es/i)) {
    return "es-419";
  } else if (lang.match(/pt/i)) {
    return "pt-br";
  } else if (lang.match(/en-us/i)) {
    return "en-us";
  } else {
    return "en-gb";
  }
}

export function getLanguage() {
  return (
    getBrowserLocaleCode()
  ).toLowerCase();
}

export function getAngularLocaleCode(userLanguageCode: string) {
  userLanguageCode = (userLanguageCode || DEFAULT_LANGUAGE)
    .trim()
    .toLowerCase();
  switch (userLanguageCode) {
    case "pt-br":
      return "pt";
    case "fr-fr":
      return "fr";
    case "pl-pl":
      return "pl";
    case "hu-hu":
      return "hu";
    case "ro-ro":
      return "ro";
    case "ru-ru":
      return "ru";
    case "de-de":
      return "de";
    case "en-us":
      return "en";
    case "art-x-reverse":
      return "en-gb";
  }
  return userLanguageCode;
}

export function getLocale() {
  return getAngularLocaleCode(getLanguage());
}

export function formatLocaleDate(date: Date | string, format?: string) {
  format = format || getDateFormat();
  if (!date) {
    return null;
  } else if (typeof date === "string") {
    const o = new Date(date);
    return isNaN(o.getFullYear())
      ? null
      : formatDate(date, format, getLocale());
  } else {
    return formatDate(date, format, getLocale());
  }
}
