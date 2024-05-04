export interface BaseEntity {
  "@context": string;
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

export interface State<T extends BaseEntity> {
  isLoading: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
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
