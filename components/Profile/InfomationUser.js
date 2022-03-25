import { View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'


const InfomationUser = ({name, avatar, email}) => {

    return (
        <View style={tw`pt-2 px-5`}>
           <View style={tw`flex flex-row items-center justify-between`}>
                <Image 
                    source={avatar ? {uri: avatar} : (require('../../assets/images/defaultAvatar.png'))}
                    style={[{width: 70, height: 70},tw`rounded-full mr-4 border border-[#5EC2EA]`]}
                />
                <View style={tw`flex-1 flex flex-row items-center`}>
                    <View style={tw`flex-1 flex items-center`}>
                        <Text style={tw`font-bold text-gray-400 `}>Post</Text>   
                        <Text style={tw`font-bold text-xl`}>36</Text>                     
                    </View>
                    <View style={tw`flex-1 flex items-center`}>
                        <Text style={tw`font-bold text-gray-400 `}>Following</Text>   
                        <Text style={tw`font-bold text-xl`}>537</Text>                     
                    </View>
                    <View style={tw`flex-1 flex items-center`}>
                        <Text style={tw`font-bold text-gray-400 `}>Followers</Text>   
                        <Text style={tw`font-bold text-xl`}>986</Text>                     
                    </View>
                </View>
           </View>
           <View style={tw`mt-4`}>
               <Text style={tw`text-gray-500 text-xs`}>
                    {email}
               </Text>
               <Text style={tw`text-2xl mt-1 font-bold`}>
                   {name}
               </Text>
               <Text style={tw`mt-5`}>
                   loading 99%.......error
               </Text>
           </View>
        </View>
    )
}

export default InfomationUser
