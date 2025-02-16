import { HttpException, Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from '@nestjs/apollo';

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
}
