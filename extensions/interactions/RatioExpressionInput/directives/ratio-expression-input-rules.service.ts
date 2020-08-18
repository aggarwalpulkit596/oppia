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
 * @fileoverview Rules service for the RatioExpressionInput interaction.
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { Injectable } from '@angular/core';

import { RatioInputAnswer } from 'interactions/answer-defs';
import {
  RatioInputRulesInputs
} from 'interactions/rule-input-defs';

@Injectable({
  providedIn: 'root'
})
export class RatioExpressionInputRulesService {
  Equals(answer: RatioInputAnswer, inputs: RatioInputRulesInputs):
  boolean {
    return answer === inputs.x;
  }

  HasNumberOfTermsEqualTo(
      answer: RatioInputAnswer,
      inputs: RatioInputRulesInputs): boolean {
    return answer.split(':').length === inputs.x.split(':').length;
  }

  static convertToSimplestForm(answer: RatioInputAnswer): string {
    var gcd = (x: number, y: number) => {
      return y === 0 ? x : gcd(y, x % y);
    };
    var ratios = answer.split(':').map(Number);
    var value = ratios.reduce(gcd);
    if (value === 1) {
      return answer;
    } else {
      return ratios.map(currentValue => currentValue / value).join(':');
    }
  }

  IsEquivalent(
      answer: RatioInputAnswer,
      inputs: RatioInputRulesInputs): boolean {
    // eslint-disable-next-line max-len
    return answer === RatioExpressionInputRulesService.convertToSimplestForm(inputs.x);
  }
}

angular.module('oppia').factory(
  'RatioInputRulesService',
  downgradeInjectable(RatioExpressionInputRulesService));
