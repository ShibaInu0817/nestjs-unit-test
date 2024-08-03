import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { ParsePokemonIdPipe } from './pipe/parse-pokemon-id.pipe';
import { createMock } from '@golevelup/ts-jest';

describe('PokemonController', () => {
  let controller: PokemonController;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: ParsePokemonIdPipe,
          useValue: createMock<ParsePokemonIdPipe>(),
        },
      ],
      controllers: [PokemonController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<PokemonController>(PokemonController);
    pokemonService = module.get(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPokemon', () => {
    it('should return the name of the pokemon', async () => {
      pokemonService.getPokemon = jest.fn().mockResolvedValue('bulbasaur');

      const result = await controller.getPokemon(1);

      expect(result).toEqual('bulbasaur');
    });

    it('should throw an error if the id is not a number', async () => {
      // @ts-expect-error Testing error case
      await expect(controller.getPokemon('a')).rejects.toThrow();
    });

    it('should throw an error if the id is less than 1', async () => {
      await expect(controller.getPokemon(0)).rejects.toThrow();
    });
  });
});
