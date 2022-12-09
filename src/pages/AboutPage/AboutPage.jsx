import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function AboutPage({setLocation}) {
    const location = useLocation();
    
    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);

    return
}


export default AboutPage;