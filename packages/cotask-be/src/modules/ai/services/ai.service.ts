import { Injectable } from '@nestjs/common';
import { IAiService } from './ai.abstract';
import { Todo } from '@cotask-be/modules/todos';
import OpenAI from 'openai';
import { completeTodoTitlePrompt, completeTodoDescriptionPrompt } from '../prompts/todo-prompt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@cotask-be/config/app.config';

@Injectable()
export class AiService extends IAiService {
  deepseek: OpenAI;

  constructor(private configService: ConfigService) {
    super();
    const { apiKey, baseURL } = this.configService.get<AppConfig['deepseek']>('deepseek');
    this.deepseek = new OpenAI({
      baseURL,
      apiKey,
    });
  }
  async completeTodoTitle(partialTodo: Partial<Todo>): Promise<string[]> {
    try {
      const prompt = completeTodoTitlePrompt(partialTodo);
      const completion = await this.deepseek.chat.completions.create({
        model: 'deepseek-chat',
        temperature: 1.3,
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      });
      const { data = [] } = JSON.parse(completion.choices[0].message.content);
      return data;
    } catch (err) {
      console.log('completeTodoTitle error:', err);
      return [];
    }
  }
  async completeTodoDescription(partialTodo: Partial<Todo>): Promise<string[]> {
    try {
      const prompt = completeTodoDescriptionPrompt(partialTodo);
      const completion = await this.deepseek.chat.completions.create({
        model: 'deepseek-chat',
        temperature: 1.3,
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      });
      const { data = [] } = JSON.parse(completion.choices[0].message.content);
      return data;
    } catch (err) {
      console.log('completeTodoDescription error:', err);
      return [];
    }
  }
}
