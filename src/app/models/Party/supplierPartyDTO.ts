import { PartyDTO } from './partyDTO';

/**
 * Interface SupplierPartyDTO
 *
 * supplierCode - Supplier identification code
 * supplierCreatedOn - Creation Date of SupplierParty
 * supplierUpdatedOn - Update Date of SupplierParty
 * 
 */

export interface SupplierPartyDTO extends PartyDTO {

    supplierCode: string;
    supplierUpdatedOn?: Date;
    supplierCreatedOn?: Date;
}
