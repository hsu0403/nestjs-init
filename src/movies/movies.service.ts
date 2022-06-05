import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getDetail(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Moive with ID ${id} not found.`);
    }
    return movie;
  }

  deleteMovie(id: number) {
    this.getDetail(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  postCreate(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, updateData: UpdateMovieDto) {
    const movie = this.getDetail(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
