import { Pipe, PipeTransform } from '@angular/core';
import { ExceptionStatusRedColor, StatusColors, StatusIconClasses, StatusIcons } from './status';
import { TranslateService } from '@ngx-translate/core';
import { PacketResolutionMethod, PacketStatus } from './dto';

export type ReturnType = "icon" | "color" | "code" | "title" | 'class';

@Pipe({
  name: "status",
  pure: true,
  standalone: true
})
export class StatusPipe implements PipeTransform {
  private _locale = null;
  get locale() {
    return (this._locale =
      this._locale || this.translate.instant("status"));
  }
  constructor(private translate: TranslateService) { }
  transform(
    status: PacketStatus,
    type: ReturnType,
    resolutionMethod?: PacketResolutionMethod,
    problem?: boolean
  ): string {
    switch (type) {
      case "color":
        {
          return [6, 9, 100, 101, 102].includes(resolutionMethod ?? -1) ||
            problem === true
            ? ExceptionStatusRedColor
            : StatusColors[status] || "";
        }
      case "icon":
        {
          return StatusIcons[status] || "";
        }
      case "title":
        {
          return this.locale[status] || "";
        }
      case 'class':
        {
          return StatusIconClasses[status] || "";
        }
    }
    return "";
  }
}
