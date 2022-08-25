import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { useEffect, useState } from "react";
import { IncomeService } from "../../services/IncomeService";
import moment from "moment";
import { Message } from "primereact/message";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";


const TapReadIncomeRecurrent = () => {
    const [header, setheader] = useState("Registrar Ingreso");
    const [Income, setIncome] = useState({
        bank: "",
        createdAt: "",
        name: "",
        quantity: "",
        receipt: "",
        user: "",
    });
    const [buttonLabel, setButtonLabel] = useState("Agregar");
    const [total, setTotal] = useState(0);
    const formatNumber = new Intl.NumberFormat('en-EU')
    const [listIncomes, setListIncomes] = useState([])
    const [displayPosition, setDisplayPosition] = useState(false)
    const [globalFilter, setGlobalFilter] = useState(null);

    const incomeService = new IncomeService()

    const listRecurrentIncomes = async () => {
        const res = await incomeService.listIncomeRecurrent()
        setListIncomes(res.data)
        getTotalIncome(res.data)
        console.log(res)
    }

    const getTotalIncome = (incomes) => {
        let _total = 0
        let _arrayQuantity = []
        let x = 0

        incomes.map(({ quantity }) => {
            _arrayQuantity.push(quantity)
        })

        console.log(_arrayQuantity)
        _arrayQuantity.map(() => {
            if (x >= 0 && x <= _arrayQuantity.length) {
                _total = _total + parseFloat(_arrayQuantity[x])
                x++
            }
        })
        setTotal(_total)
    }

    const messageTotal = `total: $${formatNumber.format(total)} `

    const resetDate = (income) => {
        return (
            <span>
                {moment(income).format('DD/MM/YYYY')}
            </span>
        )
    }

    useEffect(() => {
        listRecurrentIncomes()
    }, [])

    const categoryBadge = (income) => {
        return (
            <span className={income.category && 'orange-badge'}>{income.category}</span>
        )
    }

    const bankBadge = (income) => {
        return (
            <span className={income.bank && 'red-badge'}>{income.bank}</span>
        )
    }

    const parseQuantity = (income) => {
        return (
            <span >{`$${formatNumber.format(income.quantity)}`}</span>
        )
    }

    const body = (rowData) => {
        return (
            <div className="grid flex align-content-center">
                <span
                    className="pi pi-eye ml-3 mr-3 mt-1 cursor-pointer"
                    onClick={async () => {

                        const itemIncome = {
                            id: rowData._id,
                            name: rowData.name,
                            createdAt: moment(rowData.createdAt).format('DD/MM/YYYY'),
                            quantity: rowData.quantity,
                            bank: rowData.bank,
                            receipt: rowData.receipt,
                            category: rowData.category,
                            user: rowData.userId,
                        };

                        console.log(itemIncome);

                        setIncome({ ...itemIncome });
                        setDisplayPosition(true)
                    }}
                />

            </div>
        );
    };

    const Value = `$${formatNumber.format(Income.quantity)} `


    const headerTable = (
        <div className="table-header">
             <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    )


    return (
        <div className="grid">
            <div className="col-12">
                <div className="shadow-2 surface-card border-round p-3">
                    <div className="col-4">
                        <div className="col-12 sm:col-12 flex sm:justify-content-start">
                            {listIncomes.length > 0 ? (
                                <div className="col-6 md:col-8 lg:col-10">
                                    <Message severity="success" text={messageTotal} className="p-3 " />
                                </div>
                            ) : (
                                <div className="col-12 md:col-11">
                                    <Message severity="info" text="No tienes Ingresos Recurrentes" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <Dialog
                            header="Ingreso Recurrente"
                            visible={displayPosition}
                            modal
                            className="col-10 sm:col-10 lg:col-6"
                            onHide={() => setDisplayPosition(false)}
                            draggable={false} resizable={false}
                        >
                            <div className='flex justify-content-center'>
                                <img src="assets/images/blocks/logos/incomeRecurrent.png" alt="hyper" height={100} />
                            </div>
                            <div className="flex justify-content-center">
                                <div className="col-10 grid">
                                    <div className="col-12 sm:flex justify-content-between">
                                        <div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Nombre: </p>
                                                <p className="text-2xl mt-1">{Income.name}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Cuenta:</p>
                                                <p className="text-2xl mt-1">{Income.bank}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                                                <p className="text-2xl mt-1">{Income.receipt}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Fecha de registro:</p>
                                                <p className="text-2xl mt-1">{Income.createdAt}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                                                <p className="text-2xl mt-1">{Income.receipt}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                                                <p className="text-2xl mt-1">{Income.receipt}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 sm:flex justify-content-between">
                                        <p className="text-3xl text-normal mt-0 mb-0 font-medium text-primary">Valor:</p>
                                        <p className="text-2xl mt-1 mb-0">{Value}</p>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                        <DataTable
                            value={listIncomes}
                            responsiveLayout="scroll"
                            emptyMessage="No hay datos disponibles"                                                    
                            paginator rows={8}
                            globalFilter={globalFilter}
                            rowsPerPageOptions={[8, 18, 24]}
                            header={headerTable}
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

export default TapReadIncomeRecurrent;

{/* <Column field="createdAt" header="Fecha" body={resetDate}></Column> */
}
