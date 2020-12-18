import { useContext } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import { LikePictureById, DislikePictureById } from '../../domain/picture/picture.actions';
import { LikeButton, BookmarkButton } from '../buttons';
import './Card.css';


export function Card({ picture }) {
    const { state, dispatch } = useContext(ApplicationContext);
    const userLiked = picture.likedBy && picture.likedBy.find(like => like === state.user._id)

    const onLike = (pictureId) => {
        LikePictureById(dispatch, pictureId)
    }

    const onDislike = (pictureId) => {
        DislikePictureById(dispatch, pictureId)
    }

    const handleLikeButton = (pictureId) => {
        if(userLiked) {
            onDislike(pictureId)
        }else {
            onLike(pictureId)
        }
    }

    if (!state.user) return null
    return (
        <div className="card">
            <div className="card-img">
                <img src={picture.download_url} />
                <LikeButton onClick={() => { handleLikeButton(picture.id) }} isLiked={userLiked} />
                <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
                <BookmarkButton onClick={() => { }} />
            </div>
            <div className="card-body">
                <h3>
                    Author : {picture.author}
                </h3>
                <div className="card-comments">
                    Comments
                    <ul>
                        <li>
                            Sample comment
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

}