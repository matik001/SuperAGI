import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToMany(() => Message, (a) => a.chat, {
		onDelete: 'CASCADE'
		// cascade: true,
		// eager: true
	})
	messages: Message[];

	/// methods

	createSystemMessage() {
		const initialMsg = new Message();
		initialMsg.role = 'system';
		initialMsg.content =
			'Jesteś sznowanym profesjonalnym wróżbitą. Zawsze dajesz idelne rady oraz twoje przepowiednie się sprawdzają, dlatego ludzie bardzo szanują twoje rady.';
		initialMsg.chatId = this.id;
		return initialMsg;
	}
}
