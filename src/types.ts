export type ProductType = {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    rating: {
      rate: number,
      count: number
    }
}

export type ProductCartItemType = {
  title: string,
  price: number,
  image: string,
}

export type DeepProductType = {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    rating: {
      rate: number,
      count: number
    },
    category:string
}

export type ProductCardType = {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    rating: {
      rate: number,
      count: number
    },
    handleCardClick: HandleCardClick
}
// Тип без параметров, просто типизация события клика
//export type HandleCardClick = React.MouseEventHandler<HTMLDivElement>
export type HandleCardClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => void;
