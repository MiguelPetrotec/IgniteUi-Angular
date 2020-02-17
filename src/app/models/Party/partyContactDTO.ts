/**
 * Interface PartyContactDTO
 *
 * code - codigo interno
 * contactMethodCode - Código do tipo de contacto que esta a ser descrito
 * additionalData - Para permitir alguma extensibilidade
 * description - Descrição do contacto usado
 * detailedDescription - Mapa das descrições usadas por locale
 * createdOn - Data de criação do Contacto
 * updatedOn - Data de update do Contacto
 * 
 */
export interface PartyContactDTO {

    code?: number;
    contactMethodCode: string;
    additionalData?: any;
    contact: string;
    description?: string;
    detailedDescription?: Map<string, string>;
    createdOn?: Date;
    updatedOn?: Date;
}
