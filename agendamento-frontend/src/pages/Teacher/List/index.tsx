import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BiPlus, BiTrash, BiShow } from 'react-icons/bi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { ShowErrorRequest } from '../../../utils/ShowErrorRequest';
import { api } from '../../../services/api';

import LoadingIcon from '../../../components/LoadingIcon';
import { ShowSuccessRequest } from '../../../utils/ShowSuccessRequest';
import { SelectText } from '../../../components/SelectText';
import { Button } from '../../../components/Button';

interface FormData {
	id_user: string;
}

const schema = Yup.object().shape({
	id_user: Yup.string().required('Campo obrigatório'),
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

export const List: React.FC = () => {

	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [teachers, setTeachers] = useState<MatterTeacherJoin[]>([]);
	const [users, setUsers] = useState<MatterTeacherJoin[]>([]);
	const [max, setMax] = useState(0);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [loadingAdd, setLoadingAdd] = useState(false);
	const [addTeacherShow, setAddTeacherShow] = useState(false);
	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: yupResolver(schema) });

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
			name: 'E-MAIL',
			cell: (row) => row.email,
		},
		{
			name: 'DELETAR',
			center: true,
			minWidth: '100px',
			maxWidth: '100px',
			cell: (row) => (
				<button type="button" onClick={() => deleteUser(row)} title="Deletar" className="btn rounded-pill btn-icon btn-outline-danger btn-sm">
					<BiTrash />
				</button>
			),
		},
	];

	useEffect(() => {
		initialLoading();
	}, [page, perPage]);

	async function initialLoading() {
		try {
			const { data } = await api.get('/teachers', { params: { currentPage: page, perPage } });
			setTeachers(data.data);
			setMax(data.pagination.total);
		} catch (error) {
			ShowErrorRequest(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		async function getUsers() {
			try {
				const { data } = await api.get('/users/no_teacher');
				setUsers(data);
			} catch (error) {

			}
		}
		getUsers();
	}, []);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			setLoadingAdd(true);
			const { data: dataResult } = await api.post('/teachers', {
				id_user: data.id_user
			});
			ShowSuccessRequest(dataResult);
			initialLoading();
		} catch (error) {
			ShowErrorRequest(error);
		} finally {
			setLoadingAdd(false);
			setAddTeacherShow(false);
			reset();
		}
	};

	async function deleteUser(teacher: MatterTeacherJoin) {
		const { isConfirmed, value } = await Swal.fire({
			title: 'Deletar Professor(a)',
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
					const { data } = await api.delete(`/teachers/${teacher.id}`);
					return data;
				} catch (error) {
					return false;
				}
			}
		});
		if (isConfirmed && value) {
			Swal.fire({
				title: 'Deletar Professor(a)',
				text: value.message,
				icon: 'success',
				confirmButtonColor: 'var(--bs-success)',
			}).then(() => {
				var newTeachers = teachers.filter(teacher_ => teacher_.id !== teacher.id);
				setTeachers(newTeachers);
				setMax(max => max - 1);
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
			<h5 className="fw-bold pb-3">Professores</h5>
			<div className="card mb-4">
				<div className="d-flex justify-content-between">
					<h5 className="card-header">Listagem de professores</h5>
					<div className="d-flex justify-content-center align-items-center p-4">
						<button type="button" className="btn btn-primary" onClick={() => setAddTeacherShow(true)}>
							<BiPlus size={20} style={{ marginRight: 5 }} />
							Cadastrar
						</button>
					</div>
				</div>

				<div className="table-responsive text-nowrap p-4 pt-0">
					<DataTable<MatterTeacherJoin>
						columns={columns}
						data={teachers}
						responsive
						pagination
						paginationServer
						paginationTotalRows={max}
						paginationDefaultPage={page}
						onChangePage={setPage}
						onChangeRowsPerPage={setPerPage}
						striped
						highlightOnHover
						pointerOnHover
						onRowClicked={row => navigate(`/professores/${row.id}`)}
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
			<ReactModal
				isOpen={addTeacherShow}
				onRequestClose={() => !loadingAdd && setAddTeacherShow(false)}
				style={customStyles}
			>
				<div className="p-0">
					<h5 className="card-header pt-1 text-center">Cadastrar</h5>
					<hr className="m-0 mb-4" />
					<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
						<div className="mb-3">
							<SelectText
								id={'id_user'}
								label={'Professor(a)'}
								data={users.map(user_ => ({ name: user_.name, value: user_.id.toString() }))}
								error={errors.id_user?.message}
								{...register('id_user', { disabled: loadingAdd })}
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
		</div>
	);
};