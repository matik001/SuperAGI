import { Configuration, OpenAIApi } from 'openai';
import { Chat } from 'src/chat/entities/chat.entity';
const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);

export const complete = async (chat: Chat) => {
	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: chat.messages.map((a) => ({
				content: a.content,
				role: a.role
			})),
			temperature: 1
		});
		// console.log(completion.data.choices);
		// console.log(completion.data.choices[0].message);
		return completion.data.choices[0];
	} catch (error) {
		if (error.reponse.data) {
			console.log(error.reponse.data);
		}
		throw error;
	}
};
