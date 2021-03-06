import { Entypo, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import tw from 'twrnc'
import { setArraySongs, likeSong, showPlayerBar, playSong } from '../../redux/actions/songsAction';
import SongPostOptionModal from '../Modal/SongPostOptionModal';
import ListCommentSongPost from '../SongComments/ListCommentSongPost';
import WriteCommentSongs from '../SongComments/WriteCommentSongs';



const SongPost = ({ dispatch, item, token }) => {
    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    const FRAMESIZE_W = SCREEN_WIDTH;
    const FRAMESIZE_H = SCREEN_WIDTH * 5 / 9;

    const [isTotalHeart, setTotalHeart] = useState(item.item.songFeelList.length);
    const [isHeart, setHeart] = useState(item.item.songFeelList.length);
    const [isTotalComment, setTotalComment] = useState(item.item.songCommentList.length)

    const [isVisible, setVisible] = useState(false);
    const refRBSheet = useRef();



    const handlePlaySong = () => {
        dispatch(setArraySongs(
            [{ song: item.item }]
        ))
        dispatch(showPlayerBar())
        dispatch(playSong())
    }

    const handleHeart = () => {
        setHeart(!isHeart)
        isHeart ? setTotalHeart(isTotalHeart - 1) : setTotalHeart(isTotalHeart + 1)
        dispatch(likeSong({
            token,
            tusId: item.item.songId,
            userId: item.item.songUserList[0].userId
        }))
    }

    const handleComment = () => {
        refRBSheet.current.open()
    }


    return (
        <View style={[tw`mb-3 mt-1 overflow-hidden w-full`]}>
            <TouchableOpacity
                style={[tw`shadow-lg`, { height: FRAMESIZE_H }]}
                activeOpacity={.8}
                onPress={handlePlaySong}
            >
                <Image
                    source={item.item.image ? { uri: item.item.image } : require('../../assets/images/default-song-avatar.jpeg')}
                    style={tw`w-full h-full bg-gray-600 rounded-lg`}
                    resizeMode='cover'
                />

                <View style={tw` absolute bottom-1 left-1 right-1 flex flex-row items-center p-1`}>
                    <View>
                        <Image
                            source={item.item?.avatar ? { uri: item.item?.avatar } : require('../../assets/images/defaultAvatar.png')}
                            style={tw`w-12 h-12 rounded-full`}
                        />
                    </View>
                    <View style={tw`ml-2`}>
                        <View>
                            <Text style={tw`bg-black text-white px-1 text-lg`}>{item.item.name}</Text>
                        </View>
                        <View style={tw`flex flex-row`}>
                            <Text style={tw`leading-4 text-gray-300 bg-black px-1 pb-[3]`}>{item.item.userName}</Text>
                        </View>
                        <View style={tw`flex flex-row items-center`}>
                            <Ionicons name='ios-play' size={12} style={[tw`text-gray-300 bg-black h-4 pt-[2] pl-1`]} />
                            <Text style={tw`text-xs text-gray-300 bg-black h-4 pr-1`}> none</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={tw`flex flex-row items-center justify-between px-3`}>
                <View style={tw`flex flex-row items-center`}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        style={tw`my-1 items-center flex-row`}
                        onPress={handleHeart}
                    >
                        <Ionicons name={isHeart ? 'heart' : 'heart-outline'}
                            style={isHeart ? tw`text-2xl text-[#ED4366]` : tw`text-2xl text-white`}
                        />
                        <Text style={tw`text-white ml-1`}>{isTotalHeart}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.7}
                        style={tw`mx-4 flex-row items-center`}
                        onPress={handleComment}
                    >
                        <Ionicons name="chatbubble-ellipses-outline"
                            style={tw`text-2xl text-[#FEFEFD] `}
                        />
                        <Text style={tw`text-white text-center ml-1`}>{isTotalComment}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.7}
                    >
                        <Ionicons name="md-share-social-outline"
                            style={tw`text-[#FEFEFD] my-2 text-xl`}
                        />
                    </TouchableOpacity>
                </View>

                {/* CALL OPTION MODAL */}


                <TouchableOpacity
                    onPress={() => setVisible(true)}
                >
                    <Entypo name="dots-three-horizontal"
                        size={20}
                        style={tw`text-white`}
                    />
                </TouchableOpacity>

            </View>
            <SongPostOptionModal
                isVisible={isVisible}
                setVisible={setVisible}
                songId={item.item.songId}
                token={token}
            />
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={520}
                openDuration={250}
                customStyles={{
                    wrapper: tw`bg-black bg-opacity-30`,
                    container: tw`bg-gray-100 rounded-t-lg flex flex-col`
                }}
            >
                <View
                    style={tw`flex-1 flex flex-col w-full`}
                >
                    <ListCommentSongPost refRBSheet={refRBSheet} />
                </View>
                <View style={tw`mb-2 w-full`} >
                    <WriteCommentSongs songId={item.item.songId} />
                </View>

            </RBSheet>
        </View>
    )
}

export default SongPost