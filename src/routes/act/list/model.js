/**
 * Created by Administrator on 2/25.
 */

import React from 'react'
import {ListItem} from 'material-ui/List';

export const box = data => (
	<div>

	</div>
)

export const list = ({i, images:{medium}, id}) => (
	<div>
		<div>{i}</div>
		<main>
			<div>
				<img src={medium}/>
			</div>
		</main>
	</div>
)
