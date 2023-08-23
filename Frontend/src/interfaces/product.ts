 export interface IProduct {
    id: any;
    productName: string;
    imgUrl: string;
    category: string;
    price: number;
    shortDesc: string;
    description: string;
    reviews: {
      rating: number;
      text: string;
    }[];
    avgRating: number;
  }