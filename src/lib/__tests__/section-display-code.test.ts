import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getSectionDisplayCode } from '../section-display-code.ts';

describe('section display codes', () => {
  it('renders CGEI climate units as human-readable unit numbers', () => {
    assert.equal(getSectionDisplayCode('CGEI-024'), '2.4');
    assert.equal(getSectionDisplayCode('CGEI-025'), '2.5');
    assert.equal(getSectionDisplayCode('CGEI-02'), '2.6');
    assert.equal(getSectionDisplayCode('CGEI-051'), '5.1');
  });

  it('removes padding from CGEI roadmap section labels', () => {
    assert.equal(getSectionDisplayCode('CGEI-01'), '1');
    assert.equal(getSectionDisplayCode('CGEI-03'), '3');
    assert.equal(getSectionDisplayCode('CGEI-14'), '14');
  });

  it('preserves existing non-CGEI section suffixes', () => {
    assert.equal(getSectionDisplayCode('METEO-01'), '01');
    assert.equal(getSectionDisplayCode('HATQ-10'), '10');
    assert.equal(getSectionDisplayCode('CUSTOM'), 'CUSTOM');
  });
});
