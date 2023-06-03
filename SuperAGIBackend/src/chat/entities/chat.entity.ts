import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToMany(() => Message, (a) => a.chat, {
		// cascade: true,
		// eager: true
	})
	messages: Message[];
	// constructor() {
		// const initialMsg = new Message();
		// initialMsg.role = 'system';
		// initialMsg.content =
		// 	'Jesteś sznowanym profesjonalnym wróżbitą. Zawsze dajesz idelne rady oraz twoje przepowiednie się sprawdzają, dlatego ludzie bardzo szanują twoje rady.';
		// this.messages = [initialMsg];
		// this.messages = [];
	// }
}
