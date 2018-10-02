// Copyright 2017-2018 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TypeDef } from '@polkadot/types/codec';
import { RawParam, RawParam$ValueArray } from './types';

import isUndefined from '@polkadot/util/is/undefined';

import getInitValue from './initValue';

// FIXME, FIXME, FIXME
export default function values (type: TypeDef | null): Array<RawParam> {
  if (!type) {
    return [];
  }

  return [];

  const types = params.map(({ type }) => type);

  return types.map((type): RawParam => {
    if (Array.isArray(type)) {
      if (type.length !== 1) {
        console.error('Unable to determine default values for tuple type', type);

        return {
          isValid: false,
          type,
          value: void 0
        };
      }

      // NOTE special cases for where we have a known override formatter. See comments
      // in ./inintValueArray.ts
      if (type[0] === 'KeyValueStorage') {
        return {
          isValid: false, // invalid to start with, empty array
          type,
          value: []
        };
      }

      const value: RawParam$ValueArray = [];

      return type.reduce(({ isValid, type }, subtype) => {
        const avalue = getInitValue(subtype);

        value.push(avalue);

        return {
          isValid: isValid && !isUndefined(avalue),
          type,
          value
        };
      // FIXME Arrays are currently not valid as inputs, no rendered
      }, { isValid: false, type, value });
    }

    const value = getInitValue(type);

    return {
      isValid: !isUndefined(value),
      type,
      value
    };
  });
}
