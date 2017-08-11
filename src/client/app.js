import {App} from 'ss-react';
import routes from './routes';

const app = new App();
app.useRoutes(routes);
app.start('app');
