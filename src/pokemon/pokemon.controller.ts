import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ParsePokemonIdPipe } from './pipe/parse-pokemon-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  getPokemon(@Param('id', ParsePokemonIdPipe) id: number) {
    return this.pokemonService.getPokemon(id);
  }
}
