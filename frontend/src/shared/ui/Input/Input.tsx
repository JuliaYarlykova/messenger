import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

import cls from './Input.module.scss'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { mergeRefs } from '@/shared/lib/refs/MergeRefs'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size' | 'disabled' | 'label'
>

type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps {
  className?: string
  labelClassName?: string
  value?: string | number
  size?: InputSize
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  autofocus?: boolean
  readonly?: boolean
  disabled?: boolean
  label?: string
  addonLeft?: ReactNode
  addonRight?: ReactNode
  errorMessage?: string
  helperText?: string
  maskedInputRef?: React.RefCallback<HTMLElement>
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props) => {
  const {
    className,
    labelClassName,
    value,
    onChange,
    onBlur,
    onFocus,
    type = 'text',
    placeholder,
    autofocus,
    size = 'm',
    readonly,
    label,
    disabled,
    addonLeft,
    addonRight,
    errorMessage,
    helperText,
    maskedInputRef,
    ...otherProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true)
      inputRef.current?.focus()
    }
  }, [autofocus])

  const [localValue, setLocalValue] = useState<string | number>('')

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(event)
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(event)
  }

  const inputMods: Mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.isDirty]: Boolean(value),
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  }

  const wrapperMods: Mods = {
    [cls.disabled]: disabled,
    [cls.error]: Boolean(errorMessage),
  }

  const setValue = () => value ?? localValue

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setLocalValue(event.target.value)
    }
    onChange?.(event)
  }

  return (
    <div
      className={classNames(cls.wrapper, wrapperMods, [cls[size], className])}
    >
      {label && (
        <div className={classNames(cls.label, {}, [labelClassName])}>
          {label}
        </div>
      )}
      <div className={classNames(cls.InputWrapper, inputMods, [])}>
        {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
        <input
          ref={mergeRefs(inputRef, maskedInputRef)}
          type={type}
          value={setValue()}
          onChange={handleChange}
          className={classNames(cls.input, {}, [])}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          readOnly={readonly}
          disabled={disabled}
          aria-describedby="helper-text"
          {...otherProps}
        />
        {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
      </div>
      {(errorMessage || helperText) && (
        <div id="helper-text" className={cls.helperText}>
          {errorMessage ?? helperText}
        </div>
      )}
    </div>
  )
})
