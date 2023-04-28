import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  // We are going to add decorators from Mongoose
  // id is not needed to add since the id is going to be added by Mongo for us
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

// We need to implements the mongo schema
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
