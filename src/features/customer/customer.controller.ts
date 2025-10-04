import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './customer.validation';

import { type AuthenticatedRequest } from '@/shared/express/express.types';

@Controller('/customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('/')
  createCustomer(
    @Req() req: AuthenticatedRequest,
    @Body() body: CreateCustomerDto,
  ) {
    return this.customerService.createCustomer(body, req.user.organizationId);
  }

  @Get('/')
  getCustomers(@Req() req: AuthenticatedRequest) {
    return this.customerService.getCustomers(req.user.organizationId);
  }
}
