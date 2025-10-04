import { Module } from '@nestjs/common';

import { EmailReaderFactory } from './factories/email-reader.factory';

@Module({
  exports: [EmailReaderFactory],
  providers: [EmailReaderFactory],
})
export class EmailReaderModule {}
