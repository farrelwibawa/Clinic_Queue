import { setup, assign, fromPromise } from 'xstate';
import { fetchSemuaPoliQueues } from '../api/semuaPoliApi';
import { SemuaPoliQueueTicket } from '../types';

export const SemuaPoliMachine = setup({
  types: {
    context: {} as {
      queues: SemuaPoliQueueTicket[];
      error: string | null;
      lastFetched: Date | null;
    },
    events: {} as
      | { type: 'FETCH' }
      | { type: 'RETRY' },
  },
  actors: {
    fetchData: fromPromise(async () => {
      return await fetchSemuaPoliQueues();
    }),
  },
}).createMachine({
  id: 'SemuaPoli',
  initial: 'idle',
  context: {
    queues: [],
    error: null,
    lastFetched: null,
  },
  states: {
    idle: {
      on: {
        FETCH: 'fetching',
      },
    },
    fetching: {
      invoke: {
        src: 'fetchData',
        onDone: {
          target: 'success',
          actions: assign({
            queues: ({ event }) => event.output,
            error: null,
            lastFetched: new Date(),
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: ({ event }) => (event.error as Error).message || 'Failed to fetch',
          }),
        },
      },
    },
    success: {
      after: {
        1000: 'fetching', // Auto update every 1 second
      },
    },
    failure: {
      after: {
        5000: 'fetching', // Retry after 5 seconds on failure
      },
    },
  },
});
