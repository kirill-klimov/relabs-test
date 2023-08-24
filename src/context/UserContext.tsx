import { createContext, useState } from "react";

export interface IUserContext {
  user: boolean;
  setUser: Function;
}

export const UserContext = createContext<null | IUserContext>(null);

interface IProps {
  children: React.ReactNode;
}

export default function UserContextProvider(props: IProps) {

  const [user, setUser] = useState(false);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  );
}