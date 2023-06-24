import Bcrypt from "react-native-bcrypt";
import isaac from "isaac";

Bcrypt.setRandomFallback((len: any): any => {
  const buf = new Uint8Array(len);

  return buf.map(() => Math.floor(isaac.random() * 256));
});

export const hashPassword = async (password: string) => {
  const hashedPassword = Bcrypt.hashSync(password, Bcrypt.genSaltSync(10));

  return hashedPassword;
};
