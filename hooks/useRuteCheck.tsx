" use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

function useRouteCheck(routeNames: String[]) {
    const pathname = usePathname();
    const [isRoute, setIsRoute] = useState(false);

    useEffect(() => {
        setIsRoute(routeNames.includes(pathname.split("/")[1]))
    }, [pathname, routeNames]);

    return isRoute;

}

export default useRouteCheck;