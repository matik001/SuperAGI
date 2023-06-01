import { Chat } from 'src/chat/entities/chat.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	msg: string;

	@ManyToOne((type) => Chat)
	@JoinColumn({ name: 'chatId' })
	chat: Chat;
}
