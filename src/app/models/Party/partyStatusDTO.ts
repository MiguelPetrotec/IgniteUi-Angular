/**
 * Interface PartyStatusDTO
 *
 * code - Código que identifica o PartyStatus
 * description - Descripção que identifica o PartyStatus
 * detailedDescription - Mapa das descrições usadas por locale
 * enabled - indicação se está activo
 * createdOn - Data de criação do PartyStatus
 * updatedOn - Data de update do PartyStatus
 * 
 */

export interface PartyStatusDTO {

    code: string;
    description?: string;
    detailedDescription?: Map<string, string>;
    enabled?: boolean;
    createdOn?: Date;
    updatedOn?: Date;
}
