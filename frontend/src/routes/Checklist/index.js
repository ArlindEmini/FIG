import React, { useEffect, useState } from "react";
import { View , Text} from "react-native";
import { styles } from "./styles";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from "react-native-paper";

const CheckList = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.container}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );

  // return (
  //   <>
  //     <View style={styles.mainView}>
  //       <Text>CheckList</Text>
  //     </View>
  //   </>
  // );
};

export default CheckList;
