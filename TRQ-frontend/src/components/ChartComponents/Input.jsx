export function Input({ label, className='', ...props}) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm text-text-primary">{label}</label>
            )}
            <input 
                className={`bg-surface border rounded-md px-3 py-2
                    text-text-primary placeholder:text-text-secondary
                    outline-none transition-colors focus: ring-2
                    focus: ring-accent focus:border-accent disabled:opacity-50
                    theme-transition
                    disabled:cursor-not-allowed ${className}
                `}
                {...props}
            />
        </div>
    )
}