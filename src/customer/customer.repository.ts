import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './customer.validation';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  createCustomer(data: CreateCustomerDto, organizationId: string) {
    return this.prisma.customer.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }

  getCustomers(organizationId: string) {
    return this.prisma.customer.findMany({
      where: { organizationId },
    });
  }

  async findOrCreateByEmail(email: string, organizationId: string) {
    let customer = await this.prisma.customer.findFirst({
      where: { email },
    });
    if (!customer) {
      customer = await this.prisma.customer.create({
        data: {
          email,
          organizationId,
        },
      });
    }
    return customer;
  }
}
