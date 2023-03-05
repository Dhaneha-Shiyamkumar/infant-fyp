export interface Weight {
  month: string;
  value: number;
}

export interface Height {
  month: string;
  value: number;
}

export interface Attributes {
  weight: Weight[];
  height: Height[];
}

export interface IChild {
  _id: string;
  firstName: string;
  lastName: string;
  attributes: Attributes;
  __v: number;
}
