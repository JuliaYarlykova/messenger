import cls from './PageError.module.scss'

export const PageError = () => {
	const reloadPage = () => {
		window.location.reload()
	}

	return (
		<main className={cls.ErrorPage}>
			{/* <Icon Svg={ErrorIcon} width={300} height={400} /> */}
			<div className={cls.info}>
				<p>Что-то пошло не так..</p>
				<button onClick={reloadPage}>Обновить страницу</button>
			</div>
		</main>
	)
}
