import { TrulyDemoPage } from './app.po';

describe('truly-demo App', () => {
  let page: TrulyDemoPage;

  beforeEach(() => {
    page = new TrulyDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
