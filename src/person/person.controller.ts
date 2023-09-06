import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Query, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}


  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return JSON.stringify(createPersonDto);
  }

  @Post('file')
  @UseInterceptors(AnyFilesInterceptor({
    dest: 'uploads/'
  }))
  upload(@Body() createPersonDto: CreatePersonDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return JSON.stringify(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  // 必须放在 @Get(':id') 前面 否则会匹配到它
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `name: ${name}, age: ${age}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
