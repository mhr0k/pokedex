import { hideDetails, showDetails } from '../components/Main.ts';

addEventListener('popstate', (e: PopStateEvent) => {
  if (!e.state.id) {
    hideDetails('pop');
  } else {
    showDetails(e.state.id, 'pop');
  }
});
