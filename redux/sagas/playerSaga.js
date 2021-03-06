import * as TYPES from '../constants/songs'
import * as ACTION from '../actions/songsAction'
import * as LOADING_ACTION from '../actions/onLoading'
import { put, takeLeading, takeEvery, takeLatest, call, delay } from '@redux-saga/core/effects'
import { addSongToPlaylistAPI, commentSongAPI, createNewPlaylistAPI, deletePlaylistAPI, getLibraryByUIDAPI, getListGenreAPI,
    getListPostedSongsOfUserAPI,
    getListSongByCategoryIdAPI, 
    getPlaylistByLIDAPI, 
    likeSongAPI,  
    removeSongFromPlaylistAPI, 
    uploadSongAPI 
} from '../../apis/songAPIs'




function* getGenre(data) {
    try {
        console.log('GET GENRE RUNNING...')
        const res = yield call(getListGenreAPI, {
            token: data.payload.token
        })
        if(res.status == 'ok') {
            yield put(ACTION.getListCategorySongSuccess(res.data))
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}

function* addSong(data) {
    try {
        console.log('UP LOAD SONG RUNNING..')

        yield put(ACTION.onAddingSong(true))
        const res = yield call(uploadSongAPI, {
            token: data.payload.token,
            formData: data.payload.formData,
        })
        yield put(ACTION.onAddingSong(false))
        if(res.status == 'ok'){
            console.log('success')
            yield put(ACTION.addSongSuccess(true))
            yield delay(5000)
            yield put(ACTION.addSongSuccess(false))
        }
    } catch (error) {
        yield put(ACTION.addSongFailure(true))
        yield delay(5000)
        yield put(ACTION.addSongFailure(false))
    }
}

function* addPlaylist(data) {
    try {
        console.log('ADD PLAYLIST RUNNING...')
        const res = yield call(createNewPlaylistAPI, {
            token: data.payload.token,
            userId: data.payload.userId,
            name: data.payload.name
        })
        if(res.status == 'ok'){
            console.log('ADD PLAYLIST SUCCESS')
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}   

function* getListSongByGenreId(data) {
    try {
        yield put(LOADING_ACTION.onLoadingGetListSongPost(true))
        console.log('GET LIST SONG BY CATEGORY ID RUNNING....')
        const res = yield call(getListSongByCategoryIdAPI, {
            token: data.payload.token,
            categoryId: data.payload.genreId,
        })
        if(res.status == 'ok'){
            yield put(ACTION.getListSongByCategorySuccess(res.data))
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
    yield put(LOADING_ACTION.onLoadingGetListSongPost(false))
}

function* getLibraryByUID(data) {
    try {
        console.log('GET LIBRARY BY UID RUNNING...')
        const res = yield call(getLibraryByUIDAPI, {
            uid: data.payload.userId,
            token: data.payload.token
        })
        if(res.status == 'ok') {
            yield put(ACTION.getLibraryOfUserByUIDSuccess(res.data))
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}

function* getPlaylistByLID(data) {
    try {
        yield put(LOADING_ACTION.onLoadingGetPlaylist(true))
        console.log('GET PLAYLIST BY LIBRARY ID RUNNING...')
        const res = yield call(getPlaylistByLIDAPI, {
            lid: data.payload.lid,
            token: data.payload.token,
        })
        if(res.status == 'ok') {
            yield put(ACTION.getPlaylistByIdSuccess(res.data))
        }
        
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
    yield put(LOADING_ACTION.onLoadingGetPlaylist(false))
}

function* addSongToPlaylist(data) {
    try {
        console.log('ADD SONG TO PLAYLIST RUNINNG...')
        const res = yield call(addSongToPlaylistAPI, {
            token: data.payload.token,
            songId: data.payload.songId,
            libId: data.payload.libId,
        })        
        if(res.status == 'ok') {
            console.log('ADD SUCCESS')
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}

function* getMyListPostedSongs(data) {
    try {
        console.log('GET MY LIST POSTED SONGS RUNINNG...')
        yield put(LOADING_ACTION.onLoadingGetMyListPostedSong(true))
        const res = yield call(getListPostedSongsOfUserAPI, {
            token: data.payload.token,
            userId: data.payload.userId
        })
        if(res.status == 'ok'){
            yield put(ACTION.getMyListPostedSongSuccess(res.data))
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
    yield put(LOADING_ACTION.onLoadingGetMyListPostedSong(false))

}

function* getListPostedSongsOfUser(data) {
    try {
        yield put(LOADING_ACTION.onLoadingGetListPostedSong(true))
        console.log('GET LIST POSTED OF USER SONGS RUNINNG...')
        const res = yield call(getListPostedSongsOfUserAPI, {
            token: data.payload.token,
            userId: data.payload.userId
        })
        if(res.status == 'ok'){
            yield put(ACTION.getListPostedSongsOfUserSuccess(res.data))
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
    yield put(LOADING_ACTION.onLoadingGetListPostedSong(false))
}

function* deletePlaylist(data) {
    try {
        console.log('DELETE PLAYLIST RUNNING...')
        const res = yield call(deletePlaylistAPI, {
            token: data.payload.token,
            libId: data.payload.listSongId,
        })
        if(res.status == 'ok') {
            yield put(ACTION.deletePlaylistSuccess({libId: data.payload.listSongId}))
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}

function* removeSongFromPlaylist(data) {
    try {
        console.log('REMOVE SONG FROM PLAY LIST RUNNING...')
        const res = yield call(removeSongFromPlaylistAPI,{
            token: data.payload.token,
            id: data.payload.id,
        })
        if(res.status == 'ok') {
            console.log('REMOVE SONG SUCCESS.')
            yield put(ACTION.deleteSongFromPlaylistSuccess({id: data.payload.id}))
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}

function* reactSong(data) {
    try {
        console.log('REACT SONG RUNNING..')
        const res = yield call(likeSongAPI, {
            token: data.payload.token,
            tusId: data.payload.tusId,
            userId: data.payload.userId,
        })
        if(res.status == 'ok') {
            console.log('REACT SONG SUCCESS,')
        }
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}

function* commentSong(data) {
    try {
        console.log('COMMENT SONG RUNNING..')
        const res = yield call(commentSongAPI, {
            token: data.payload.token,
            tusId: data.payload.tusId,
            userId: data.payload.userId,
            comment: data.payload.comment,
        })
        if(res.status == 'ok') {
            console.log('COMMENT SUCCESS')
            yield put(ACTION.commentSongSuccess({
                tusId: data.payload.tusId,
                userId: data.payload.userId,
                comment: data.payload.comment,
            }))
        } 
    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}

function* autoNext(data) {
    try {
        console.log('call auto next')
        yield delay(3000)
        yield put(ACTION.nextSong())
        console.log('auto next success')

    } catch (error) {
        yield put(ACTION.actionFailure(error))
    }
}



export default playerSaga = [
    takeLeading(TYPES.GET_LIST_CATEGORY_SONG, getGenre), 
    takeEvery(TYPES.ADD_SONG, addSong),
    takeLatest(TYPES.GET_LIST_SONG_BY_CATEGORY, getListSongByGenreId),
    takeLeading(TYPES.GET_LIBRARY_OF_USER_BY_UID, getLibraryByUID),
    takeLatest(TYPES.GET_PLAYLIST_BY_LID, getPlaylistByLID),
    takeEvery(TYPES.ADD_PLAYLIST, addPlaylist),
    takeEvery(TYPES.ADD_SONG_TO_PLAYLIST, addSongToPlaylist),
    takeLeading(TYPES.GET_MY_LIST_POSTED_SONGS, getMyListPostedSongs),
    takeLatest(TYPES.GET_LIST_POSTED_SONGS_OF_USER, getListPostedSongsOfUser),
    takeLeading(TYPES.DELETE_PLAYLIST, deletePlaylist),
    takeEvery(TYPES.DELETE_SONG_FROM_PLAYLIST, removeSongFromPlaylist),
    takeEvery(TYPES.LIKE_SONG, reactSong),
    takeEvery(TYPES.COMMENT_SONG, commentSong),
    takeLatest(TYPES.AUTO_NEXT_SONG, autoNext),
]