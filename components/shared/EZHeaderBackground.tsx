import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import COLORS from "../../colors";
import { RootState } from "../../redux/store";

const EZHeaderBackground: React.FC<any> = () => {
  const { theme } = useSelector((state: RootState) => state.user);

  return (
    <LinearGradient
      colors={theme === "light" ? [COLORS.PURPLE[900], COLORS.PURPLE[600]] : ["#111827", "#111827"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  );
};

export default EZHeaderBackground;
