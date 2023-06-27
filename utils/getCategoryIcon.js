import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import COLORS from "../colors";

export const getCategoryIcon = (name) => {
  let icon;

  switch (name) {
    case "Grocery":
      icon = (
        <FontAwesome name="shopping-cart" size={24} color={COLORS.MUTED[50]} />
      );
      break;
    case "Fuel":
      icon = (
        <MaterialIcons
          name="local-gas-station"
          size={24}
          color={COLORS.MUTED[50]}
        />
      );
      break;
    case "Food & Drink":
      icon = <Ionicons name="restaurant" size={24} color={COLORS.MUTED[50]} />;
      break;
    case "Clothes":
      icon = (
        <MaterialCommunityIcons
          name="tshirt-crew"
          size={24}
          color={COLORS.MUTED[50]}
        />
      );
      break;
    case "Gifts":
      icon = (
        <Ionicons name="ios-gift-sharp" size={24} color={COLORS.MUTED[50]} />
      );
      break;
    case "Travel":
      icon = (
        <MaterialCommunityIcons
          name="airplane"
          size={24}
          color={COLORS.MUTED[50]}
        />
      );
      break;
    case "Medicine":
      icon = (
        <MaterialCommunityIcons
          name="pill"
          size={24}
          color={COLORS.MUTED[50]}
        />
      );
      break;
    case "Bills":
      icon = (
        <Ionicons
          name="md-newspaper-sharp"
          size={24}
          color={COLORS.MUTED[50]}
        />
      );
      break;
    default:
      icon = null;
  }

  return icon;
};
