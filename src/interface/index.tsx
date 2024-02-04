export interface StoreType {
  id: number;
  phone?: string | null;
  storeType?: string | null;
  category?: string | null;
  name?: string | null;
  lng?: string | null;
  lat?: string | null;
  address?: string | null;
  foodCertifyName?: string | null;
  likes?: LikeInterface[];
  comments?: CommentInterface[];
}

export interface UserType {
  id: number;
  email: string;
  name?: string | null;
  image?: string | null;
}

// comment
export interface CommentInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
  body: string;
  user?: UserType;
  createdAt: Date;
}
export interface CommentAPIResponse {
  data: CommentInterface[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

// like
export interface LikeInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
}
export interface LikeAPIResponse {
  data: LikeInterface[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface StoreAPIResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface SearchType {
  q?: string;
  district?: string;
}
