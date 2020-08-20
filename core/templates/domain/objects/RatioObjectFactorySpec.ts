// Copyright 2020 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview unit tests for the ratio object type factory service
 */

import { ObjectsDomainConstants } from
  'domain/objects/objects-domain.constants';
import { Ratio, RatioObjectFactory } from
  'domain/objects/RatioObjectFactory';

describe('Ratio Object Factory', () => {
  let errors = null;
  let ratio: RatioObjectFactory = null;

  beforeEach(() => {
    errors = ObjectsDomainConstants.RATIO_PARSING_ERRORS;
    ratio = new RatioObjectFactory();
  });

  it('should create a new object from list', () => {
    const ratioObject = [1, 2, 3];
    const createdRatio = ratio.fromList(ratioObject);

    expect(createdRatio.numbers).toEqual(ratioObject);
  });

  it('should convert itself to a string in ratio format', () => {
    expect(new Ratio([1, 2, 3]).toString()).toBe('1:2:3');
    expect(new Ratio([2, 3, 5]).toString()).toBe('2:3:5');
    expect(new Ratio([2, 4, 6]).toString()).toBe('2:4:6');
    expect(new Ratio([10, 2, 15]).toString()).toBe('10:2:15');
    expect(new Ratio([1, 2, 3, 4]).toString()).toBe('1:2:3:4');
  });

  it('should return the correct lenght of list', () => {
    expect(new Ratio([1, 2, 3]).getNoOfTerms()).toBe(3);
    expect(new Ratio([1, 2]).getNoOfTerms()).toBe(2);
    expect(new Ratio([1, 2, 3, 4]).getNoOfTerms()).toBe(4);
    expect(new Ratio([1, 2, 3, 4, 5]).getNoOfTerms()).toBe(5);
  });

  it('should parse valid strings', () => {
    expect(ratio.fromRawInputString('1:2')).toEqual(
      new Ratio([1, 2]).numbers);
    expect(ratio.fromRawInputString('2:3:5')).toEqual(
      new Ratio([2, 3, 5]).numbers);
    expect(ratio.fromRawInputString('2:3:5:7:11')).toEqual(
      new Ratio([2, 3, 5, 7, 11]).numbers);
  });

  it('should throw errors for invalid ratios', () => {
    // Invalid characters.
    expect(() => {
      ratio.fromRawInputString('3:b');
    }).toThrowError(errors.INVALID_CHARS);
    expect(() => {
      ratio.fromRawInputString('a:3');
    }).toThrowError(errors.INVALID_CHARS);
    expect(() => {
      ratio.fromRawInputString('-1:3');
    }).toThrowError(errors.INVALID_CHARS);
    // Invalid format.
    expect(() => {
      ratio.fromRawInputString(':1:3');
    }).toThrowError(errors.INVALID_FORMAT);
    expect(() => {
      ratio.fromRawInputString('1:2:3:4:5:');
    }).toThrowError(errors.INVALID_FORMAT);
    expect(() => {
      ratio.fromRawInputString('1:');
    }).toThrowError(errors.INVALID_FORMAT);
    expect(() => {
      ratio.fromRawInputString('1');
    }).toThrowError(errors.INVALID_FORMAT);
    // Invalid Ratio.
    expect(() => {
      ratio.fromRawInputString('1:3/2');
    }).toThrowError(errors.INVALID_RATIO);
    expect(() => {
      ratio.fromRawInputString('1:1/2:3/2');
    }).toThrowError(errors.INVALID_RATIO);
    expect(() => {
      ratio.fromRawInputString('1/2:2:3:4:5');
    }).toThrowError(errors.INVALID_RATIO);
    expect(() => {
      ratio.fromRawInputString('1:2.2');
    }).toThrowError(errors.INVALID_RATIO);
    expect(() => {
      ratio.fromRawInputString('1.2:2');
    }).toThrowError(errors.INVALID_RATIO);
    // Invalid Colons.
    expect(() => {
      ratio.fromRawInputString('1::2::3');
    }).toThrowError(errors.INVALID_COLONS);
    expect(() => {
      ratio.fromRawInputString('1:2::3');
    }).toThrowError(errors.INVALID_COLONS);
    expect(() => {
      ratio.fromRawInputString('1:2:::3');
    }).toThrowError(errors.INVALID_COLONS);
    // Simplest from.
    expect(() => {
      ratio.fromRawInputString('2:4:6');
    }).toThrowError(errors.INVALID_FORM);
    expect(() => {
      ratio.fromRawInputString('3:6:9');
    }).toThrowError(errors.INVALID_FORM);
  });

  it('should covert to simplest form', () => {
    expect(new Ratio([1, 2, 3]).convertToSimplestForm()).toEqual([1, 2, 3]);
    expect(new Ratio([2, 4, 6]).convertToSimplestForm()).toEqual([1, 2, 3]);
    expect(new Ratio([3, 6, 9]).convertToSimplestForm()).toEqual([1, 2, 3]);
    expect(new Ratio([2, 3, 5]).convertToSimplestForm()).toEqual([2, 3, 5]);
    expect(new Ratio([2, 4, 5]).convertToSimplestForm()).toEqual([2, 4, 5]);
  });
});
