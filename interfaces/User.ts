import { Provider } from "./Provider";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword?: string;
  provider: Provider;
  currency?: string;
}
