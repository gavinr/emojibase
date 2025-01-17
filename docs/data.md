# Datasets

Emoji's are generated into JSON files called datasets, with each dataset being grouped into one of
the following: localized data, versioned data, and metadata. These datasets can be found within the
`emojibase-data` package.

```
yarn add emojibase-data
// Or
npm install emojibase-data
```

> JSON files will need to be parsed manually unless handled by a build/bundle process.

## Usage

As stated, there are 3 groups of datasets, each serving a specific purpose. The first group,
localized data, is exactly that, datasets with localization provided by [CLDR 36.1][cldr]. The
following locales and languages are currently supported:

- `emojibase-data/zh/data.json` - Chinese (zh)
- `emojibase-data/zh-hant/data.json` - Chinese, Traditional (zh-hant)
- `emojibase-data/da/data.json` - Danish (da)
- `emojibase-data/nl/data.json` - Dutch (nl)
- `emojibase-data/en/data.json` - English (en)
- `emojibase-data/en-gb/data.json` - English, Great Britain (en-gb)
- `emojibase-data/fr/data.json` - French (fr)
- `emojibase-data/de/data.json` - German (de)
- `emojibase-data/it/data.json` - Italian (it)
- `emojibase-data/ja/data.json` - Japanese (ja)
- `emojibase-data/ko/data.json` - Korean (ko)
- `emojibase-data/ms/data.json` - Malay (ms)
- `emojibase-data/pl/data.json` - Polish (pl)
- `emojibase-data/pt/data.json` - Portuguese (pt)
- `emojibase-data/ru/data.json` - Russian (ru)
- `emojibase-data/es/data.json` - Spanish (es)
- `emojibase-data/es-mx/data.json` - Spanish, Mexico (es-mx)
- `emojibase-data/sv/data.json` - Swedish (sv)
- `emojibase-data/th/data.json` - Thai (th)

