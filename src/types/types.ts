export interface BaseEntity {
  "@context"?: string;
  "@id": string;
  "@type": string[];
}

export interface BookView extends BaseEntity {
  author: string;
  book: string;
  condition: string;
  rating: number;
  title: string;
}

export interface DataBooks extends BaseEntity {
  author: string;
  book: string;
  condition: string;
  rating: number;
  title: string;
}

export interface DataReviews extends BaseEntity {
  author: string;
  book: string;
  condition: string;
  rating: number;
  title: string;
}

export interface State<T> {
  "@id": string;
  "@type": string[];
  isLoading: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}


export interface Review extends BaseEntity {

  body: {
    "@id": string;
    id?: number
    "@type": string[];
    author: string;
    title: string;
  };
  publishedAt: string;
  rating: number;
  user: {
    "@id": string;
    "@type": string;
    firstName: string;
    lastName: string;
    name: string;
  };
}


export interface BookData {
  "@id": string;
  "@type": string[];
  author: string;
  book: string;
  condition: string;
  title: string;
}

export interface Response<T extends BaseEntity> {
  id: string;
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": T[];
  "hydra:search": {
    "@type": string;
    "hydra:template": string;
    "hydra:variableRepresentation": string;
    "hydra:mapping": {
      "@type": string;
      variable: string;
      property: string;
      required: boolean;
    };
  };
  "hydra:totalItems": number;
  "hydra:view": {
    "@id": string;
    "@type": string;
    "hydra:first": string;
    "hydra:last": string;
    "hydra:next": string;
  };
}
