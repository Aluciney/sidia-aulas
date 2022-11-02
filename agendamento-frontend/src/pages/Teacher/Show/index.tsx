import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BiPlus, BiTrash } from 'react-icons/bi';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { ShowErrorRequest } from '../../../utils/ShowErrorRequest';
import { api } from '../../../services/api';

import LoadingIcon from '../../../components/LoadingIcon';
import { ShowSuccessRequest } from '../../../utils/ShowSuccessRequest';
import { InputText } from '../../../components/InputText';
import { Button } from '../../../components/Button';
import { SelectText } from '../../../components/SelectText';

interface FormData {
	id_matter: string;
}

const schema = Yup.object().shape({
	id_matter: Yup.string().required('Campo obrigatório'),
});

const customStyles = {
	content: {
		margin: 'auto',
		maxHeight: 'max-content',
		maxWidth: 500,
		alignSelf: 'center',
		borderRadius: 8,
		boxShadow: 'rgb(0 0 0 / 30%) 0px 0px 30px',
		backgroundColor: '#FFF',
	},
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		zIndex: 2000,
	}
};

ReactModal.setAppElement('#root');

export const Show: React.FC = () => {

	const { ID } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [loadingMatters, setLoadingMatters] = useState(false);
	const [loadingAdd, setLoadingAdd] = useState(false);
	const [loadingRemove, setLoadingRemove] = useState(false);
	const [teacher, setTeacher] = useState<MatterTeacherJoin>();
	const [mattersTeacher, setMattersTeacher] = useState<MatterTeacherJoin[]>([]);
	const [matters, setMatters] = useState<Matter[]>([]);
	const [addMatterShow, setAddMatterShow] = useState(false);
	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: yupResolver(schema) });

	useEffect(() => {
		getData(ID);
		getDataMattersTeacher(ID);
		getMattersData();
	}, [ID]);

	async function getData(id: any) {
		try {
			setLoading(true);
			const { data } = await api.get(`/teachers/${id}`)
			setTeacher(data);
			setLoading(false);
		} catch (error) {
			ShowErrorRequest(error);
			navigate('/professores');
		}
	}

	async function getDataMattersTeacher(id: any) {
		try {
			setLoadingMatters(true);
			const { data } = await api.get('/matters_teacher', { params: { id_teacher: id } })
			setMattersTeacher(data);
		} catch (error) {
			ShowErrorRequest(error);
		} finally {
			setLoadingMatters(false);
		}
	}

	async function getMattersData() {
		try {
			const { data } = await api.get('/matters');
			setMatters(data);
		} catch (error) {
		}
	}

	const columns: TableColumn<MatterTeacherJoin>[] = [
		{
			name: '#',
			minWidth: '80px',
			maxWidth: '80px',
			cell: (row) => row.id,
		},
		{
			name: 'NOME',
			cell: (row) => row.name,
		},
		{
			name: 'DELETAR',
			center: true,
			minWidth: '100px',
			maxWidth: '100px',
			cell: (row) => (
				<button type="button" onClick={() => deleteMatterTeacher(row)} title="Deletar" className="btn rounded-pill btn-icon btn-outline-danger btn-sm">
					<BiTrash />
				</button>
			),
		},
	];

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			setLoadingAdd(true);
			const { data: dataResult } = await api.post('/matters_teacher', {
				id_matter: data.id_matter,
				id_teacher: ID
			});
			ShowSuccessRequest(dataResult);
			getDataMattersTeacher(ID);
		} catch (error) {
			ShowErrorRequest(error);
		} finally {
			setLoadingAdd(false);
			setAddMatterShow(false);
			reset();
		}
	};

	async function deleteMatterTeacher(matterTeacher: MatterTeacherJoin) {
		const { isConfirmed, value } = await Swal.fire({
			title: 'Deletar Matéria',
			text: 'Tem certeza que deseja deletar?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'var(--bs-primary)',
			cancelButtonColor: 'var(--bs-danger)',
			confirmButtonText: 'Sim',
			cancelButtonText: 'Não',
			preConfirm: async () => {
				Swal.showLoading();
				try {
					const { data } = await api.delete(`/matters_teacher/${matterTeacher.id}`);
					return data;
				} catch (error) {
					return false;
				}
			}
		});
		if (isConfirmed && value) {
			Swal.fire({
				title: 'Deletar Matéria',
				text: value.message,
				icon: 'success',
				confirmButtonColor: 'var(--bs-success)',
			}).then(() => {
				var newMattersTeachers = mattersTeacher.filter(matterTeacher_ => matterTeacher_.id !== matterTeacher.id);
				setMattersTeacher(newMattersTeachers);
			});
		} else if (isConfirmed) {
			Swal.fire({
				title: 'Deletar Professor(a)',
				text: 'Erro ao deletar professor(a)',
				icon: 'error',
				confirmButtonColor: 'var(--success-color)',
			});
		}
	}

	return (
		<div className="container-xxl flex-grow-1 container-p-y">
			<h5 className="fw-bold pb-3">
				<Link to="/professores" className="text-muted fw-light">Professores /</Link> {loading ? <LoadingIcon /> : teacher?.name}
			</h5>
			<div className="card mb-4">
				<h5 className="card-header">Informações</h5>
				<div className="card-body pb-0">
					<div className="row">
						<div className="mb-3 col-md-4">
							<label className="form-label">NOME</label>
							<input
								className="form-control"
								type="text"
								defaultValue={teacher?.name}
								readOnly
							/>
						</div>
						<div className="mb-3 col-md-8">
							<label className="form-label">E-MAIL</label>
							<input
								className="form-control"
								type="text"
								defaultValue={teacher?.email}
								readOnly
							/>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-between">
					<h5 className="card-header">Matérias</h5>
					<div className="d-flex justify-content-center align-items-center p-4">
						<button type="button" className="btn btn-primary" onClick={() => setAddMatterShow(true)}>
							<BiPlus size={20} style={{ marginRight: 5 }} />
							Cadastrar
						</button>
					</div>
				</div>
				<div className="card-body pt-0">
					<div className="table-responsive text-nowrap pt-0">
						<DataTable<MatterTeacherJoin>
							columns={columns}
							data={mattersTeacher}
							responsive
							pagination
							striped
							highlightOnHover
							progressPending={loading}
							progressComponent={<LoadingIcon size={40} style={{ margin: 40 }} />}
							noHeader={true}
							noDataComponent={<span style={{ margin: 40 }}>Nenhum registro foi encontrado</span>}
							paginationComponentOptions={{
								rowsPerPageText: 'Linhas por página',
								rangeSeparatorText: 'de'
							}}
						/>
					</div>
				</div>
			</div>
			<ReactModal
				isOpen={addMatterShow}
				onRequestClose={() => !loadingAdd && setAddMatterShow(false)}
				style={customStyles}
			>
				<div className="p-0">
					<h5 className="card-header pt-1 text-center">Cadastrar</h5>
					<hr className="m-0 mb-4" />
					<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
						<div className="mb-3">
							<SelectText
								id={'id_matter'}
								label={'Matéria'}
								data={matters.map(matter => ({ name: matter.name, value: matter.id.toString() }))}
								error={errors.id_matter?.message}
								{...register('id_matter', { disabled: loading })}
								required
							/>
						</div>
						<hr className="m-0" />
						<div className="d-flex justify-content-center">
							<Button type="submit" className="btn-primary d-grid w-50" loading={loadingAdd}>
								Salvar
							</Button>
						</div>
					</form>
				</div>
			</ReactModal>
		</div >
	);
};