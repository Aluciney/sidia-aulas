import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BiPlus, BiTrash, BiShow } from 'react-icons/bi';
import ReactModal from 'react-modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { Button } from '../../../components/Button';
import { InputText } from '../../../components/InputText';
import LoadingIcon from '../../../components/LoadingIcon';
import { api } from '../../../services/api';
import { ShowErrorRequest } from '../../../utils/ShowErrorRequest';
import { ShowSuccessRequest } from '../../../utils/ShowSuccessRequest';

interface FormData {
	name: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required('Campo obrigatório'),
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

	const [loading, setLoading] = useState(true);
	const [matters, setMatters] = useState<Matter[]>([]);
	const [addMatterShow, setAddMatterShow] = useState(false);
	const [loadingAdd, setLoadingAdd] = useState(false);
	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: yupResolver(schema) });

	const columns: TableColumn<Matter>[] = [
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
				<button type="button" onClick={() => deleteMatter(row)} title="Deletar" className="btn rounded-pill btn-icon btn-outline-danger btn-sm">
					<BiTrash />
				</button>
			),
		},
	];

	useEffect(() => {
		initialLoading();
	}, []);

	async function initialLoading() {
		try {
			const { data } = await api.get('/matters');
			setMatters(data);
		} catch (error) {
			ShowErrorRequest(error);
		} finally {
			setLoading(false);
		}
	}

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			setLoadingAdd(true);
			const { data: dataResult } = await api.post('/matters', data);
			ShowSuccessRequest(dataResult);
			initialLoading();
		} catch (error) {
			ShowErrorRequest(error);
		} finally {
			setLoadingAdd(false);
			setAddMatterShow(false);
			reset();
		}
	};

	async function deleteMatter(matter: Matter) {
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
					const { data } = await api.delete(`/matters/${matter.id}`);
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
				var newMatters = matters.filter(matter_ => matter_.id !== matter.id);
				setMatters(newMatters);
			});
		} else if (isConfirmed) {
			Swal.fire({
				title: 'Deletar Matéria',
				text: 'Erro ao deletar matéria',
				icon: 'error',
				confirmButtonColor: 'var(--success-color)',
			});
		}
	}

	return (
		<div className="container-xxl flex-grow-1 container-p-y">
			<h5 className="fw-bold pb-3">Matérias</h5>
			<div className="card mb-4">
				<div className="d-flex justify-content-between">
					<h5 className="card-header">Listagem de matérias</h5>
					<div className="d-flex justify-content-center align-items-center p-4">
						<button type="button" className="btn btn-primary" onClick={() => setAddMatterShow(true)}>
							<BiPlus size={20} style={{ marginRight: 5 }} />
							Cadastrar
						</button>
					</div>
				</div>

				<div className="table-responsive text-nowrap p-4 pt-0">
					<DataTable<Matter>
						columns={columns}
						data={matters}
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
							<InputText
								id={'name'}
								label={'Nome'}
								mask=""
								placeholder="Nome"
								error={errors.name?.message}
								{...register('name', { disabled: loadingAdd })}
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