import { ScaleLoader } from "react-spinners";

interface LoadingSpinnerProps {
    message?: string;
    height?: number;
}

const LoadingSpinner = ({ message = "Loading...", height = 35 }: LoadingSpinnerProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
        {/* ScaleLoader looks like moving strings or audio bars */}
        <ScaleLoader 
            color="#4f46e5" 
            height={height} 
            width={4} 
            radius={2} 
            margin={2} 
        />
        {message && (
            <p className="mt-6 text-stone-500 font-medium tracking-wide animate-pulse">
            {message}
            </p>
        )}
        </div>
    );
};

export default LoadingSpinner;