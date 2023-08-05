import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../colors";

const EZHeaderBackground: React.FC<any> = () => {
  return (
    <LinearGradient
      colors={[COLORS.PURPLE[900], COLORS.PURPLE[600]]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  );
};

export default EZHeaderBackground;
