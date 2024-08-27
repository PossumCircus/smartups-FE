import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <>
            <h2>부적절한 접근 입니다. 잠시 후 홈 페이지로 이동합니다.</h2>
        </>
    );
}

export default NotFoundPage;
