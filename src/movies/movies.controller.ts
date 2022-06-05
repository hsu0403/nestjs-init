import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // getSearch(@Query('year') searchingYear: string) {
  //   return `We are searching ${searchingYear}`;
  // }

  // @Get('searchAll')
  // getSearchAll(@Query() search) {
  //   const { name, year } = search;
  //   return `name: ${name} year: ${year}`;
  // }

  @Get('/:id')
  getDetail(@Param('id') id: number): Movie {
    return this.moviesService.getDetail(id);
  }

  @Post()
  postCreate(@Body() movieData: CreateMovieDto) {
    return this.moviesService.postCreate(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id);
  }

  @Patch('/:id')
  updateMovie(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.updateMovie(id, updateData);
  }
}
