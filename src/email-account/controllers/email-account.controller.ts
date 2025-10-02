import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ConnectEmailAccountService } from '../services/connect-email-account.service';
import {
  ConnectEmailAccountBodyDto,
  ConnectEmailAccountParamsDto,
  HandleEmailAccountConnectionCallbackParamsDto,
  HandleEmailAccountConnectionCallbackQueryDto,
} from '../validations/email-account.validation';
import { SkipJwtAuth } from 'src/auth/auth.decorator';
import { type AuthenticatedRequest } from 'src/express/express.types';
import { type Response } from 'express';

@Controller('/email-accounts')
export class EmailAccountController {
  constructor(private connectEmailAccountService: ConnectEmailAccountService) {}

  @Post('/:provider/connect')
  connectEmailAccount(
    @Req() req: AuthenticatedRequest,
    @Param() params: ConnectEmailAccountParamsDto,
    @Body() body: ConnectEmailAccountBodyDto,
  ) {
    const connectionUrl = this.connectEmailAccountService.connect(
      params.provider,
      {
        organizationId: req.user.organizationId,
        userId: req.user.id,
        redirectUrl: body.redirectUrl,
      },
    );
    return { connectionUrl };
  }

  @SkipJwtAuth()
  @Get('/:provider/callback')
  async handleEmailAccountConnectionCallback(
    @Param() params: HandleEmailAccountConnectionCallbackParamsDto,
    @Query() query: HandleEmailAccountConnectionCallbackQueryDto,
    @Res() res: Response,
  ) {
    await this.connectEmailAccountService.handleConnectionCallback(
      params.provider,
      query.code,
      query.state,
    );

    res.redirect(query.state.redirectUrl);
  }
}
