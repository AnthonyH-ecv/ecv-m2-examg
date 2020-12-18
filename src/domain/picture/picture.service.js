
export function getPictures() {
    return fetch('/api/pictures')
        .then(async res => {
            if (res.status !== 200 && res.status !== 201) {
                const { message } = await res.json()
                throw new Error(message)
            }
            return res
        })
        .then(res => res.json())
}

export function getPictureById(pictureID) {
    return fetch(`/api/pictures/${pictureID}`)
        .then(async res => {
            if (res.status !== 200 && res.status !== 201) {
                const { message } = await res.json()
                throw new Error(message)
            }
            return res
        })
        .then(res => res.json());
}

export function likePicture(pictureID) {
    return fetch(`/api/pictures/${pictureID}/like`, {
        method: 'PUT'
    })
        .then(async res => {
            if (res.status !== 200 && res.status !== 201) {
                const { message } = await res.json()
                throw new Error(message)
            }
            return res
        })
        .then(res => res.json());
}

export function dislikePicture(pictureID) {
    return fetch(`/api/pictures/${pictureID}/unlike`, {
        method: 'PUT'
    })
        .then(async res => {
            if (res.status !== 200 && res.status !== 201) {
                const { message } = await res.json()
                throw new Error(message)
            }
            return res
        })
        .then(res => res.json());
}