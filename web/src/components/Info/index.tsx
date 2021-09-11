
import { useState } from 'react'
import { updateInfo } from '../../api/loginApi'
import { MODE } from '../../utils/enums'
import './style.css'

export default () => {

	const _name: any = localStorage.getItem("name")
	const [name, setName] = useState<string>(_name)
	const [mode, setMode] = useState(MODE.VIEW)

	const onUpdate = () => {
		updateInfo({ name }).then(res => {
			localStorage.setItem("name", name)
			if (res.success) {
				setMode(MODE.VIEW)
			}
		}).catch(err => {
			alert(err)
		})
	}

	return <div className="info">
		{
			mode === MODE.VIEW ?
				<div>
					<h3>{name}</h3>
					<button onClick={() => { setMode(MODE.EDIT) }}>edit</button>
				</div>
				:
				<div>
					<input value={name} onInput={(e: any) => {
						setName(e.target.value)
					}} />
					<button onClick={() => { onUpdate() }}>finish edit</button>
				</div>
		}
	</div>
}