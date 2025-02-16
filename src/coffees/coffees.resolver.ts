import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Query(() => [Coffee], { name: 'coffees', description: 'Find all coffee' })
  async getAllCoffees() {
    return await this.coffeesService.getAllCoffees();
  }

  @Query(() => Coffee, {
    name: 'coffee',
    description: 'Find coffee by id',
  })
  async getOneCoffee(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return await this.coffeesService.getOneCoffee(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return await this.coffeesService.createCoffee(createCoffeeInput);
  }
}
