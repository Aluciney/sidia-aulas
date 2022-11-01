import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BiPlus, BiTrash, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingIcon from '../../../components/LoadingIcon';
import { api } from '../../../services/api';
import { ShowErrorRequest } from '../../../utils/ShowErrorRequest';

export const List: React.FC = () => {

	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [usuarios, setUsuarios] = useState<User[]>([]);
	const [max, setMax] = useState(0);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const columns: TableColumn<User>[] = [
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
				<button type="button" onClick={() => deleteUser(row)}title="Deletar" className="btn rounded-pill btn-icon btn-outline-danger btn-sm">
					<BiTrash />
				</button>
			),
		},
	];

	useEffect(() => {
		async function initialLoading() {
			try {
				const { data } = await api.get('/users', { params: { currentPage: page, perPage } });
				setUsuarios(data.data);
				setMax(data.pagination.total);
			} catch (error) {
				ShowErrorRequest(error);
			} finally {
				setLoading(false);
			}
		}
		initialLoading();
	}, [page, perPage]);

	async function deleteUser(user: User){
		const { isConfirmed, value } = await Swal.fire({
			title: 'Deletar Usuário',
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
					const { data } = await api.delete(`/users/${user.id}`);
					return data;
				} catch (error) {
					return false;
				}
			}
		});
		if (isConfirmed && value) {
			Swal.fire({
				title: 'Deletar Usuário',
				text: value.message,
				icon: 'success',
				confirmButtonColor: 'var(--bs-success)',
			}).then(() => {
				var newUsuarios = usuarios.filter(usuario => usuario.id !== user.id);
				setUsuarios(newUsuarios);
				setMax(max => max - 1);
			});
		}else if(isConfirmed){
			Swal.fire({
				title: 'Deletar Usuário',
				text: 'Erro ao deletar usuário',
				icon: 'error',
				confirmButtonColor: 'var(--success-color)',
			});
		}
	}

	return (
		<div className="container-xxl flex-grow-1 container-p-y">
			<h5 className="fw-bold pb-3">Usuários</h5>	
			<div className="card mb-4">
				<div className="d-flex justify-content-between">
					<h5 className="card-header">Listagem de usuários</h5>
					<div className="d-flex justify-content-center align-items-center p-4">
						<Link to="/usuarios/cadastrar" className="btn btn-primary">
							<BiPlus size={20} style={{ marginRight: 5 }}/>
							Cadastrar
						</Link>
					</div>
				</div>

				<div className="table-responsive text-nowrap p-4 pt-0">
					<DataTable<User>
						columns={columns}
						data={usuarios}
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
						onRowClicked={row => navigate(`/usuarios/${row.id}`)}
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
	);
};