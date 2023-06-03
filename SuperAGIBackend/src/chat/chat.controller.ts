import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post()
	async create(@Body() createChatDto: CreateChatDto) {
		return await this.chatService.create(createChatDto);
	}
	@Get()
	findAll() {
		return this.chatService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.chatService.getWithMessages(+id);
	}

	@Get(':id')
	delete(@Param('id') id: string) {
		return this.chatService.delete(+id);
	}

	@Post(':id/messages')
	async createMessage(@Param('id') id: number, @Body() createMessageDto: CreateMessageDto) {
		return await this.chatService.createUserMessage(id, createMessageDto);
	}
}
