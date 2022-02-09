import React from 'react';
import {act, cleanup, render, screen, waitForElement} from '@oracle-cx-commerce/test/component/custom-render';
import {createMockStore} from '@oracle-cx-commerce/test/component/create-mock-store';
import {preloadComponents} from '@oracle-cx-commerce/commerce-utils/react';
import Widget from '@oracle-cx-commerce/react-components/widget';

export const TmbHomeCategories = () => import('../index');

describe('TmbHomeCategories renders correctly and shows after changing visible state', () => {

  const comps = {TmbHomeCategories};
  beforeAll(async () => {

    await preloadComponents(comps);
  });
  beforeEach(() => {

  });
  afterEach(() => {

    cleanup(); 
  });

  it('TmbHomeCategories works as expected', async done => {

    const state = {
      pageRepository: {
        widgets: {
          dsWidgetInstance: {
            id: 'dsWidgetInstance',
            componentId: 'TmbHomeCategories',
            regions: []
          }
        }
      }
    };

    const mockStore = createMockStore(state);

    render(<Widget widgetId="dsWidgetInstance" />, mockStore, comps);

    await waitForElement(() => screen.getByText(/Base/));

    done();
  });
});
