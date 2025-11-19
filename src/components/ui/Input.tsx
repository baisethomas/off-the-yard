import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 bg-charcoal text-bone border ${
          error ? 'border-red-500' : 'border-bootprint'
        } rounded focus:outline-none focus:border-gold transition ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

