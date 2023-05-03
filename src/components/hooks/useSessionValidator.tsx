import {useSessionStore} from "@/components/store/session";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {checkSession} from "@/utils/accessServices";

export default function useSessionValidator() {
  const {user, logOut} = useSessionStore();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      checkSession(user.refreshToken)
        .then(() => {
          return
        })
        .catch((e) => {
          if (e.response.status === 401) {
            logOut();
            router.push("/");
          }
        });
    }
  }, [router, user]);
}
