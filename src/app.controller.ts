// app.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('setValues')
  setValues(@Body() data: { name: string; id: number }): {
    randomNumber: number;
  } {
    const randomNumber = this.appService.setValues(data.name, data.id);
    return { randomNumber };
  }

  @Get('getValues/:randomNumber')
  getValues(
    @Param('randomNumber', ParseIntPipe) randomNumber: number,
  ): { name: string; id: number } | { error: string } {
    const values = this.appService.getValues(randomNumber);
    if (values) {
      return values;
    } else {
      return { error: 'Data not found for the given random number' };
    }
  }

  @Get('getAllValues')
  getAllValues(): { [randomNumber: number]: { name: string; id: number } } {
    return this.appService.getAllValues();
  }
}
