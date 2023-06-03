import { Injectable } from '@nestjs/common';
import { complete } from 'src/ai/chatgpt/chatgpt';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
	constructor(private chatRepo: Repository<Chat>, private messagesRepo: Repository<Message>) {}

	async create(createChatDto: CreateChatDto) {
		await this.chatRepo.save(new Chat());
	}
	async createUserMessage(chatId: number, createMsgDto: CreateMessageDto) {
		const newMsg = new Message();
		newMsg.chatId = chatId;
		newMsg.role = 'user';
		newMsg.content = createMsgDto.content;
		await this.messagesRepo.save(newMsg);

		const chat = await this.findOne(chatId);
		if (!chat) throw new Error("chat doens't exist");
		complete(chat).then(async (response) => {
			if (!response) return;
			const responseMsg = new Message();
			responseMsg.content = response.content;
			responseMsg.role = response.role;
			responseMsg.chatId = chatId;
			await this.messagesRepo.save(responseMsg);
			console.log('responded');
		});
	}
	async findAll() {
		const messages = await this.chatRepo.find();
		return messages;
	}

	async findOne(id: number) {
		const messages = await this.chatRepo.findOne({
			where: {
				id: id
			},
			relations: {
				messages: true
			}
		});

		return messages;
	}

	// update(id: number, updateChatDto: UpdateChatDto) {
	// 	return `This action updates a #${id} chat`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} chat`;
	// }
}
