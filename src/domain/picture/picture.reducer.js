import { types } from './picture.actions';

export default function reducer(state, action) {
    switch (action.type) {
        case types.PICTURE_STARTED:
            return {
                ...state,
                pending: true
            }
        case types.PICTURE_DONE:
            return {
                ...state,
                pending: false,
                pictures: action.payload
            }
        case types.PICTURE_LIKED:
            const { pictures, user } = state;
            const idx = pictures.findIndex(picture => picture._id === action.payload._id);
            pictures[idx] = { ...pictures[idx], likedBy: [...pictures[idx].likedBy, user._id] };
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }
        case types.PICTURE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default:
            return state;
    }
}
