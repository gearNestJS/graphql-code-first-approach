import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';

import { Coffee } from './entities/coffee.entity/coffee.entity';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput, UpdateCoffeeInput } from './dto';

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

  @Mutation(() => Coffee, { name: 'updateCoffee' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return await this.coffeesService.updateCoffee(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'removeCoffee' })
  async remove(@Args('id', ParseIntPipe) id: number) {
    return await this.coffeesService.removeCoffee(id);
  }
}
