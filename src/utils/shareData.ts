import {Entypo} from '@expo/vector-icons'
import React from 'react'
import HomeScreen from '~/screens/home/HomeScreen'
import {TabNavProps} from '~/types'

export const tabs: TabNavProps[] = [
  {tabName: 'Home', id: 'home', icon: 'home', component: HomeScreen},
  {
    tabName: 'Appointment',
    id: 'appointment',
    icon: 'appointment',
    component: HomeScreen,
  },
  // {tabname: "Home", id: 'home', icon: 'home' }
]
