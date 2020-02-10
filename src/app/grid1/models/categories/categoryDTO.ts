import { CategoryElementDTO } from './categoryElementDTO';

export interface CategoryDTO {
    code: string;
    categoryUsages: any[]; // CategoryUsageDTO
    description: string;
    detailedDescription: string[];
    categoryElements: CategoryElementDTO[];
    mandatory: boolean;
    enabled: boolean;
    createdOn: string;
    updatedOn: string;
    contractLimits: any; // ContractLimitDTO
}
