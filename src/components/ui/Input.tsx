interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-xs font-semibold text-gray-600 uppercase">{label}</label>}
        <input 
            className={`border border-gray-300 rounded p-2 outline-none focus:border-black transition-colors ${className}`}
            {...props}
        />
        </div>
    );
};