import { AppPage } from './app.po';

describe('circleboard3 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the application name & version', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('Circleboard 3.0.0-alpha.1');
  });
});
