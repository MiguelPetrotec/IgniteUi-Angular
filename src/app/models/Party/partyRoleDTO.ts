/**
 * Interface PartyRoleDTO
 *
 * code - Código que identifica a Role (CUSTOMER, EMPLOYEE, SUPPLIER)
 * description - Descripção que identifica o PartyRole para o locale actual
 * detailedDescription - Mapa das descrições usadas por locale
 * enabled - indicação se está activo
 * createdOn - Data da associação do Role
 * updatedOn - Data de update do Role
 * 
 */
export interface PartyRoleDTO {

    code: string;
    description: string;
    detailedDescription: Map<string, string>;
    enabled: boolean;
    createdOn: Date;
    updatedOn?: Date;
}
