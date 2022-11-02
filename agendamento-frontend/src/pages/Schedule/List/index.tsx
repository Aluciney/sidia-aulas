import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';

import { ShowErrorRequest } from '../../../utils/ShowErrorRequest';
import LoadingIcon from '../../../components/LoadingIcon';
import { api } from '../../../services/api';

interface ListSchedule {
	id: number;
	name_user: string;
	email_user: string;
	name_teacher: string;
	email_teacher: string;
	name_matter: string;
	date: string;
	status: string;
	created_at: string;
}

export const List: React.FC = () => {

	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [schedules, setSchedules] = useState<ListSchedule[]>([]);
	const [max, setMax] = useState(0);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const columns: TableColumn<ListSchedule>[] = [
		{
			name: '#',
			minWidth: '80px',
			maxWidth: '80px',
			center: true,
			cell: (row) => row.id,
		},
		// {
		// 	name: 'NOME',
		// 	cell: (row) => row.name_user,
		// },
		{
			name: 'MATÉRIA',
			cell: (row) => row.name_matter,
		},
		{
			name: 'PROFESSOR(A)',
			cell: (row) => row.name_teacher,
		},
		{
			name: 'DATA',
			center: true,
			cell: (row) => format(parseISO(row.date),'dd/MM/yyyy'),
		},
		{
			name: 'AÇÃO',
			center: true,
			minWidth: '100px',
			maxWidth: '100px',
			cell: (row) => (
				<button type="button" onClick={() => deleteSchedules(row)} title="Deletar" className="btn rounded-pill btn-icon btn-outline-danger btn-sm">
					<BiTrash />
				</button>
			),
		},
	];

	useEffect(() => {
		async function initialLoading() {
			try {
				const { data } = await api.get('/schedules', { params: { currentPage: page, perPage } });
				setSchedules(data.data);
				setMax(data.pagination.total);
			} catch (error) {
				ShowErrorRequest(error);
			} finally {
				setLoading(false);
			}
		}
		initialLoading();
	}, [page, perPage]);

	async function deleteSchedules(schedule: any) {
		const { isConfirmed, value } = await Swal.fire({
			title: 'Deletar Agendamento',
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
					const { data } = await api.delete(`/schedules/${schedule.id}`);
					return data;
				} catch (error) {
					return false;
				}
			}
		});
		if (isConfirmed && value) {
			Swal.fire({
				title: 'Deletar Agendamento',
				text: value.message,
				icon: 'success',
				confirmButtonColor: 'var(--bs-success)',
			}).then(() => {
				var newSchedules = schedules.filter(schedule_ => schedule_.id !== schedule.id);
				setSchedules(newSchedules);
				setMax(max => max - 1);
			});
		} else if (isConfirmed) {
			Swal.fire({
				title: 'Deletar Agendamento',
				text: 'Erro ao deletar agendamento',
				icon: 'error',
				confirmButtonColor: 'var(--success-color)',
			});
		}
	}

	return (
		<div className="container-xxl flex-grow-1 container-p-y">
			<h5 className="fw-bold pb-3">Agendamentos</h5>
			<div className="card mb-4">
				<div className="d-flex justify-content-between">
					<h5 className="card-header">Listagem de agendamentos</h5>
					<div className="d-flex justify-content-center align-items-center p-4">
						<Link to="/agendamentos/cadastrar" className="btn btn-primary">
							<BiPlus size={20} style={{ marginRight: 5 }} />
							Cadastrar
						</Link>
					</div>
				</div>
				<div className="table-responsive text-nowrap p-4 pt-0">
					<DataTable<ListSchedule>
						columns={columns}
						data={schedules}
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
						progressPending={loading}
						progressComponent={<LoadingIcon size={40} style={{ margin: 40 }} />}
						noHeader={true}
						persistTableHead={true}
						noDataComponent={<span style={{ margin: 40 }}>Nenhum registro foi encontrado</span>}
						paginationComponentOptions={{
							rowsPerPageText: 'Linhas por página',
							rangeSeparatorText: 'de'
						}}
					/>
				</div>
			</div>
		</div>
	);
};