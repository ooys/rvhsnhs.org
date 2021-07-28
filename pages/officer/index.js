import { useRouter } from "next/router";
import { useEffect } from "react";

function OfficerRoute() {
    const router = useRouter();
    useEffect(() => {
        router.push("/officer/admingroup");
    });
    return <>Routing to officer dashboard...</>;
}

export default OfficerRoute;
