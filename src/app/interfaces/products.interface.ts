export interface IProduct {
  name: string;
  price: number;
  image: string;
  id: string;
  features: IFeatures;
}
export interface IFeatures {
  Бренд: string;
  Модель: string;
  'Материал корпуса': string;
  'Тип аккумулятора': string;
  'Время работы от аккумулятора': string;
  'Время зарядки': string;
}
