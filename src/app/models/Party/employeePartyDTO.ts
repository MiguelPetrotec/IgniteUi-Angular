import { PartyDTO } from './partyDTO';
import { CustomerPartyDTO } from './customerPartyDTO';

/**
 * Interface EmployeePartyDTO
 *
 * employeeCode - Employee identification code
 * employeeCreatedOn - Creation Date of EmployeeParty
 * employeeUpdatedOn - Update Date of EmployeeParty
 * 
 */

export interface EmployeePartyDTO extends PartyDTO {

    employeeCode: string;
    employeeCustomer: CustomerPartyDTO;
    employeeUpdatedOn?: Date;
    employeeCreatedOn?: Date;
}
