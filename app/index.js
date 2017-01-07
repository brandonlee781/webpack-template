import 'purecss';
import './main.scss';
import component from './component';

let demoComponent = component();
document.body.appendChild(demoComponent);

if (module.hot) {
  module.hot.accept('./component', () => {
    const nextComponent = require('./component').default();

    document.body.replaceChild(nextComponent, demoComponent);

    demoComponent = nextComponent;
  });
}
