import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create new coffee' })
export class CreateCoffeeInput {
  @Field(() => String, { description: 'The name of a new coffee' })
  name: string;
  brand: string;
  flavors: string[];
}
