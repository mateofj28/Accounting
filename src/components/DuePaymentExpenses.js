
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ExpensesService } from "../services/ExpensesService";

const DuePaymentExpenses = () => {

    const _dueExpense = {
        name: "",
        category: "",
        bank: "",
        receipt: "",
        type: 0,
        quantity: "",
        recurrentDate: "",
    }

    
    const formatNumber = new Intl.NumberFormat('en-EU')
    const dueExpenseService = new ExpensesService()
    const [globalFilter, setGlobalFilter] = useState(null);
    const [dueExpense, setDueExpense] = useState(_dueExpense)
    const [dueExpenses, setDueExpenses] = useState([])
    const [displayPosition, setDisplayPosition] = useState(false)
    const [loadTable, setLoadTable] = useState(true)

    const axiosGetDueExpenses = async () => {
        const res = await dueExpenseService.listDueExpenses()
        console.log(res)
        setLoadTable(false)
        setDueExpenses(res.data)
    }

    const body = (rowData) => {
        return (
            <div className="grid flex align-content-center">
                <span
                    className="pi pi-eye ml-3 mr-3 mt-1 cursor-pointer"
                    onClick={() => {
                        setDueExpense(rowData)
                        
                        console.log(rowData)                
                        setDisplayPosition(true);
                    }} 
                />
            </div>
        );
    };

    useEffect(() => {
        axiosGetDueExpenses()
    }, [])


    const bankBadge = (dueIncome) => {
        return (
            <span className={dueIncome.bank && 'red-badge'}>{dueIncome.bank}</span>
        )
    }

    const parseQuantity = (dueIncome) => {
        return (
            <span >{`$${formatNumber.format(dueIncome.quantity)}`}</span>
        )
    }

    const categoryBadge = (dueIncome) => {
        return (
            <span className={dueIncome.category && 'orange-badge'}>{dueIncome.category}</span>
        )
    }

    const headerTable = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    )

    const messageDialog = `El dia ${moment(dueExpense.createdAt).format('DD/MM/YYYY')} debes pagar $${formatNumber.format(dueExpense.quantity)} a ${dueExpense.userId}.`

    return (
        <div className="grid">
            <div className="col-12">
                <div className="shadow-2 surface-card border-round p-3">
                    <div className="col-12">
                        <Dialog
                            header="Ver pago"
                            visible={displayPosition}
                            modal
                            className="col-10 sm:col-10 lg:col-5"
                            onHide={() => setDisplayPosition(false)}
                            draggable={false} resizable={false}
                        >
                            <div className='flex justify-content-center'>
                                <img src="assets/images/blocks/logos/income.png" alt="hyper" height={100} />
                            </div>
                            <div className="flex justify-content-center">
                                <p className="text-2xl font-medium" style={{'color': '#a7a9be'}}>{messageDialog}</p>
                            </div>
                        </Dialog>
                        <DataTable
                            value={dueExpenses}
                            responsiveLayout="scroll"
                            emptyMessage="No hay datos disponibles"
                            paginator rows={8}
                            globalFilter={globalFilter}
                            rowsPerPageOptions={[8, 18, 24]}
                            header={headerTable}
                            loading={loadTable}
                        >
                            <Column field="name" header="Descripción"></Column>
                            <Column field="bank" header="Banco" body={bankBadge}></Column>
                            <Column field="quantity" header="Valor" body={parseQuantity}></Column>
                            <Column field="category" header="Categoria" body={categoryBadge}></Column>
                            <Column header="Acciones" body={body} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DuePaymentExpenses;