import { Text } from "native-base";

interface Props {
  children: string;
}

const EZHeaderTitle: React.FC<Props> = ({ children }) => {
  return (
    <Text
      fontFamily="SourceBold"
      _light={{ color: "muted.50" }}
      _dark={{ color: "muted.900" }}
      fontSize={20}>
      {children}
    </Text>
  );
};

export default EZHeaderTitle;
