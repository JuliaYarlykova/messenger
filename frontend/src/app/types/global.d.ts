declare const __IS_DEV__: boolean
declare const __API__: string
declare const __SOCKETURL__: string

declare module '*.scss' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
  import type React from 'react'

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  // @ts-ignore
  export default SVG
}
/// <reference types="vite/client" />

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
