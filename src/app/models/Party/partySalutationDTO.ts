/**
 * Interface PartySalutationDTO
 *
 * code - Código que identifica a mensagem de salutation (partilhada entre vários Parties)
 * description - Descripção que identifica o PartyStatus para o locale actual
 * detailedDescription - Mapa das descrições usadas por locale
 * enabled - indicação se está activo
 * createdOn - Data de criação da Salutation
 * updatedOn - Data de update do Salutation
 * 
 */
export interface PartySalutationDTO {

    code: string;
    description: string;
    detailedDescription?: Map<string, string>;
    enabled?: boolean;
    createdOn?: Date;
    updatedOn?: Date;
}
