/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣',
  'I': '🚽',
  'HEART': '❤',
  'PLAYER': '🤢',
  'SICK': '🤮',
  'HAPPY': '😃',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
};

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  O-XXXXXXXX
  X-XXXXXXXX
  X-----XXXX
  XXXXX-XXXX
  XXXXX-XXXX
  X-----XXXX
  X-XXXXXXXX
  X-------XX
  XXXXXXX-XX
  XXXI----XX
`);
maps.push(`
  XXXXXXXXXI
  XX--------
  XX-XXXXXXX
  X--XXXXXXX
  X-XXXXXXXX
  X-------XX
  XXXXXXX-XX
  XXX-----XX
  XXX-XXXXXX
  XXXOXXXXXX
`);
maps.push(`
  XXXXXXXXXO
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  I---------
`);