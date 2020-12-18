import { getPictures, getPictureById, likePicture, dislikePicture } from './picture.service';

export const types = {
    PICTURE_STARTED: 'PICTURE_STARTED',
    PICTURE_DONE: 'PICTURE_DONE',
    PICTURE_LIKED: 'PICTURE_LIKED',
    PICTURE_DISLIKED: 'PICTURE_DISLIKED',
    PICTURE_FAILED: 'PICTURE_FAILED'
}

export function fetchPictures(dispatch) {
    dispatch(_started());
    getPictures()
        .then(pictures => dispatch(_onSuccess(pictures)))
        .catch(error => dispatch(_onError(error)));
}

export function fetchPictureById(dispatch, pictureId) {
    dispatch(_started());
    getPictureById(pictureId)
        .then(picture => dispatch(_onSuccess([picture])))
        .catch(error => dispatch(_onError(error)));
}

export function LikePictureById(dispatch, pictureId) {
    dispatch(_started());
    likePicture(pictureId)
        .then(picture => dispatch(_onLiked(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function DislikePictureById(dispatch, pictureId) {
    dispatch(_started());
    dislikePicture(pictureId)
        .then(picture => dispatch(_onDisliked(picture)))
        .catch(error => dispatch(_onError(error)));
}

function _started() {
    return {
        type: types.PICTURE_STARTED
    }
}

function _onSuccess(pictures) {
    return {
        type: types.PICTURE_DONE,
        payload: pictures
    }
}

function _onLiked(picture) {
    return {
        type: types.PICTURE_LIKED,
        payload: picture
    }
}

function _onDisliked(picture) {
    return {
        type: types.PICTURE_DISLIKED,
        payload: picture
    }
}

function _onError(error) {
    return {
        type: types.PICTURE_FAILED,
        payload: error
    }
}