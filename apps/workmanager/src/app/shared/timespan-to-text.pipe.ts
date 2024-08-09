/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from "@angular/core";

export class TimeSpan {
  constructor(
    public d?: number,
    public h?: number,
    public m?: number,
    public s?: number,
    public ms?: number,
    // tslint:disable-next-line: variable-name
    public is_negative?: boolean
  ) {
    this.d = d || 0;
    this.h = h || 0;
    this.m = m || 0;
    this.s = s || 0;
    this.ms = ms || 0;
    this.is_negative = is_negative === true;
  }
  static parse(input: number | string): TimeSpan {
    const o = new TimeSpan(0, 0, 0, 0, 0);

    if (typeof input === "string") {
      if (input.startsWith("-")) {
        o.is_negative = true;
        input = input.substring(1);
      }

      const p: string[] = input.split(":");

      // Parse hours and days
      const hourDayPart = p[0].split(".");
      o.h = parseInt(hourDayPart.pop() || "0", 10); // Parse hours
      o.d = hourDayPart.length ? parseInt(hourDayPart.pop() || "0", 10) : 0; // Parse days if present

      // Parse minutes
      o.m = parseInt(p[1] || "0", 10);

      // Parse seconds and milliseconds
      const secondsPart = p[2]?.split(".") || [];
      o.s = parseInt(secondsPart[0] || "0", 10); // Parse seconds
      o.ms = secondsPart.length === 2 ? parseInt(secondsPart[1] || "0", 10) : 0; // Parse milliseconds if present
    }

    if (typeof input === "number") {
      if (input < 0) {
        o.is_negative = true;
        input *= -1;
      }
      o.ms = [864e5, 36e5, 6e4, 1e3].reduce((v, u, i) => {
        switch (i) {
          case 0:
            o.d = Math.floor(v / u);
            break;
          case 1:
            o.h = Math.floor(v / u);
            break;
          case 2:
            o.m = Math.floor(v / u);
            break;
          case 3:
            o.s = Math.floor(v / u);
            break;
        }
        return v % u;
      }, input as number);
    }
    return o;
  }

  static format(
    input: TimeSpan,
    format: string,
    formatForNagetive?: string
  ): string {
    input = input || new TimeSpan();
    format = format || "{?S}{hh+}:{mm}:{ss}";

    if (input.is_negative && formatForNagetive) {
      format = formatForNagetive;
    }

    if (typeof format === "string") {
      format = format
        .replace(/\{S\}/gm, input.is_negative ? "-" : "+")
        .replace(/\{\?S\}/gm, input.is_negative ? "-" : "")
        .replace(/\{\?SS\}/gm, input.is_negative ? "-" : " ");
      format = format
        .replace(
          /\{hh\+\}/gm,
          String((24 * (input.d ?? 0) + (input.h ?? 0))).padStart(2, "0")
        )
        .replace(
          /\{h\+\}/gm,
          String(24 * (input.d ?? 0) + (input.h ?? 0)).padStart(1, "0")
        );
      format = format
        .replace(/\{dd\}/gm, String(input.d).padStart(2, "0"))
        .replace(/\{d\}/gm, String(input.d).padStart(1, "0"));
      format = format
        .replace(/\{hh\}/gm, String(input.h).padStart(2, "0"))
        .replace(/\{h\}/gm, String(input.h).padStart(1, "0"));
      format = format
        .replace(/\{mm\}/gm, String(input.m).padStart(2, "0"))
        .replace(/\{m\}/gm, String(input.m).padStart(1, "0"));
      format = format
        .replace(/\{ss\}/gm, String(input.s).padStart(2, "0"))
        .replace(/\{s\}/gm, String(input.s).padStart(1, "0"));
      format = format.replace(/\{ms\}/gm, String(input.ms).padStart(3, "0"));
    }
    return format;
  }

  //  totalMilliseconds(): number {
  //             return (
  //                   (this.is_negative ? -1 : 1) *
  //                   [864e5, 36e5, 6e4, 1e3].reduce((v, u, i) => {
  //                         switch (i) {
  //                               case 0:
  //                                     return v + u * this.d;
  //                                     break;
  //                               case 1:
  //                                     return v + u * this.h;
  //                         break;
  //                     case 2:
  //                         return v + u * this.m;
  //                         break;
  //                     case 3:
  //                         return v + u * this.s;
  //                         break;
  //                 }
  //             }, this.ms)
  //         );
  //     }
}

@Pipe({
  name: "timeToText",
  standalone: true
})
export class TimespanToTextPipe implements PipeTransform {
  static transform(value: any, ...args: any[]): any {
    const fm0 = args ? args[0] : null;
    const fm1 = args ? args[1] : null;
    if (typeof value === "string") {
      return TimeSpan.format(TimeSpan.parse(value), fm0, fm1);
    }
    if (typeof value === "number") {
      return TimeSpan.format(TimeSpan.parse(value), fm0, fm1);
    }
    return value;
  }

  transform(value: any, ...args: any[]): any {
    return TimespanToTextPipe.transform(value, ...(args || []));
  }
}
