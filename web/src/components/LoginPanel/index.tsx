

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MODE } from '../../utils/enums';
import './style.css';
import { login, register as reg } from '../../api/loginApi';
import { withRouter } from 'react-router';


export default withRouter((props: any) => {

	const { history } = props;

	const { register, handleSubmit, formState: { errors } } = useForm();

	const [mode, setMode] = useState<number>(MODE.LOGIN)

	const onSubmit = (data: any) => {

		if (mode === MODE.LOGIN) {
			_login(data)
			return;
		}
		_register(data)

	}

	const _login = (data: any) => {
		login(data).then(res => {
			if (res.sucess) {
				localStorage.setItem("name", data.name)
				history.push("/info")
			}
		})
	}

	const _register = (data: any) => {
		reg(data).then((res: any) => {
			if (res.success) {
				localStorage.setItem("name", data.name)
				history.push("/info")
			}
		})
	}

	return (
		<div className="panel">
			<form
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

				{
					mode === MODE.REGISTER ?
						<>
							<div className="form-item">
								<div className="label">
									密码
								</div>
								<div>
									<input {...register("password", { required: true })} />
									{errors.exampleRequired && <span>This field is required</span>}
								</div>
							</div>
							<div className="form-item">
								<div className="label">
									重复密码
								</div>
								<div>
									<input {...register("repassword", { required: true })} />
									{errors.exampleRequired && <span>This field is required</span>}
								</div>
							</div>
						</> : null
				}

				<div className="form-item">
					<div className="label" />
					<div>
						<button type="submit">
							{mode === MODE.LOGIN ? "登录" : "注册"}
						</button>
					</div>
				</div>
			</form>
			<div className="footer">
				{
					mode === MODE.LOGIN ?
						<span className="option" onClick={() => { setMode(MODE.REGISTER) }}>注册</span>
						:
						<span className="option" onClick={() => { setMode(MODE.LOGIN) }}>登录</span>
				}
			</div>
		</div >
	)
})