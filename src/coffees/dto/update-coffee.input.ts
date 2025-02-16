import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Update Coffee' })
export class UpdateCoffeeInput {
  @Field(() => String, { description: 'The name of coffee' })
  name?: string;
  brand?: string;
  flavors?: string[];
}
