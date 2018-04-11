
import fetch from 'jest-fetch-mock';

global.fetch = fetch;
afterEach(() => {
    global.fetch.resetMocks();
});