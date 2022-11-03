import { faker } from '@faker-js/faker';
faker.locale = 'es';

const get = () => ({
  nombre: faker.commerce.productName(),
  descripcion: 'mock product with faker',
  codigo: `mock${faker.random.numeric(3)}`,
  precio: faker.commerce.price(1000),
  foto: faker.image.food(400, 400, true),
  stock: faker.random.numeric(2)
  
});

export default { get };