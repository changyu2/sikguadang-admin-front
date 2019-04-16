import localConfig from '../envconfig/local';
import krDevConfig from '../envconfig/krDev';
import krProdConfig from '../envconfig/krProd';

let config;
switch (process.env.NODE_ENV) {
  case 'production':
    config = krProdConfig;
    break;
  case 'development':
    config = krDevConfig;
    break;
  default:
    config = localConfig;
}
export default config;
