import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { deletePost, getListPostUser } from '../../redux/actions/postsAction';



const OnDeletePostModal = ({handleVisibleDeleteModal, isVisibleDeleteModal, isIdPostSelected}) => {

    const dispatch = useDispatch();
    const { token, userId } = useSelector(state => state.authReducer)

    const handleDelete = () => {
        dispatch(deletePost({token, postsId: isIdPostSelected}))
        dispatch(getListPostUser({userId, token}))
        handleVisibleDeleteModal()
    }

  return (
    <Modal  
        visible={isVisibleDeleteModal}
        transparent={true}
        animationType="slide"
    >   
        <View style={tw`w-full h-full flex flex-col`}>
            <TouchableOpacity
                style={tw`w-full h-full flex-1`}
                onPress={handleVisibleDeleteModal}
            />
            <View style={tw`px-3 my-10`}>
                <TouchableOpacity
                    style={tw`bg-white rounded-lg items-center justify-center py-3 shadow-xl`}
                    onPress={handleDelete}
                >
                    <Text style={tw`text-red-400 text-base`}>Delete</Text>
                </TouchableOpacity>
            </View>

        </View>
    </Modal>
  )
}

export default OnDeletePostModal