import { AsyncValidationOptions, ValidationError, ValidationOptions } from "joi";

export type IResponse<TData> = {
    data: TData
} | {
    error: string;
}

export interface ValidationResult<TResult = any> {
    value: TResult;
    error?: ValidationError;
    warning?: ValidationError;
}

export interface ObjectSchema<TSchema = any> {
    validate(value: any, options?: ValidationOptions): ValidationResult<TSchema>;
    validateAsync(value: any, options?: AsyncValidationOptions): Promise<TSchema>;
}