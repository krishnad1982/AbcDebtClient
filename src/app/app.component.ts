import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from './services/sales.service';
import { NgForm } from '@angular/forms';
import { Sale } from './shared/sale.model';
import { Payment } from './shared/payment.model';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('frm') saleForm: NgForm;
  customerId = '';
  invoiceNumber = ''
  location = '';
  currencyList = [];
  errorMessage: string = '';

  constructor(private salesService: SalesService, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.configureInitialize();
  }

  private configureInitialize = () => {
    this.customerId = this.salesService.generateUniqueId();
    this.invoiceNumber = this.salesService.generateUniqueId();
    this.currencyList = this.salesService.getCurrencyList();
  }

  onSubmit = (form: NgForm) => {
    const formValue = form.value;
    const payment: Array<Payment> = [];
    payment.push(new Payment(formValue.description, formValue.amount));
    const sale = new Sale(this.customerId, formValue.location, formValue.operator, formValue.debt, formValue.currency, this.invoiceNumber, payment);
    this.salesService.captureSaleAndPaymentDetails(sale);
  }

  onClear = () => {
    this.saleForm.reset();
    this.configureInitialize();
    this.errorMessage = '';
  }

  getErrorDetails = () => {
    this.errorMessage = this.notificationService.message[0];
  }
}