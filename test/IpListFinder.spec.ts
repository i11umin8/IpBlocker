import { IpListFinder } from "../src/util/IpListFinder";
import * as assert from 'assert'
describe('IpListFinder', function () {
  it('should ips from a given input of ip sets', async function () {
    const foundLists = await IpListFinder.findIpLists([{'ipSet': 'test1'}, {'ipSet': 'test2'}])
    assert.deepEqual(['test1', 'test2'], foundLists)
  });
  it('should return any empty list for an empty input', async function () {
    const foundLists = await IpListFinder.findIpLists([])
    assert.deepEqual([], foundLists)
  });
  it('should only return unique ipsets', async function () {
    const foundLists = await IpListFinder.findIpLists([{'ipSet': 'test1'}, {'ipSet': 'test1'}])
    assert.deepEqual(['test1'], foundLists)
  }); 
});