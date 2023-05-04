import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios; // This is generating a dependency in our service
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async populateDB() {
    await this.pokemonModel.deleteMany({});

    const pokeInsert: { name: string; no: number }[] = [];

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    // const promisesArr = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      // console.log(segments);
      const no = +segments[segments.length - 2];
      // console.log({ name, no });
      // const pokemon = await this.pokemonModel.create({ name, no }); //in bulk this will take a loooong time
      pokeInsert.push({ name, no });
    });
    // await Promise.all(promisesArr);
    await this.pokemonModel.insertMany(pokeInsert);
    // insert into pokemons (name, no)
    return 'Seed executed';
  }
}
