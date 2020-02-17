import { PartyDTO } from './partyDTO';

/**
 * Interface CustomerPartyDTO
 *
 * customerCode - Customer identification code
 * customerCreatedOn - Creation Date of CustomerParty
 * customerUpdatedOn - Update Date of CustomerParty
 * 
 */

export interface CustomerPartyDTO extends PartyDTO {

    customerCode: string;
    customerUpdatedOn?: Date;
    customerCreatedOn?: Date;
}
