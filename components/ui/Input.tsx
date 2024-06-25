
const Input = ({
    name,
    type,
    placeholder,
    value,
    disabled,
    required,
    fullWidth
}: {
    name: string,
    type: string,
    placeholder?: string,
    value?: string,
    disabled?: boolean,
    required?: boolean,
    fullWidth?: boolean
}) => {
    return (
        <div className="w-full">
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                required={required}
                className={`h-20 bg-transparent border-b text-3xl w-4/5 self-center focus:outline-none ${disabled && "opacity-50 cursor-default"} ${fullWidth && "w-full"}`} />
        </div>
    )
}

export default Input