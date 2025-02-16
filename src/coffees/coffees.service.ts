import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';

@Injectable()
export class CoffeesService {
  getAllCoffees() {
    return [];
  }

  getOneCoffee(id: number) {
    return null;
  }

  createCoffee(createCoffeeInput: CreateCoffeeInput) {
    return null;
  }
}
