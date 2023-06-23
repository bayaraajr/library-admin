"use client";
import { useRouter } from "next/navigation";
import { FC, createContext, useEffect, useState } from "react";

const SessionContext: any = createContext({});

export const SessionProvider: FC<any> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        if (!Boolean(user.firstname)) {
            let tmp = localStorage.getItem("data");
            // if (tmp) setUser(JSON.parse(tmp));
            // else router.push("/login");
        } else {
            console.log("");
        }
        //eslint-disable-next-line
    }, [user]);
    return <SessionContext.Provider value={{ user, setUser }}>{children}</SessionContext.Provider>;
};

export default SessionContext;
