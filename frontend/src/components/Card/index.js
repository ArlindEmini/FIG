import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { View } from "react-native"
import {  Card,  Button, Avatar } from "react-native-paper";
import { styles } from "./style";
import { generateHexColor } from "../../utils/colors";

const CustomCard = ({ title = "", subTitle, showActions, showAvatar = false, reloadColor = true, children }) => {
  
  const [first = "", last = ""] = title.split(" ");
  const firstInitial = first.charAt(0);
  const lastInitial = last.charAt(0);
  const initials = `${firstInitial}${lastInitial}`;
  const [color, setColor] = useState(generateHexColor());

  useEffect(() => { 
    if (reloadColor) {
      setColor(generateHexColor());
    }
  }, [reloadColor]);

  const CardTitleProps = {};

  if (showAvatar) { 
    CardTitleProps.left = () => <Avatar.Text
      style={{
        backgroundColor: color,
      }}  size={40} label={initials} />;
  }

  return (
    <View style={styles.mainView}> 
      <Card style={styles.card} >
        <Card.Title
          title={title}
          subtitle={subTitle}
          style={styles.title}
          {...CardTitleProps}
        />
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
  children: PropTypes.any,
  showAvatar: PropTypes.bool,
  reloadColor: PropTypes.bool,
};

export default CustomCard
