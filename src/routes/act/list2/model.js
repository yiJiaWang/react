/**
 * Created by Administrator on 2/25.
 */

import React from 'react'
import './model.scss'

export const box = data => (
	<div>

	</div>
)

export const list = ({i, images:{medium}, id, title, original_title}) => (
	<div>
		<main>
			<div styleName="listModel">
				<img role="presentation" src={medium}/>
				<div styleName="info">
					<div styleName="largeTitle">{title}</div>
					<div styleName="smallTitel">{original_title}</div>
				</div>
			</div>
		</main>
	</div>
)
