interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'danger' | 'ghost';
    isLoading?: boolean;
    }

    export const Button: React.FC<ButtonProps> = ({ 
    children, variant = 'primary', isLoading, className = '', ...props 
    }) => {
    const baseStyles = "px-6 py-2 text-sm font-medium transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2";
    
    const variants = {
        primary: "bg-black text-white hover:bg-stone-800 uppercase tracking-widest",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        danger: "text-red-500 hover:text-red-700 underline p-0",
        ghost: "text-gray-500 hover:text-black"
    };

    return (
        <button 
        className={`${baseStyles} ${variants[variant]} ${className}`} 
        disabled={isLoading || props.disabled}
        {...props}
        >
        {isLoading ? "Processing..." : children}
        </button>
    );
};