/**
 * @author Yong93}
 * @time 2017/3/6.
 */
import React from 'react';
import {render} from 'react-dom';
import { FormControl } from 'rctui'
render(
	<FormControl required grid={{width: 1 / 4}} type="text" min={2} max={10} />
,document.getElementById('root'));