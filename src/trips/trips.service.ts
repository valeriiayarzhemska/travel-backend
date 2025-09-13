import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const trip = this.tripsRepository.create(createTripDto);
    return this.tripsRepository.save(trip);
  }

  async findAll(): Promise<Trip[]> {
    return this.tripsRepository.find({
      select: ['id', 'destination', 'description'],
    });
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      select: ['id', 'destination', 'description'],
    });

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    await this.findOne(id); // This ensures the trip exists
    await this.tripsRepository.update(id, updateTripDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const trip = await this.findOne(id); // This ensures the trip exists
    await this.tripsRepository.remove(trip);
    return { message: 'Trip deleted successfully' };
  }
}
