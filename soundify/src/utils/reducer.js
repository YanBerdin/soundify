import { reducerCases } from './Constants';

export const initialState = {
  token: null,
  playlists: [],
  selectedPlaylist: null,
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
};

const reducer = (state, action) => {

  switch (action.type) {

    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
      default:
        return state;
    }
};

export default reducer;
