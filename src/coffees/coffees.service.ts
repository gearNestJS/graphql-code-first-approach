import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeInput, UpdateCoffeeInput } from './dto';
import { Coffee, Flavor } from './entities';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  /**
   * Find all coffees
   * @returns {Promise<Coffee[]>}
   */
  async getAllCoffees(): Promise<Coffee[]> {
    return await this.coffeesRepository.find();
  }

  /**
   * Find unique coffee
   * @param id {number}
   * @returns {Promise<Coffee>}
   */
  async getOneCoffee(id: number): Promise<Coffee> {
    const coffee = await this.coffeesRepository.findOne({
      where: { id },
    });

    if (!coffee) {
      throw new UserInputError(`Coffee with id ${id} not found!`);
    }

    return coffee;
  }

  /**
   * Create new Coffee
   * @param createCoffeeInput {CreateCoffeeInput}
   * @returns {Promise<Coffee>}
   */
  async createCoffee(createCoffeeInput: CreateCoffeeInput): Promise<Coffee> {
    const coffee = this.coffeesRepository.create(createCoffeeInput);

    return await this.coffeesRepository.save(coffee);
  }

  /**
   * Update existing Coffee
   * @param id {number}
   * @param updateCoffeeInput {UpdateCoffeeInput}
   * @returns {Promise<Coffee>}
   */
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

  /**
   * Remove existing Coffee
   * @param id {number}
   * @returns {Promise<Coffee>}
   */
  async removeCoffee(id: number): Promise<Coffee> {
    const coffee = await this.getOneCoffee(id);

    return this.coffeesRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
