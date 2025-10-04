import { Injectable } from '@nestjs/common';

import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './customer.validation';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  createCustomer(data: CreateCustomerDto, organizationId: string) {
    return this.customerRepository.createCustomer(data, organizationId);
  }

  getCustomers(organizationId: string) {
    return this.customerRepository.getCustomers(organizationId);
  }
}
