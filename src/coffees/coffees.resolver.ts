import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Query(() => [Coffee], { name: 'coffees', description: 'Find all coffee' })
  getAllCoffees() {
    return this.coffeesService.getAllCoffees();
  }

  @Query(() => Coffee, {
    name: 'coffee',
    nullable: true,
    description: 'Find coffee by id',
  })
  getOneCoffee(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeesService.getOneCoffee(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
  create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
    return this.coffeesService.createCoffee(createCoffeeInput);
  }
}
