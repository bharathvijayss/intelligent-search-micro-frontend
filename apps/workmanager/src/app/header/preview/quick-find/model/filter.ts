interface ISubfilter {
  name: string;
  completed: boolean;
  type: string;
}

export interface IFilter {
  name: string;
  completed: boolean;
  indeterminate: boolean;
  subfilters: ISubfilter[];
}
