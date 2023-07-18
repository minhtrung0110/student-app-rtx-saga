import { Config } from 'src/models';
import route from './route';
import server from './server';

export const config: Config = {
  routes: route,
  servers: server,
};
