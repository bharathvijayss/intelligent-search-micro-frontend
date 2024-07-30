import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";
import merge from 'lodash-es/merge';
import { Observable, of } from "rxjs";
import { concatMap, map } from "rxjs";

const EN_GB_CODE = "en-gb";

export class CustomLocaleJsonFileLoader implements TranslateLoader {

  private enGB: unknown = null;

  constructor(private http: HttpClient = inject(HttpClient)) { }

  getTranslation(lang: string): Observable<unknown> {
    lang = (lang || "").toLowerCase();
    return lang === EN_GB_CODE && this.enGB
      ? of(this.enGB)
      : this.http.get(this.getPath(lang)).pipe(
        concatMap(resp => {
          if (lang === EN_GB_CODE) {
            this.enGB = resp;
            return of(resp);
          }

          return this.enGB
            ? of(resp)
            : this.http.get(this.getPath(EN_GB_CODE)).pipe(
              map(enGB => {
                this.enGB = enGB;
                return resp;
              })
            );
        }),
        map(resp => {
          return merge({}, this.enGB, resp); // Doing a Deep JSON Merge here.
        })
      );
  }

  private getPath(lang: string) {
    return `${location.origin}/i18n/${lang}.json`
  }

}
