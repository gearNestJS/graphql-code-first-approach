import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from '@nestjs/apollo';
import { UpdateCoffeeInput } from './dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  async getAllCoffees(): Promise<Coffee[]> {
    return await this.coffeesRepository.find();
  }

  async getOneCoffee(id: number): Promise<Coffee> {
    const coffee = await this.coffeesRepository.findOne({
      where: { id },
    });

    if (!coffee) {
      throw new UserInputError(`Coffee with id ${id} not found!`);
    }

    return coffee;
  }

  async createCoffee(createCoffeeInput: CreateCoffeeInput): Promise<Coffee> {
    const coffee = this.coffeesRepository.create(createCoffeeInput);

    return await this.coffeesRepository.save(coffee);
  }

  async updateCoffee(
    id: number,
    updateCoffeeInput: UpdateCoffeeInput,
  ): Promise<Coffee> {
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
    });

    if (!coffee) {
      throw new UserInputError(`Coffee with id ${id} not found!`);
    }

    return this.coffeesRepository.save(coffee);
  }

  async removeCoffee(id: number): Promise<Coffee> {
    const coffee = await this.getOneCoffee(id);

    return this.coffeesRepository.remove(coffee);
  }
}
