import React, { memo } from 'react'

import { classNames } from '../../lib/classNames/classNames'

import cls from './Icon.module.scss'

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick' | 'tabIndex'>

interface IconBaseProps extends SvgProps {
  className?: string
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false
}

interface ClickableBaseProps extends IconBaseProps {
  clickable: true
  onClick: () => void
  tabIndex?: number
  buttonWidth?: number
  buttonHeight?: number
}

type IconProps = NonClickableIconProps | ClickableBaseProps

export const Icon = memo((props: IconProps) => {
  const { className, Svg, width = 32, height = 32, clickable } = props

  const icon = (
    <Svg
      className={classNames(cls.Icon, {}, [className])}
      width={width}
      height={height}
    />
  )

  if (clickable) {
    return (
      <button
        type="button"
        className={cls.button}
        onClick={props.onClick}
        style={{
          width: `${props.buttonWidth || width}px`,
          height: `${props.buttonHeight || height}px`,
        }}
        tabIndex={props.tabIndex}
      >
        {icon}
      </button>
    )
  }

  return icon
})
