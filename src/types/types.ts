export interface Response {
  id: string;
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": DataBooks[] | DataReviews[];
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

export interface DataBooks {
  "@id": string;
  "@type": string[];
  author: string;
  book: string;
  condition: string;
  id: string;
  rating: number;
  title: string;
}

export interface DataReviews {
  "@id": string;
  "@type": string[];
  author: string;
  book: string;
  condition: string;
  id: string;
  rating: number;
  title: string;
}

export interface State {
  isLoading: boolean;
  data: DataReviews[] | DataBooks[];
  total: number;
  page: number;
  pageSize: number;
}
