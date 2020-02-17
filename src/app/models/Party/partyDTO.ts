import { PartyRoleDTO } from './partyRoleDTO';
import { PartySalutationDTO } from './partySalutationDTO';
import { PartyStatusDTO } from './partyStatusDTO';
import { PartyContactDTO } from './partyContactDTO';
import { PartyAddressDTO } from './partyAddressDTO';

/**
 * Interface PartyDTO
 *
 * code - Código identificador do partner
 * vatIn - Nif do Party
 * name - Name do Party
 * birthday - Data de 'nascimento' do Party
 * status - Enum do estado do Party (ENABLED, DISABLED, BLOCKED)
 * salutation - Dto de salutation
 * roles - Lista de Roles do Party
 * contacts - Lista de Contactos do Party
 * addresses - Lista de Endereços do Party
 * additionalData - Para extensão
 * createdOn - Data de criação do Party
 * updatedOn - Data de update do Party
 * 
 */

export interface PartyDTO {

    code: string;
    vatin: string;
    name: string;
    birthday: Date;
    status: PartyStatusDTO;
    salutation: PartySalutationDTO;
    roles: PartyRoleDTO;
    contacts: PartyContactDTO[];
    addresses: PartyAddressDTO[];
    additionalData: Map<string, string>;
    createdOn: Date;
    updatedOn: Date;
}
