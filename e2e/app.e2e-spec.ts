import { IfmVisualizerPage } from './app.po';

describe('ifm-visualizer App', function() {
  let page: IfmVisualizerPage;

  beforeEach(() => {
    page = new IfmVisualizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
