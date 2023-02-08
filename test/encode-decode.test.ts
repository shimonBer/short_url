import {describe, expect, test} from '@jest/globals';
import fetch from 'node-fetch';

jest.setTimeout(10000)

async function generateRequest(endpoint: string, link: string): Promise<Record<string, string>> {
  const body = { link }
  return await(await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
  })).json();
}
describe('encode - decode - sucess', () => {
    let originalLink = "http://test.com";
    let resLink = '';

  test('encode - success', async() => {
    const response = await generateRequest('encode', originalLink);
    expect(response).toHaveProperty("res");
    resLink = response['res'];
  });

  test('decode - success', async() => {
    const response = await generateRequest('decode', resLink);
    expect(response).toHaveProperty("res");
    expect(response['res']).toEqual(originalLink)
  });

  test('decode - failure - decoded string not found', async() => {
    const response = await generateRequest('decode', 'someOtherLink');
    expect(response).toHaveProperty("err");
  });
  test('encode - failure - empty string', async() => {
    const response = await generateRequest('encode', '');
    expect(response).toHaveProperty("err");
  });
});