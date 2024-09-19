import { Loader } from '@/shared/ui'

import cls from './PageLoader.module.scss'

export const PageLoader = () => (
	<div className={cls.PageLoader}>
		<Loader />
	</div>
)