These datasets return an array of emoji objects that adhere to the defined
[data structure](#data-structure).

> Missing localizations will fallback to English.

```ts
import emojis from 'emojibase-data/en/data.json';
```

The second group, versioned data, provides datasets for emoji and Unicode release versions. These
datasets return a map, with the key being the version, and the value being an array of emoji
hexcodes included in the associated release version.

- `emojibase-data/versions/emoji.json` - Emoji characters grouped by emoji version.
- `emojibase-data/versions/unicode.json` - Emoji characters grouped by Unicode version.

```ts
import unicodeVersions from 'emojibase-data/versions/unicode.json';
```

The third and last group, metadata, provides specialized datasets for unique use cases.

- `emojibase-data/meta/groups.json` - A map of non-localized emoji groups (Smileys & People),
  subgroups (Sky & Weather), and hierarchy, according to the official Unicode data files.
- `emojibase-data/meta/hexcodes.json` - An array of all emoji hexcodes (hexadecimal codepoints).
- `emojibase-data/meta/shortcodes.json` - An array of all emoji shortcodes.
- `emojibase-data/meta/unicode.json` - An array of all emoji unicode characters, including text and
  emoji presentation characters.

```ts
import { groups, subgroups, hierarchy } from 'emojibase-data/meta/groups.json';
```

## Data Structure

Each emoji character found within the pre-generated datasets are represented by an object composed
of the properties listed below. In an effort to reduce the overall dataset filesize, most property
values have been implemented using integers,
[with associated constants](https://github.com/milesj/emojibase/blob/master/packages/core/src/constants.ts).

- `annotation` (string) - A localized description, provided by [CLDR 36.1][cldr], primarily used for
  text-to-speech (TTS) and accessibility.
- `emoji` (string) - The emoji presentation Unicode character.
- `emoticon` (string) - If applicable, an emoticon representing the emoji character.
- `gender` (number) - If applicable, the gender of the emoji character. `0` for female, `1` for
  male.
- `group` (number) - The categorical group the emoji belongs to, ranging from `0` (smileys) to `7`
  (flags).
- `hexcode` (string) - The hexadecimal representation of the emoji Unicode codepoint, including zero
  width joiners and variation selectors.
- `name` (string) - The generated name according to the official [Unicode data][ucd].
- `order` (number) - The order in which emoji should be displayed on a device, through a keyboard or
  emoji picker.
- `shortcodes` (string[]) - An array of community curated shortcodes. _Does not include surrounding
  colons_.
- `skins` (emoji[]) - If applicable, an array of emoji objects for each skin tone modification,
  starting at light skin, and ending with dark skin.
- `subgroup` (number) - The categorical subgroup the emoji belongs to, ranging from `0` to `75`.
- `tags` (string[]) - An array of localized keywords, provided by [CLDR 36.1][cldr], to use for
  searching and filtering.
- `text` (string) - The text presentation Unicode character.
- `tone` (number | number[]) - If applicable, the skin tone of the emoji character. `1` for light
  skin, `2` for medium-light skin, `3` for medium skin, `4` for medium-dark skin, and `5` for dark
  skin. Multi-person skin tones will be an array of values.
- `type` (number) - The default presentation of the emoji character. `0` for text, `1` for emoji.
- `unicode` (string) - Either the emoji or text presentation Unicode character. _Only available in
  the compact dataset._
- `version` (number) - The version in which the emoji character was released.

> Not all properties will be found in the emoji object, as properties without an applicable value
> are omitted from the emoji object.

```js
{
  annotation: 'man lifting weights',
  emoji: '🏋️‍♂️',
  gender: 1,
  group: 0,
  hexcode: '1F3CB-FE0F-200D-2642-FE0F',
  name: 'WEIGHT LIFTER, MALE SIGN',
  order: 1518,
  shortcodes: [
    'man_lifting_weights',
  ],
  subgroup: 0,
  tags: [
    'weight lifter',
    'man',
  ],
  type: 1,
  version: 4,
  skins: [
    {
      annotation: 'man lifting weights: light skin tone',
      emoji: '🏋🏻‍♂️',
      gender: 1,
      group: 0,
      hexcode: '1F3CB-1F3FB-200D-2642-FE0F',
      name: 'WEIGHT LIFTER, MALE SIGN, EMOJI MODIFIER FITZPATRICK TYPE-1-2',
      order: 1522,
      shortcodes: [
        'man_lifting_weights_tone1',
      ],
      subgroup: 0,
      type: 1,
      tone: 1,
      version: 4,
    },
    // ...
  ],
},
```

## Compact Format

While the emoji data is pretty thorough, not all of it may be required, and as such, a compact
dataset is supported. This dataset supports the following properties: `annotation`, `emoticon`,
`group`, `hexcode`, `order`, `shortcodes`, `skins`, `tags`, and `unicode`.

To use a compact dataset, replace `data.json` with `compact.json`.

```ts
import data from 'emojibase-data/en/compact.json';
```

```js
{
  annotation: 'man lifting weights',
  group: 0,
  hexcode: '1F3CB-FE0F-200D-2642-FE0F',
  order: 1518,
  shortcodes: [
    'man_lifting_weights',
  ],
  tags: [
    'weight lifter',
    'man',
  ],
  unicode: '🏋️‍♂️',
  skins: [
    {
      annotation: 'man lifting weights: light skin tone',
      group: 0,
      hexcode: '1F3CB-1F3FB-200D-2642-FE0F',
      order: 1522,
      shortcodes: [
        'man_lifting_weights_tone1',
      ],
      unicode: '🏋🏻‍♂️',
    },
    // ...
  ],
},
```

## Fetching From A CDN

If you prefer to not inflate your bundle size with these large JSON datasets, you can fetch them
from our CDN ([provided by jsdelivr.com](https://cdn.jsdelivr.net/npm/emojibase-data@latest/)) using
`fetchFromCDN`.

```ts
import { fetchFromCDN } from 'emojibase';

fetchFromCDN('en/data.json').then((emojis) => {
  // Do something with it!
});
```

Learn more about the [`fetchFromCDN` API](./api.md#fetchFromCDN).

[cldr]: http://cldr.unicode.org/index/downloads/cldr-36
[ucd]: http://unicode.org/Public/10.0.0/ucd/UnicodeData.txt

## Filesizes

| File                  | Size      | Gzipped   |
| --------------------- | --------- | --------- |
| meta/groups.json      | 3.78 KB   | 1.21 KB   |
| meta/shortcodes.json  | 28.44 KB  | 8.56 KB   |
| meta/unicode.json     | 57.48 KB  | 10.59 KB  |
| meta/hexcodes.json    | 72.51 KB  | 10.59 KB  |
| versions/unicode.json | 73.96 KB  | 10.11 KB  |
| versions/emoji.json   | 74 KB     | 10.21 KB  |
| zh-hant/compact.json  | 491.99 KB | 70.92 KB  |
| zh/compact.json       | 515.49 KB | 77.71 KB  |
| sv/compact.json       | 525.24 KB | 74.39 KB  |
| da/compact.json       | 529.71 KB | 74.76 KB  |
| en/compact.json       | 530.53 KB | 71.82 KB  |
| en-gb/compact.json    | 530.81 KB | 71.94 KB  |
| fr/compact.json       | 540.95 KB | 73.89 KB  |
| nl/compact.json       | 542.61 KB | 74.9 KB   |
| ko/compact.json       | 544.25 KB | 79.49 KB  |
| pt/compact.json       | 545.36 KB | 77.05 KB  |
| ja/compact.json       | 548.64 KB | 80.1 KB   |
| ms/compact.json       | 550.71 KB | 75.23 KB  |
| es-mx/compact.json    | 558.3 KB  | 77.06 KB  |
| pl/compact.json       | 559.52 KB | 80.93 KB  |
| es/compact.json       | 559.55 KB | 77.1 KB   |
| it/compact.json       | 561.4 KB  | 78.78 KB  |
| de/compact.json       | 563.42 KB | 81.3 KB   |
| ru/compact.json       | 659.52 KB | 89.52 KB  |
| th/compact.json       | 671.2 KB  | 80.73 KB  |
| zh-hant/data.json     | 795.11 KB | 98.88 KB  |
| zh/data.json          | 818.61 KB | 105.62 KB |
| sv/data.json          | 828.36 KB | 102.04 KB |
| da/data.json          | 832.82 KB | 102.06 KB |
| en/data.json          | 833.65 KB | 99.11 KB  |
| en-gb/data.json       | 833.93 KB | 99.22 KB  |
| fr/data.json          | 844.07 KB | 101.49 KB |
| nl/data.json          | 845.73 KB | 102.12 KB |
| ko/data.json          | 847.37 KB | 107.35 KB |
| pt/data.json          | 848.48 KB | 104.56 KB |
| ja/data.json          | 851.76 KB | 108.06 KB |
| ms/data.json          | 853.82 KB | 102.63 KB |
| es-mx/data.json       | 861.42 KB | 104.61 KB |
| pl/data.json          | 862.64 KB | 108.53 KB |
| es/data.json          | 862.67 KB | 104.64 KB |
| it/data.json          | 864.52 KB | 106.51 KB |
| de/data.json          | 866.54 KB | 109.37 KB |
| ru/data.json          | 962.64 KB | 117.61 KB |
| th/data.json          | 974.31 KB | 108.86 KB |
