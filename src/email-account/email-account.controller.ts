import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConnectEmailAccountService } from './services/connect-email-account.service';
import {
  ConnectEmailAccountParamsDto,
  HandleEmailAccountConnectionCallbackParamsDto,
  HandleEmailAccountConnectionCallbackQueryDto,
} from './email-account.validation';
import { SkipJwtAuth } from 'src/auth/auth.decorator';

@Controller('/email-accounts')
export class EmailAccountController {
  constructor(private connectEmailAccountService: ConnectEmailAccountService) {}

  @Post('/:provider/connect')
  connectEmailAccount(@Param() params: ConnectEmailAccountParamsDto) {
    const connectionUrl = this.connectEmailAccountService.connect(
      params.provider,
    );
    return { connectionUrl };
  }

  @SkipJwtAuth()
  @Get('/:provider/callback')
  async handleEmailAccountConnectionCallback(
    @Param() params: HandleEmailAccountConnectionCallbackParamsDto,
    @Query() query: HandleEmailAccountConnectionCallbackQueryDto,
  ) {
    await this.connectEmailAccountService.handleConnectionCallback(
      params.provider,
      query.code,
    );
    return { message: 'Email account connected successfully' };
  }
}
