export function Input({ label, error, className='', ...props}) {
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
                    disabled:cursor-not-allowed 
                    ${error ? 'border-danger' : 'border-border'} ${className}
                `}
                {...props}
            />
            {error && (
                <span className="text-sm text-danger">{error}</span>
            )}
        </div>
    )
}