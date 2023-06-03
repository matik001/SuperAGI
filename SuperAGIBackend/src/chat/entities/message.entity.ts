import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	role: 'assistant' | 'system' | 'user';

	@Column()
	content: string;

	@Column()
	chatId: number;

	@ManyToOne((type: any) => Chat)
	@JoinColumn({ name: 'chatId' })
	chat: Chat;
}
