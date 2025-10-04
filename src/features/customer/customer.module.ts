import { Module } from '@nestjs/common';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';

@Module({
  providers: [CustomerService, CustomerRepository],
  controllers: [CustomerController],
  exports: [CustomerRepository],
})
export class CustomerModule {}
