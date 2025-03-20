
export type apiBaseResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: apiBaseShortResponse[];
}

export type apiBaseShortResponse = {
    name: string;
    url: string;
}

export type apiSingleItemResponse = {
    id: number;
    name: string;
}