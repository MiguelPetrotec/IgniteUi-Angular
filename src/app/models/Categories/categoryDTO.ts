import { CategoryUsageDTO } from './categoryUsageDTO';
import { CategoryElementDTO } from './categoryElementDTO';

/**
 * Interface CategoryDTO
 *
 * code - Category Usage Code
 * categoryUsages - Category Usages list
 * description - Description
 * detailedDescription - Detailed descriptions
 * categoryElements - List of Category Elements
 * mandatory - indicator if this item is mandatory
 * enabled - Indicator if the element is active
 * createdOn - Creation Date of Category
 * updatedOn - Update Date of Category
 * 
 */


export interface CategoryDTO {

    code: string;
    categoryUsages?: CategoryUsageDTO[];
    description: string;
    detailedDescription?: any;
    categoryElements?: CategoryElementDTO[];
    mandatory?: boolean;    
    enabled?: boolean;
    createdOn?: Date;
    updatedOn?: Date;
}
