import {useContext} from 'react'
import {CounterContext} from '../context/CounterContext'

export default function useCounter(){
  const counterConsumer = useContext(CounterContext)

  return counterConsumer
}