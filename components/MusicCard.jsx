import { View, Text } from 'react-native'
import { useState } from 'react'

const MusicCard = ({title, artist, genre, url}) => {
    const [play, setPlay] = useState(false)

    
  return (
    <View className='flex flex-col items-center px-4 mb-14'>
        <View className='flex flex-col gap-3 items-start bg-indi'>
            <Text className='text-yellow-400 rounded-lg font-bold text-lg'>{title}</Text>
            <Text className='text-yellow-400 rounded-lg font-bold text-lg'>{artist}</Text>
            <Text className='text-yellow-400 rounded-lg font-bold text-lg'>{genre}</Text>
        </View>
      
    </View>
  )
}

export default MusicCard