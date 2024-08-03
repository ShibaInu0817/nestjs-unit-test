// This test use the real Pokemon API to test the getPokemon method in the PokemonService class

import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';

// Test the getPokemon method in the PokemonService class
// 1. An ID less than 1 should return a BadRequestException
// 2. An ID greater than 151 should return a BadRequestException
// 3. An ID between 1 and 151 returns the name of the respective pokemon
// 4. If the response from the Pokemon API isn't what we expect, then return a InternalServerErrorException

describe('PokemonService', () => {
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokemonService],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  describe('getPokemon', () => {
    it('pokemon ID less than 1 should throw error', async () => {
      const getPokemon = pokemonService.getPokemon(0);

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('pokemon ID greater than 151 should throw error', async () => {
      const getPokemon = pokemonService.getPokemon(152);

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('valid pokemon ID to return the pokemon name', async () => {
      const getPokemon = pokemonService.getPokemon(1);

      await expect(getPokemon).resolves.toBe('bulbasaur');
    });
  });
});
