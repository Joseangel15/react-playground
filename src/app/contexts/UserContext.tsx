"use client";

import { createContext, useState, useCallback, useMemo } from "react";

type UserInfo = {
  name: string;
  age: number;
  dob: string;
  nationality: string;
  gender: string;
};

type handleChangeForm = (updatedUserInfo: Partial<UserInfo>) => void;

type UserContextType = {
  userInfo: UserInfo;
  handleChangeForm: handleChangeForm;
};

const initialUserInfo: UserInfo = {
  name: "Jose A Ortiz",
  age: 38,
  dob: "1987-06-15",
  nationality: "USA",
  gender: "male",
};

const defaultContextValue: UserContextType = {
  userInfo: initialUserInfo,
  handleChangeForm: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

  const handleChangeForm = useCallback<handleChangeForm>((updatedUserInfo) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ...updatedUserInfo,
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      userInfo,
      handleChangeForm,
    }),
    [userInfo, handleChangeForm]
  );

  return <UserContext value={contextValue}>{children}</UserContext>;
}
