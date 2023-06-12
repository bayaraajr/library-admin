"use client";
import SessionContext from "@library/context/SessionContext";
import { useContext } from "react";

export default function useSession() {
    const context: any = useContext(SessionContext);
    return context;
}
