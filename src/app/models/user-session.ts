export class UserSession {
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    entity_id?: number;
    entity_type?: string;
    expires_in?: number;
    scope?: string;
    locale?: string;
    tenant_id: number;
}
