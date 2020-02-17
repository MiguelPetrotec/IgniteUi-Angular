import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface AppMessage {
    message: string;
    owner: string;
    severity: string;
    timestamp: number;
}
