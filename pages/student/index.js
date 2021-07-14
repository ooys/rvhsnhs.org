import { useRouter } from "next/router";
import { useEffect } from "react";

function StudentRoute() {
    const router = useRouter();
    useEffect(() => {
        router.push("/student/findtutor");
    });
    return <>Routing to student findtutor...</>;
}

export default StudentRoute;
