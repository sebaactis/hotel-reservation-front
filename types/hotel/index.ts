export interface HotelResponse {
    message: string;
    statusCode: string;
    entity: {
        seed: string;
        page: Page<Hotel>;
    };
}

export interface Page<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Hotel {
    id: number;
    name: string;
    location: string;
    features: string[];
    description: string;
    price: number;
    score: number;
    phone: number;
    policies: Policy[];
    email: string;
    category: string;
    images: Image[];
}

export interface HotelWithFeatures {
    id: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    price: number;
    features: { name: string; icon: JSX.Element }[];
    policies: Policy[];
    score: number;
    phone: number;
    email: string;
    category: string;
}

export interface Policy {
    id: number;
    title: string;
    description: string;
}

export interface Image {
    url: string;
}