export type ProductId = number
export type ProductsQuantity = number

export type ProductType = {
    id: ProductId,
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

export type ProductCartItemType = {
  id:ProductId,
  quantity:ProductsQuantity
}

export type ProductCardType = {
    id: ProductId
    quantity?:ProductsQuantity
    handleCardClick:HandleCardClick
}

export type StatusType = 'fulfilled' | 'pending' | 'rejected' | 'idle'
// Тип без параметров, просто типизация события клика
//export type HandleCardClick = React.MouseEventHandler<HTMLDivElement>
export type HandleCardClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => void;
