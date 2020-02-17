/**
 * Interface CategoryUsageDTO
 *
 * code - Category Usage Code
 * description - Description
 * enabled - Indicator if the element is active
 * createdOn - Creation Date of Category Usage
 * updatedOn - Update Date of Category Usage
 * 
 */


export interface CategoryUsageDTO {

    code: string;
    description: any;
    enabled: boolean;
    createdOn: Date;
    updatedOn: Date;
}
