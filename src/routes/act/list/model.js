/**
 * Created by Administrator on 2/25.
 */

import React from 'react'
import style from './model.scss'

export const box = data => (
	<div>

	</div>
)

export const list = ({i, images:{medium}, id, title, original_title}) => (
	<div>
		<main>
			<div className={style.listModel}>
				<img role="presentation" src={medium}/>
				<div className={style.info}>
					<div className={style.largeTitle}>{title}</div>
					<div className={style.smallTitel}>{original_title}</div>
				</div>
			</div>
		</main>
	</div>
)
