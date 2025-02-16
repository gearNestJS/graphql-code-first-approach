import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class CoffeesResolver {
  @Query(() => [Coffee], { name: 'coffees', description: 'Find all coffee' })
  getAllCoffees() {
    return [];
  }

  @Query(() => Coffee, {
    name: 'coffee',
    nullable: true,
    description: 'Find coffee by id',
  })
  getOneCoffee(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return null;
  }
}
