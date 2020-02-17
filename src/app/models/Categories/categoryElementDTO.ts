import { CategoryUsageDTO } from './categoryUsageDTO';

/**
 * Interface CategoryElementDTO
 *
 * code - Category Element Code
 * categoryCode - Category Code
 * parentCategoryElementCode - Category Element Parent Code
 * description - Description
 * detailedDescription - Detailed descriptions
 * elements - ???
 * itemAllowed - Indicator if the item is allowed
 * associatedItems - Number of items associated with this category element
 * createdOn - Creation Date of Category Usage
 * updatedOn - Update Date of Category Usage
 * 
 */


export interface CategoryElementDTO {

    code: string;
    categoryCode: string;
    parentCategoryElementCode: string;
    description: string;
    detailedDescription: any;
    elements: any;
    itemAllowed: boolean;
    associatedItems: number;    
    createdOn: Date;
    updatedOn: Date;
}
