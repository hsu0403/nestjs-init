import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getDetail', () => {
    it('should return a movie', () => {
      service.postCreate({ title: 'TestMovie', genres: ['test'], year: 2000 });
      const movie = service.getDetail(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getDetail(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Moive with ID 99 not found.');
      }
    });
  });

  describe('deleteMovie', () => {
    it('delete a movie', () => {
      service.postCreate({ title: 'TestMovie', genres: ['test'], year: 2000 });
      const allMovies = service.getAll();
      service.deleteMovie(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(allMovies.length);
    });
    it('should return a 404', () => {
      try {
        service.deleteMovie(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Moive with ID 99 not found.');
      }
    });
  });

  describe('postCreate', () => {
    it('should create a movie', () => {
      const allMovies = service.getAll().length;
      service.postCreate({ title: 'TestMovie', genres: ['test'], year: 2000 });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(allMovies);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      service.postCreate({ title: 'TestMovie', genres: ['test'], year: 2000 });
      service.updateMovie(1, { title: 'Updated Test' });
      const movie = service.getDetail(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should return a 404', () => {
      try {
        service.updateMovie(99, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Moive with ID 99 not found.');
      }
    });
  });
});
