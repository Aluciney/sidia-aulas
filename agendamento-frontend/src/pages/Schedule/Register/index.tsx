import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { ShowSuccessRequest } from '../../../utils/ShowSuccessRequest';
import { ShowErrorRequest } from '../../../utils/ShowErrorRequest';
import { api } from '../../../services/api';

import { InputText } from '../../../components/InputText';
import { Button } from '../../../components/Button';

import { Form } from './styles';
import { SelectText } from '../../../components/SelectText';
import { addDays, format } from 'date-fns';

interface FormData {
	date: string;
	id_matter: string;
	id_teacher: string;
}

const schema = Yup.object().shape({
	date: Yup.string().required('Campo obrigatório'),
	id_matter: Yup.string().required('Campo obrigatório'),
	id_teacher: Yup.string().required('Campo obrigatório'),
});

export const Register: React.FC = () => {

	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: yupResolver(schema) });
	const [loading, setLoading] = useState(false);
	const [matters, setMatters] = useState<Matter[]>([]);
	const [teachers, setTeachers] = useState<MatherTeacherJoin[]>([]);

	useEffect(() => {
		async function getMattersData() {
			try {
				const { data } = await api.get('/matters');
				setMatters(data);
			} catch (error) {
			}
		}
		getMattersData();
	}, []);

	const getTeachersData = async (id_matter: number) => {
		try {
			const { data } = await api.get('/matters_teacher', { params: { id_matter: id_matter } });
			setTeachers(data);
		} catch (error) {
			setTeachers([]);
		}
	};

	const onSubmit = async (data: FormData) => {
		try {
			setLoading(true);
			const { data: dataResult } = await api.post('/schedules', data);
			ShowSuccessRequest(dataResult);
			navigate('/agendamentos');
		} catch (error) {
			ShowErrorRequest(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-xxl flex-grow-1 container-p-y">
			<h5 className="fw-bold pb-3">
				<Link to="/agendamentos" className="text-muted fw-light">Agendamentos /</Link> Cadastrar
			</h5>
			<div className="card mb-4">
				<h5 className="card-header">Cadastrar agendamento</h5>
				<div className="card-body">
					<Form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
						<div className="row">
							<div className="col-md-4 mb-2">
								<InputText
									id={'date'}
									label={'Data'}
									mask=""
									min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
									type="date"
									error={errors.date?.message}
									{...register('date', { disabled: loading })}
									required
								/>
							</div>
							<div className="col-md-4 mb-2">
								<SelectText
									id={'id_matter'}
									label={'Matéria'}
									data={matters.map(matter => ({ name: matter.name, value: matter.id.toString() }))}
									onChangeCapture={e => {
										//@ts-ignore
										getTeachersData(e.target.value);
										reset({ id_teacher: '' })
									}}
									error={errors.id_matter?.message}
									{...register('id_matter', { disabled: loading })}
									required
								/>
							</div>
							<div className="col-md-4 mb-2">
								<SelectText
									id={'id_teacher'}
									label={'Professor'}
									data={teachers.map(teacher => ({ name: teacher.name, value: teacher.id.toString() }))}
									onChangeCapture={e => {
										
									}}
									error={errors.id_teacher?.message}
									{...register('id_teacher', { disabled: loading })}
									required
								/>
							</div>
						</div>
						<div className="d-flex justify-content-start pt-4">
							<Button
								type="submit"
								className="btn-primary"
								loading={loading}
								style={{ minWidth: 200 }}
							>
								Cadastrar
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};