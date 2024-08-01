import { useState, useEffect } from "react";

const usePersist = () => {
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    useEffect(() => {
        console.log('Setting persist to local storage:', persist);
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    useEffect(() => {
        console.log('Persist value retrieved from local storage:', persist);
    }, []);

    return [persist, setPersist];
};

export default usePersist;
