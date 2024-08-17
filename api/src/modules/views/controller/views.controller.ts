import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ViewsRepository } from '../repositories/abstract/views.repository';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ViewsMapper } from '../mappers/views.mapper';
import { IdDto } from 'src/utils/dtos/id.dto';

@Controller('/views')
export class ViewsController {
  constructor(private viewsRepository: ViewsRepository) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query('panelId') panelId?: string) {
    const views = await this.viewsRepository.findAll({ filters: { panelId } });

    return { views: views.map(ViewsMapper.toHttp) };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() param: IdDto) {
    await this.viewsRepository.delete({
      id: param.id,
    });
  }
}
