import { createConnection, getManager } from 'typeorm';
import { User } from '../entity/user.entity';
import faker from 'faker';
import { Role } from '../entity/role.entity';

createConnection().then(async connection => {
  const repository = getManager().getRepository(User);
  const roleRepository = getManager().getRepository(Role);

  for (let i = 0; i < 30; i++) {
    await repository.save({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(20),
      role: await roleRepository.findOne(faker.datatype.number({ min: 1, max: 3 }))
    });
  }

  process.exit(0);
});