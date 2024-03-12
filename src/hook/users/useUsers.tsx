import { User, onAuthStateChanged } from "firebase/auth";
import { AuthService } from "../../fbase/fbase";
import { useEffect, useState } from "react";

export const useUsers = () => {
  const [userObj, setUserObj] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(AuthService, (user) => {
      if (user) {
        setUserObj(user);
      }
    });
  }, []);

  return {
    userObj,
  };
};
