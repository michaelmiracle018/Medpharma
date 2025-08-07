import {NavigationContainer} from '@react-navigation/native'
interface Props {
  children: JSX.Element[] | JSX.Element
}
export default function AllNavigation({children}: Props) {
  return <NavigationContainer>{children}</NavigationContainer>
}
