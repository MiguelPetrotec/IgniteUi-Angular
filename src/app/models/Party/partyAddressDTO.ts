/**
 * Interface PartyAddressDTO
 *
 * street - Rua
 * postalZipCode - Código postal
 * city - cidade
 * postOfficeBox - numero da caixa de correio (usado em alguns locais)
 * postOfficeCode - código da caixa de correio (usado em alguns locais)
 * countryCode - código do país
 * description - Descripção que identifica a descripção para o locale actual
 * detailedDescription - Mapa das descrições usadas por locale
 * enabled - indicação se está activo
 * createdOn - Data de criação do Endereço
 * updatedOn - Data de update do Endereço
 * 
 */
export interface PartyAddressDTO {

    code: number;
    street: string;
    postalZipCode: string;
    city: string;
    postOfficeBox?: string;
    postOfficeCode?: string;
    countryCode: string;
    description: string;
    detailedDescription?: Map<string, string>;
    isDefault: boolean;
    createdOn: Date;
    updatedOn?: Date;




}
