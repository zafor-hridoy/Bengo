import React from "react";

const BengoLogo = ({ className = "size-32", showText = true }) => {
    return (
        <div className="flex flex-col items-center animate-fade-in">
            <div className={`relative group ${className}`}>

                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                <svg
                    viewBox="0 0 200 200"
                    className="relative size-full text-white"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >

                    <path
                        d="M100 40C66.8629 40 40 66.8629 40 100C40 115.174 45.6366 129.031 54.9575 139.6L45 165L70.4 155.042C79.317 158.219 89.4517 160 100 160C133.137 160 160 133.137 160 100C160 66.8629 133.137 40 100 40Z"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />


                    <line
                        x1="75"
                        y1="85"
                        x2="120"
                        y2="105"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />


                    <circle cx="75" cy="85" r="8" fill="currentColor" />


                    <circle cx="120" cy="105" r="14" fill="currentColor" />


                    <circle cx="120" cy="105" r="5" fill="rgba(255,255,255,0.3)" />
                </svg>
            </div>

            {showText && (
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white font-sans drop-shadow-md">
                    Bengo<span className="text-blue-500">.</span>
                </h1>
            )}
        </div>
    );
};

export default BengoLogo;
