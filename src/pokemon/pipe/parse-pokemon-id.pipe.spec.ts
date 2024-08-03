import { BadRequestException } from '@nestjs/common';
import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';

// Test
// Should throw an error for nonnumbers
// Should throw an error if the number is less than 1 or greater than 151
// Should return the number if between 1 and 151

describe('ParsePokemonIdPipe', () => {
  let pipe: ParsePokemonIdPipe;

  beforeEach(() => {
    pipe = new ParsePokemonIdPipe();
  });

  it('should be defined', () => {
    expect(new ParsePokemonIdPipe()).toBeDefined();
  });

  it(`should throw error for non numbers`, () => {
    const value = () => pipe.transform(`hello`);
    expect(value).toThrow(BadRequestException);
  });

  it(`should throw error if number less than 1`, () => {
    const value = () => pipe.transform(`-34`);
    expect(value).toThrow(BadRequestException);
  });

  it(`should throw error if number greater than 151`, () => {
    const value = () => pipe.transform(`200`);
    expect(value).toThrow(BadRequestException);
  });

  it(`should return number if between 1 and 151`, () => {
    const value = () => pipe.transform(`5`);
    expect(value()).toBe(5);
  });
});
