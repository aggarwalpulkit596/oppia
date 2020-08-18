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
 * @fileoverview Unit tests for the ratio expression component.
 */

describe('RatioExpression', function() {
  var RationExpressionCtrl = null;

  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.inject(function($componentController) {
    RationExpressionCtrl = $componentController('ratioExpressionEditor');
    RationExpressionCtrl.$onInit();
  }));

  it('should initialize ctrl.value with an empty string', function() {
    RationExpressionCtrl.value = null;
    RationExpressionCtrl.$onInit();
    expect(RationExpressionCtrl.value).not.toBeNull();
  });

  it('should initialize ctrl.warningText with invalid ratio', function() {
    RationExpressionCtrl.value = '1:2:';
    RationExpressionCtrl.$onInit();
    RationExpressionCtrl.isValidRatio();
    expect(RationExpressionCtrl.warningText)
      .toBe('Please enter a valid ratio (e.g. 1:2 or 1:2:3).');
  });

  it('should initialize ctrl.warningText with invalid ratio', function() {
    RationExpressionCtrl.value = '';
    RationExpressionCtrl.$onInit();
    RationExpressionCtrl.isValidRatio();
    expect(RationExpressionCtrl.warningText)
      .toBe('Please enter a valid ratio (e.g. 1:2 or 1:2:3).');
  });

  it('should initialize ctrl.warningText with invalid character', function() {
    RationExpressionCtrl.value = 'abc';
    RationExpressionCtrl.$onInit();
    RationExpressionCtrl.isValidRatio();
    expect(RationExpressionCtrl.warningText)
      .toBe('Please write a ratio that consists of digits separated by colons' +
      '(e.g. 1:2 or 1:2:3).');
  });

  it('should return ctrl.value', function() {
    RationExpressionCtrl.value = '1:2:3';
    RationExpressionCtrl.$onInit();
    expect(RationExpressionCtrl.isValidRatio()).toBe(true);
  });
});
