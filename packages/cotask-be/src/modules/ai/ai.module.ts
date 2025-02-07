import { Module } from '@nestjs/common';
import { AiController } from './controllers/ai.controller';
import { AiService } from './services/ai.service';
import { IAiService } from './services/ai.abstract';

@Module({
  controllers: [AiController],
  providers: [
    {
      provide: IAiService,
      useClass: AiService,
    },
  ],
})
export class AiModule {}
