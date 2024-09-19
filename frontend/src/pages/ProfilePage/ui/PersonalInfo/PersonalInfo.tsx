import { InfoLine } from '@/entities/Profile'

import cls from './PersonalInfo.module.scss'

interface PersonalInfo {
  birthday?: string
  city?: string
  aducation?: string
}

export const PersonalInfo = (props: PersonalInfo) => {
  const { birthday, city, aducation } = props
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
        info={city}
      />
      <InfoLine
        icon={<span className="material-symbols-outlined">school</span>}
        info={aducation}
      />
    </section>
  )
}
