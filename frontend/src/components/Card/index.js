import React from "react";
import PropTypes from 'prop-types';
import { View } from "react-native"
import {  Card,  Button } from "react-native-paper";
import { styles } from "./style";

const CustomCard = ({ title , subTitle, showActions, children}) => {

  return (
    <View style={styles.mainView}> 
      <Card style={styles.card} >
        <Card.Title title={title} subtitle={subTitle} style={styles.title}/>
        <Card.Content style={styles.content}>
          {children}
        </Card.Content>
        {
          showActions && 
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
        }
      </Card>
    </View>
  )
}

CustomCard.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  showActions: PropTypes.bool,
  children: PropTypes.any
};

export default CustomCard