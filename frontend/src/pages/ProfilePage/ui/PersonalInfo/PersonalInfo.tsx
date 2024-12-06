import { InfoLine } from '@/entities/Profile'

import cls from './PersonalInfo.module.scss'

interface PersonalInfo {
  birthday?: string
  about?: string
}

export const PersonalInfo = (props: PersonalInfo) => {
  const { birthday, about } = props
  return (
    <section className={cls.section}>
      <InfoLine
        icon={
          <span className="material-symbols-outlined">
            featured_seasonal_and_gifts
          </span>
        }
        info={birthday}
      />
      <InfoLine
        icon={<span className="material-symbols-outlined">home</span>}
        info={about}
      />
    </section>
  )
}
