

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MODE } from '../../utils/enums';
import './style.css';


export default (props: any) => {


	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = (data: any) => console.log(data);

	const [mode, setMode] = useState<number>(MODE.LOGIN)

	const changeMode = (mode: number) => {
		setMode(mode)
	}

	return (
		<div>	<form
			className="form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="form-item">
				<div className="label">
					名称
				</div>
				<div>
					<input defaultValue="test" {...register("name", { required: true })} />
				</div>
			</div>

			<div className="form-item">
				<div className="label">
					密码
				</div>
				<div>
					<input {...register("password", { required: true })} />
					{errors.exampleRequired && <span>This field is required</span>}
				</div>
			</div>
			{
				mode === MODE.REGISTER ?
					<div className="form-item">
						<div className="label">
							重复密码
						</div>
						<div>
							<input {...register("repassword", { required: true })} />
							{errors.exampleRequired && <span>This field is required</span>}
						</div>
					</div> : null
			}
			<input type="submit" />
		</form>
			<div>
				<span onClick={() => { setMode(MODE.REGISTER) }}>注册</span>
				<span onClick={() => { setMode(MODE.LOGIN) }}>登录</span>
			</div>
		</div >
	)
}