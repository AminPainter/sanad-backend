import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '@/features/customer/customer.repository';
import { TicketRepository } from '@/features/ticket/ticket.repository';
import { IInboundEmail } from '@/features/email-reader/interfaces/inbound-email.interface';

@Injectable()
export class CreateTicketFromEmail {
  constructor(
    private customerRepository: CustomerRepository,
    private ticketRepository: TicketRepository,
  ) {}

  async execute(inboundEmail: IInboundEmail, organizationId: string) {
    const customer = await this.customerRepository.findOrCreateByEmail(
      inboundEmail.from.emailAddress,
      organizationId,
    );

    const ticket = await this.ticketRepository.create({
      channel: 'EMAIL',
      title: inboundEmail.subject,
      customer: {
        connect: {
          id: customer.id,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    });

    return ticket;
  }
}
