import { Payment } from "./payment.model";

export class Sale {
    constructor(private customer_id, private location_name,
        private operator_name, private opening_debt, private currency, private sale_invoice_number, private payments: Payment[]) { }
}