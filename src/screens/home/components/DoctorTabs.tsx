/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, TouchableOpacity, View} from 'react-native'
import {useMemo} from 'react'
import {ACCOUNT_TYPE} from '~/api/common/secretKeys'
import {Text} from '~/components/ui/text'
import {cn} from '~/lib/utils'
import {
  useDotorCategorySelector,
  useDotorCategorySelectorControl,
} from '~/context/doctorCategoryContext'

export default function DoctorTabs() {
  const {selectDoctor} = useDotorCategorySelector()
  const {setSelectDoctor} = useDotorCategorySelectorControl()

  const doctorCategory = [
    {
      id: 'dee826663',
      title: 'All',
      select: `All`,
    },
    {
      id: 'dee33',
      title: 'General Physician',
      select: `General Physician`,
    },
    {
      id: 'dlkk933',
      title: 'Cardiologist',
      select: `Cardiologist`,
    },
  ]

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
        }}>
        {doctorCategory.map(({id, title, select}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectDoctor(select)
            }}
            disabled={select === selectDoctor}
            activeOpacity={0.8}
            key={id}
            className={cn(
              'mx-4 px-3 py-2 rounded-full',
              select === selectDoctor ? 'bg-primary' : 'bg-gray-200',
            )}>
            <Text
              className={cn(
                'font-normal text-xl text-white',
                select === selectDoctor ? 'text-white' : 'text-black',
              )}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
