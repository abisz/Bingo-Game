import * as types from '../actions/actionTypes';

const initialState = {
  decksAll: ['Harry Potter', 'Meeting', 'Lord of the Rings', 'Eurovision Song Contest'],
  deckSelected: false,
  terms: ['Im Vorjahr gab es einen ähnlichen Song', 'Schräge Vögel sind dabei', 'Irgendwer erwähnt \"Ein bisschen Frieden\"',
  'Germany: 6 Points', 'Auftritt einer Boygroup', 'Falsche Brüste, falsche \nWimpern & falsche Haare',
  'Kein außergewöhnlicher Sound \nund vorhersehbare Tanzschritte', 'Es gibt einen Schwiegersohnliebling',
  'Outfits der Teilnehmer \nleuchten wie Diskokugeln', 'Nachbarschaftshilfe bei Ostblock-Staaten',
  'Bei Make-up gilt: Klotzen statt Kleckern', '\"This is ... calling\"', 'Mindestens eine Landesmoderatorin verwendet Botox',
  '\"It\'s Eurovision Tradition\"', 'Im letzten Jahr hat dieser Stil funktioniert', 'Ralph Siegel ist wieder dabei',
  'Übertriebenes Flaggenwedeln \nund Verteilen von Handküsschen', 'Punkte-Mafia bei den kleineren Ländern',
  '\"Thank you sooooooo \nmuch for the wonderful show!\"', 'Interpret gibt sich seinem \nLied voll und ganz hin',
  'Geschichtsträchtiger Song', 'Background Sänger singen \nbesser als eigentliche Performer',
  'Spar-Grand-Prix mit nur einer \nModeratorin und weniger Budget', 'Irgendjemand spielt an der Nebelmaschine',
  'Kleider der Sängerinnen bedecken \nnur das Notwendigste'],
  termsSelected: [],
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

      const readyToPlay = (selected.length === 25);

      return {
        ...state,
        termsSelected: selected,
        readyToPlay
      };

    case types.START_GAME:
      return {
        ...state,
        started: true
      };

    default:
      return state;
  }
}
