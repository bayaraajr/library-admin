"use client";
import useSession from "@library/hooks/useSession";
import React, { FC } from "react";

const Navbar: FC<any> = (props) => {
    const { user } = useSession();
    return <div>Hello {user.firstname}</div>;
};

export default Navbar;
