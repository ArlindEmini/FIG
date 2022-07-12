import React from 'react';
import { Button } from 'react-native-paper';
import { useStore } from '../../store';

export const Header = () => {
  const increasePopulation = useStore(state => state.increasePopulation)

  return (
    <Button mode="contained" onPress={increasePopulation}>Plus one arush</Button>
  )
}