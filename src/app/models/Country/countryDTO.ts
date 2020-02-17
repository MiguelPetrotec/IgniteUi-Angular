/**
 * Interface CountryDTO
 *
 * id - Identificador do País
 * code - Código que identifica o País
 * description - Descripção que identifica o País
 * descriptionJson - Mapa das descrições usadas por locale
 * alpha2Code - Código alpha2
 * alpha3Code - Código alpha3
 * numericCode - Código numérico
 * 
 */
export interface CountryDTO {

    id?: number
    code: string;
    description: string;
    descriptionJson?: Map<string, string>;
    alpha2Code?: string;
    alpha3Code?: string;
    numericCode?: string;
}
