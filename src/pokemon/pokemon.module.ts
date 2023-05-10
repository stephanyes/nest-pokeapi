import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

// When we need to add a module to another one the rule of thumb is ... NEED MODULES? IMPORTS
// In this case we need to import the Mongo module to our Pokemon module

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    // this is different from the MongooseModule.forRoot() in app.module
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // this name is coming from Document - check pokemon.entity
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
