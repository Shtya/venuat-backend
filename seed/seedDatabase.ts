import { createConnection } from 'typeorm';
import { City } from 'entity/property/city.entity';
import { Property } from 'entity/property/property.entity';
import { User } from 'entity/user/user.entity';
import { Venue } from 'entity/venue/venue.entity';
import { fakeCities, fakeProperties, fakeUsers, fakeVenues } from './fakeData';

async function seedDatabase() {
  // Establish a database connection
  const connection = await createConnection();

  // Get repositories for each entity
  const userRepository = connection.getRepository(User);
  const propertyRepository = connection.getRepository(Property);
  const cityRepository = connection.getRepository(City);
  const venueRepository = connection.getRepository(Venue);

  await userRepository.save(fakeUsers);

  await cityRepository.save(fakeCities);

  await propertyRepository.save(fakeProperties);

  await venueRepository.save(fakeVenues);

  console.log('Database seeded successfully!');
  await connection.close();
}

// Run the seeding function
seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
});

// npx ts-node seed/seedDatabase.ts