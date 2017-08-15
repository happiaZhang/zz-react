import App from './utilities/createApp';
import models from './models';
import routes from './routes';

const app = new App();
app.useModels(models);
app.useRoutes(routes);
app.start('app');
