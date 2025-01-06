/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

import { withConsole } from '@storybook/addon-console';

export const decorators = [(storyFn, context) => withConsole()(storyFn)(context)];

export default preview;
