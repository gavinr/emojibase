/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

/* eslint-disable quote-props */

// $FlowIgnore Laziness
import { Trie } from 'regexgen';
import buildEmojiData from '../builders/buildEmojiData';
import cleanHexcode from '../helpers/cleanHexcode';
import log from '../helpers/log';
import writeRegex from '../helpers/writeRegex';
import flattenAndFilterData from './flattenAndFilterData';
import toUnicode from './toUnicode';

function createRegexTrie(data: Object, display: string = 'both', unicode: boolean = false) {
  const flags = unicode ? 'u' : '';
  const fileName = (display === 'both') ? 'index' : display;
  const codePointGroups = {
    '4': new Trie(),
    '3': new Trie(),
    '2': new Trie(),
    '1': new Trie(),
  };

  // Push the unicode characters into the trie,
  // grouped by the number of codepoints
  Object.keys(data).forEach((hexcode) => {
    const { variations } = data[hexcode];
    const group = cleanHexcode(hexcode).split('-').length;

    if (group <= 0 || group > 4) {
      return;
    }

    codePointGroups[group].add(toUnicode(hexcode));

    if (variations) {
      if (variations.emoji && (display === 'emoji' || display === 'both')) {
        codePointGroups[group].add(toUnicode(variations.emoji));
      }

      if (variations.text && (display === 'text' || display === 'both')) {
        codePointGroups[group].add(toUnicode(variations.text));
      }
    }
  });

  // Create the regex patterns
  const pattern = (display === 'text')
    ? codePointGroups[1].toRegExp(flags).source
    : [4, 3, 2, 1].map(group => `(?:${codePointGroups[group].toRegExp(flags).source})`).join('|');

  writeRegex(`${unicode ? 'unicode/' : ''}${fileName}.js`, pattern);

  return codePointGroups;
}

export default async function generateRegex() {
  log.title('regex', 'Generating regex patterns');

  const data = flattenAndFilterData(await buildEmojiData(), true);

  createRegexTrie(data, 'both');
  createRegexTrie(data, 'both', true);
  createRegexTrie(data, 'emoji');
  createRegexTrie(data, 'emoji', true);
  createRegexTrie(data, 'text');
  createRegexTrie(data, 'text', true);

  log.success('regex', 'Generated regex patterns');
}
