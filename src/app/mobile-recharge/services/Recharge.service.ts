import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export interface RechargeForm {
    provider: number;
    amount: number;
    phone: string;
}

@Injectable({
    providedIn: 'root'
})
export class RechargeService {

    constructor(
        private _httpClient: HttpClient
    ) {

    }

    recharge(form: RechargeForm) {
        return this._httpClient.post('/api/v1/recharge', form)
    }
}