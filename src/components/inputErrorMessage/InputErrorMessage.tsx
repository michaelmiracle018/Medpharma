import {View, Text} from 'react-native'
import {ErrorMessage} from '@hookform/error-message'
import {FieldErrors} from 'react-hook-form'
import {cn} from '~/lib/utils'

type Props = {
  errors: FieldErrors<any>
  name: string
  classNameText?: string | undefined
}

export default function InputErrorMessage({
  errors,
  name,
  classNameText,
}: Props) {
  return (
    <View>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({message}) => (
          <Text className={cn('text-destructive', classNameText)}>
            {message}
          </Text>
        )}
      />
    </View>
  )
}
