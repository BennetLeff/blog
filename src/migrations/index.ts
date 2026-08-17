import * as migration_20260817_203802_initial_setup from './20260817_203802_initial_setup';

export const migrations = [
  {
    up: migration_20260817_203802_initial_setup.up,
    down: migration_20260817_203802_initial_setup.down,
    name: '20260817_203802_initial_setup'
  },
];
