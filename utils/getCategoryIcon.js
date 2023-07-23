import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import COLORS from "../colors";

export const getCategoryIcon = (name, size, color) => {
  let icon;

  switch (name) {
    case "Grocery":
      icon = <FontAwesome name="shopping-cart" size={size} color={color} />;
      break;
    case "Fuel":
      icon = (
        <MaterialIcons name="local-gas-station" size={size} color={color} />
      );
      break;
    case "Food & Drink":
      icon = <Ionicons name="restaurant" size={size} color={color} />;
      break;
    case "Clothes":
      icon = (
        <MaterialCommunityIcons name="tshirt-crew" size={size} color={color} />
      );
      break;
    case "Gifts":
      icon = <Ionicons name="ios-gift-sharp" size={size} color={color} />;
      break;
    case "Travel":
      icon = (
        <MaterialCommunityIcons name="airplane" size={size} color={color} />
      );
      break;
    case "Medicine":
      icon = <MaterialCommunityIcons name="pill" size={size} color={color} />;
      break;
    case "Bills":
      icon = <Ionicons name="md-newspaper-sharp" size={size} color={color} />;
      break;
    default:
      icon = null;
  }

  return icon;
};
