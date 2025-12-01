import {CreateApiKeyDto } from "./apikey.model";

export interface Client {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    apiKeys?: CreateApiKeyDto[];
}