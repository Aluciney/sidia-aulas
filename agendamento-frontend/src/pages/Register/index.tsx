import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';

import { ShowErrorRequest } from '../../utils/ShowErrorRequest';
import { ShowSuccessRequest } from '../../utils/ShowSuccessRequest';

import { InputText } from '../../components/InputText';

import { Form } from './styles';
import Logo from '../../components/Logo';
import { Button } from '../../components/Button';
import { api } from '../../services/api';

interface FormData {
	name: string;
	email: string;
	password: string;
	confirm_password: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required('Campo obrigatório'),
	email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
	password: Yup.string().required('Campo obrigatório').min(8, 'No mínimo 8 caracteres'),
	confirm_password: Yup.string().when('password', (password, schema_) => {
		return schema_.test({
			test: (value: string) => password === value,
			message: 'Senhas não correspondem'
		})
	}),
});

export const Register: React.FC = () => {

	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });
	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			setLoading(true);
			const result = await api.post(`/authentication/register`, {
				name: data.name,
				email: data.email,
				password: data.password,
			});					
			ShowSuccessRequest(result);
			navigate('/');
		} catch (error) {			
			ShowErrorRequest(error);
			setLoading(false);
		}
	};

	return (
		<div className="container-xxl">
			<div className="authentication-wrapper authentication-basic container-p-y">
				<div className="authentication-inner">
					<div className="card">
						<div className="card-body">
							<div className="app-brand justify-content-center">
								<Link to="/" className="app-brand-link">
									<span className="app-brand-logo demo">
										<Logo />
									</span>
								</Link>
							</div>
							<h4 className="mb-2 text-center">O aprendizado começa aqui 🚀</h4>
							<p className="mb-4 text-center">Organizar nunca foi tão fácil e divertido!</p>
							<Form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-3">
									<InputText
										id={'name'}
										label={'Nome'}
										mask=""
										error={errors.name?.message}
										{...register('name', { disabled: loading })}
										required
									/>
								</div>
								<div className="mb-3">
									<InputText
										id={'email'}
										label={'E-mail'}
										mask=""
										error={errors.email?.message}
										{...register('email', { disabled: loading })}
										required
									/>
								</div>
								<div className="mb-3 form-password-toggle">
									<InputText
										id={'password'}
										label={'Senha'}
										mask=""
										passwordView
										maxLength={16}
										error={errors.password?.message}
										{...register('password', { disabled: loading })}
										containerStyle={{ marginTop: 10 }}
										autoComplete="current-password"
										required
									/>
								</div>
								<div className="mb-3 form-password-toggle">
									<InputText
										id={'confirm_password'}
										label={'Confirmar Senha'}
										mask=""
										passwordView
										maxLength={16}
										error={errors.confirm_password?.message}
										{...register('confirm_password', { disabled: loading })}
										containerStyle={{ marginTop: 10 }}
										autoComplete="current-password"
										required
									/>
								</div>
								<div className="mb-3">
									<Button
										type="submit"
										className="btn-primary d-grid w-100"
										loading={loading}
									>
										Registrar
									</Button>
								</div>
							</Form>
							<p className="text-center">
								<span>Já tem uma conta?</span>
								<Link to="/">
									<span> Faça login em vez disso</span>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};