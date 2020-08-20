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

import { RatioObjectFactory } from 'domain/objects/RatioObjectFactory';
import { RatioInputAnswer } from 'interactions/answer-defs';
import {
  RatioInputRulesInputs
} from 'interactions/rule-input-defs';

@Injectable({
  providedIn: 'root'
})
export class RatioExpressionInputRulesService {
  constructor(private ratioObjectFactory: RatioObjectFactory) {}
  Equals(answer: RatioInputAnswer, inputs: RatioInputRulesInputs):
  boolean {
    return answer === inputs.x;
  }

  HasNumberOfTermsEqualTo(
      answer: RatioInputAnswer,
      inputs: RatioInputRulesInputs): boolean {
    return answer.length === inputs.x.length;
  }

  IsEquivalent(
      answer: RatioInputAnswer,
      inputs: RatioInputRulesInputs): boolean {
    // eslint-disable-next-line max-len
    return answer === this.ratioObjectFactory.fromList(inputs.x).convertToSimplestForm();
  }
}

angular.module('oppia').factory(
  'RatioInputRulesService',
  downgradeInjectable(RatioExpressionInputRulesService));
