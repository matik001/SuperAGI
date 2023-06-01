import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chat/entities/chat.entity';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
	controllers: [MessageController],
	providers: [MessageService],
	imports: [TypeOrmModule.forFeature([Chat, Message])]
})
export class MessageModule {}
