import * as types from '../actions/actionTypes';

const bingoSize = 4;

const initialState = {
  decksAll: [],
  deckSelected: false,
  activeCells: [],
  terms: ['Im Vorjahr gab es einen ähnlichen Song', 'Schräge Vögel sind dabei', 'Irgendwer erwähnt \"Ein bisschen Frieden\"',
  'Germany: 6 Points', 'Auftritt einer Boygroup', 'Falsche Brüste, falsche \nWimpern & falsche Haare',
  'Kein außergewöhnlicher Sound \nund vorhersehbare Tanzschritte', 'Es gibt einen Schwiegersohnliebling',
  'Outfits der Teilnehmer \nleuchten wie Diskokugeln', 'Nachbarschaftshilfe bei Ostblock-Staaten',
  'Bei Make-up gilt: Klotzen statt Kleckern', '\"This is ... calling\"', 'Mindestens eine Landesmoderatorin verwendet Botox',
  '\"It\'s Eurovision Tradition\"', 'Im letzten Jahr hat dieser Stil funktioniert', 'Ralph Siegel ist wieder dabei',
  'Übertriebenes Flaggenwedeln \nund Verteilen von Handküsschen', 'Punkte-Mafia bei den kleineren Ländern',
  '\"Thank you sooooooo \nmuch for the wonderful show!\"', 'Interpret gibt sich seinem \nLied voll und ganz hin',
  'Geschichtsträchtiger Song', 'Background Sänger singen \nbesser als eigentliche Performer',
  'Spar-Grand-Prix mit nur einer \nModeratorin und weniger Budget', 'Unendlich viel Nebel auf der Bühne',
  'Kleider der Sängerinnen bedecken \nnur das Notwendigste', 'more', 'more', 'more', 'more'],
  termsSelected: ['Im Vorjahr gab es einen ähnlichen Song', 'Schräge Vögel sind dabei', 'Irgendwer erwähnt \"Ein bisschen Frieden\"',
    'Germany: 6 Points', 'Auftritt einer Boygroup', 'Falsche Brüste, falsche \nWimpern & falsche Haare',
    'Unendlich viel Nebel auf der Bühne', 'Es gibt einen Schwiegersohnliebling',
    'Outfits der Teilnehmer \nleuchten wie Diskokugeln', 'Nachbarschaftshilfe bei Ostblock-Staaten',
    'Bei Make-up gilt: Klotzen statt Kleckern', '\"This is ... calling\"', 'Mindestens eine Landesmoderatorin verwendet Botox',
    '\"It\'s Eurovision Tradition\"', 'Im letzten Jahr hat dieser Stil funktioniert', 'Ralph Siegel ist wieder dabei'],
  started: false
};

export default function bingo(state = initialState, action = {}) {
  switch (action.type) {

    case types.SELECT_DECK:
      return {
        ...state,
        deckSelected: action.deck
      };

    case types.TOGGLE_TERM:

      let selected = [];

      if (state.termsSelected.includes(action.term)) {
        selected = state.termsSelected.filter( (t) => t != action.term );
      } else {
        selected = state.termsSelected.concat([action.term]);
      }

      const readyToPlay = (selected.length === 16);

      return {
        ...state,
        termsSelected: selected,
        readyToPlay
      };

    case types.START_GAME:

      const termsShuffled = shuffle(state.termsSelected);

      return {
        ...state,
        termsSelected: termsShuffled,
        started: true
      };

    case types.TOGGLE_CELL:

      const term = action.term;
      let activeCells;

      if (state.activeCells.includes(term)) {
        activeCells = state.activeCells.filter( (t) => t != term);
      } else {
        activeCells = state.activeCells.concat([term]);
      }

      const bingo = getBingo(activeCells.map( c => state.termsSelected.indexOf(c)));

      return {
        ...state,
        activeCells,
        bingo
      };

    case types.DECKS_LOADED:

      return {
        ...state,
        decksAll: action.decks
      };

    default:
      return state;
  }
}

function shuffle(a) {
  const b = Object.assign([], a);
  for (let i = b.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [b[i - 1], b[j]] = [b[j], b[i - 1]];
  }
  return b;
}

function getBingo(activeCells) {

  // columns
  for (let i = 0; i < bingoSize; i++) {
    if (activeCells.filter( c => c % bingoSize === i).length === bingoSize) return true;
  }

  // rows
  for (let i = 1; i <= bingoSize; i++) {
    if (activeCells.filter( c => c >= (i-1) * bingoSize && c < i * bingoSize).length === bingoSize) return true;
  }

  // diagonal
  // if (activeCells.filter(c => c === 0 || c === 6 || c === 12 || c === 18 || c === 24).length === 5) return true;
  // if (activeCells.filter(c => c === 4 || c === 8 || c === 12 || c === 16 || c === 20).length === 5) return true;
  if (activeCells.filter(c => c === 0 || c === 5 || c === 10 || c === 15 ).length === 4) return true;
  if (activeCells.filter(c => c === 3 || c === 6 || c === 9 || c === 12 ).length === 4) return true;

  return false;
}