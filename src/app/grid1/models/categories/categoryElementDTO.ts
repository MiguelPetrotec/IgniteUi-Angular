export interface CategoryElementDTO {
    code: string;
    categoryCode: string;
    parentCategoryElementCode: string;
    description: string;
    categoryDescription: string;
    detailedDescription: string[];
    elements: CategoryElementDTO[];
    itemAllowed: boolean;
    associatedItems: number;
    createdOn: string;
    updatedOn: string;
}
