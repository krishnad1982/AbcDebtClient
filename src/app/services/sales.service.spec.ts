import { TestBed, inject } from '@angular/core/testing';
import { SalesService } from './sales.service';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';

describe('SalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SalesService]
    });
  });

  it('should be created', inject([SalesService], (service: SalesService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should get uuid data successful', inject([SalesService], (service: SalesService) => {
    let uuidaData = service.generateUniqueId();
    expect(uuidaData).not.toBeNull();
  }));

  it('should currency list be three', inject([SalesService], (service: SalesService) => {
    let currencyList = service.getCurrencyList();
    expect(currencyList).not.toBeNull();
    expect(currencyList.length).toBe(3);
  }));
});
