import { Text } from "native-base";

interface Props {
  children: string;
}

const EZHeaderTitle: React.FC<Props> = ({ children }) => {
  return (
    <Text color="muted.50" fontFamily="SourceBold" fontSize={20}>
      {children}
    </Text>
  );
};

export default EZHeaderTitle;
