import {CreateApiKeyDto } from "../api/apikey.model";

export interface Client {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    apiKeys?: CreateApiKeyDto[];
}