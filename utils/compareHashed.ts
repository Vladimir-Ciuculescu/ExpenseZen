import Bcrypt from "react-native-bcrypt";

export const compareHashed = async (plainPassword: string, hash: string) => {
  return Bcrypt.compareSync(plainPassword, hash);
};
