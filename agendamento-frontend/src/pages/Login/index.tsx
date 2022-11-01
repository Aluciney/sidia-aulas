import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';

import { ShowErrorRequest } from '../../utils/ShowErrorRequest';

import { InputText } from '../../components/InputText';

import { Form } from './styles';
import Logo from '../../components/Logo';
import { useAuth } from '../../contexts/auth';
import { Button } from '../../components/Button';

interface FormData {
	email: string;
	password: string;
}

const schema = Yup.object().shape({
	email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
	password: Yup.string().required('Campo obrigatório'),
});

export const Login: React.FC = () => {
	const { signIn } = useAuth();
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });
	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			setLoading(true);
			await signIn(data.email, data.password);
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
							<h4 className="mb-2 text-center">Bem vindo a Sidia! 👋</h4>
							<p className="mb-4 text-center">Faça login com sua e-mail e senha</p>
							<Form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
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
								<div className="mb-3">
									<Button 
										type="submit"
										className="btn-primary d-grid w-100"
										loading={loading}
									>
										Entrar
									</Button>
								</div>
							</Form>
							<p className="text-center">
								<span>Não possui uma conta?</span>
								<Link to="/autenticacao/registrar">
									<span> Crie uma aqui</span>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};