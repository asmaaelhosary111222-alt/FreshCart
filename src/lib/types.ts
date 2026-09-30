export interface Product {
  id: string;

  title: string;

  price: number;

  imageCover: string;

  category?: string | {
    _id: string;
    name: string;
  };

  ratingsAverage?: number;

  ratingsQuantity?: number;

  priceAfterDiscount?: number;

  images?: string[];

  quantity?: number;

  sold?: number;

  description?: string;

  brand?: {
    name: string;
  };

  subcategory?: {
    name: string;
  }[];

  reviews?: {
    rating: number;
  }[];
}

export interface CartProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;

  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };

  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };

  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];

  ratingsAverage: number;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface CartData {
  _id?: string;
  cartOwner?: string;
  products: CartItem[];
  createdAt?: string;
  updatedAt?: string;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string | null;
  data: CartData;
}


export interface UserAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}


export interface Order {
  _id: string;
  id: number;
  createdAt: string;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
    postalCode?: string;
  };
  cartItems: OrderCartItem[];
}


export interface OrderProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
}

export interface OrderCartItem {
  count: number;
  price: number;
  product: OrderProduct;
}

export interface OrderShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

