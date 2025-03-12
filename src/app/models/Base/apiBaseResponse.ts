
export type apiBaseResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export type apiBaseShortResponse = {
    name: string;
    url: string;
}

export type apiSingleItemResponse = {
    id: number;
    name: string;
}