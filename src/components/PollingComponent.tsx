import { useEffect } from 'react';

const PollingComponent = ({ loadFunc, children, refreshInterval = 120000 }: {loadFunc: () => void; children: JSX.Element; refreshInterval?: number}) => {

    useEffect(() => {
        const interval = setInterval(() => {
            loadFunc();
        }, refreshInterval);

        return () => {
            clearInterval(interval);
        };
    }, [loadFunc, refreshInterval]);

    return children;
};

export default PollingComponent;
