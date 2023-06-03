import { Configuration, OpenAIApi } from 'openai';
import { Chat } from 'src/chat/entities/chat.entity';
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export const complete = async (chat: Chat) => {
	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: chat.messages,
		temperature: 1
	});
	console.log(completion.data);
	console.log(completion.data.choices[0].message);
	return completion.data.choices[0].message;
};
