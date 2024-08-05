import { Signal } from "@angular/core";

interface ISubfilter {
  name: string;
  completed: Signal<boolean>;
  type: string;
}

export interface IFilter {
  name: string;
  state: Signal<{ completed: boolean, indeterminate: boolean }>;
  subfilters: ISubfilter[];
}
