import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { provideServerRendering  } from '@angular/platform-server';

// const bootstrap = () => bootstrapApplication(App, config);
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
