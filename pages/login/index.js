import { useRouter } from "next/router";
import { useEffect } from "react";

function LoginRoute() {
    const router = useRouter();
    useEffect(() => {
        router.push("/login/member");
    });
    return <>Routing to member login...</>;
}

export default LoginRoute;
