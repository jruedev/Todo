import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];
  private nextId = 1;

  create(createTodoDto: CreateTodoDto) {
    const todo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: createTodoDto.completed ?? false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  findAll() {
    return [...this.todos].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  findOne(id: number) {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) throw new NotFoundException(`Todo with id #${id} not found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  remove(id: number) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id #${id} not found`);
    }
    this.todos.splice(index, 1);
    return { deleted: true };
  }
}
