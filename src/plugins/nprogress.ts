import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { Router } from 'vue-router';

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });

export function setupNProgress(router: Router) {
  router.beforeEach(() => {
    NProgress.start();
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
