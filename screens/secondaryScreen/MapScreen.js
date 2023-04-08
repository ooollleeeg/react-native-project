import React from "react";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { secondaryScreensStyles } from "./secondaryScreensStyles";
import mapMarker from "../../assets/images/mapMarker.png";

const { mapWrapper, mapStyle, goBackBtn, textBtn } = secondaryScreensStyles;

const MapScreen = ({ route }) => {
  const navigation = useNavigation();
  const { latitude, longitude, fromScreen } = route.params;

  const handleGoBack = () => {
    if (fromScreen === "posts") {
      navigation.navigate("Posts");
    } else navigation.navigate("Profile");
  };

  return (
    <View style={mapWrapper}>
      <MapView
        style={mapStyle}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="Travel Photo"
          image={mapMarker}
        />
      </MapView>
      <TouchableOpacity style={goBackBtn} onPress={handleGoBack}>
        <Text style={textBtn}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
