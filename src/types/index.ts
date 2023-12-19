export type IResponse<TData> = {
    data: TData
} | {
    error: string;
}