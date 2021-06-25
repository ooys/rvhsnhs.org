import { useRouter } from "next/router";

function LoginRoute() {
    const router = useRouter();
    router.push("/login/member");
    return <>Routing to member login...</>;
}

export default LoginRoute;
