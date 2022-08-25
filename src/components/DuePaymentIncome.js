import { Avatar } from "primereact/avatar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { IncomeService } from "../services/IncomeService";


const DuePaymentdueIncome = () => {

    const _duedueIncomes = {
        name: "",
        category: "",
        bank: "",
        receipt: "",
        type: 0,
        quantity: "",
        recurrentDate: "",
    }

    const [header, setheader] = useState("Ver cobro");
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [iconsButton, setIconsButton] = useState("pi pi-user-plus");
    const [colorButton, setColorButton] = useState("#3da9fc")
    const [colorBorderButton, setColorBorderButton] = useState("#3da9fc")
    const formatNumber = new Intl.NumberFormat('en-EU')
    const [buttonLabel, setButtonLabel] = useState("Agregar");
    const [loadTable, setLoadTable] = useState(true);
    const dueIncomeService = new IncomeService()
    const [globalFilter, setGlobalFilter] = useState(null);
    const [dueIncome, setDueIncome] = useState(_duedueIncomes)
    const [duedueIncomes, setDuedueIncomes] = useState([])
    const [displayPosition, setDisplayPosition] = useState(false)

    const listDuedueIncome = async () => {
        const res = await dueIncomeService.listDueIncome()
        setDuedueIncomes(res.data)
    }

    const body = (rowData) => {
        return (
            <div className="grid flex align-content-center">
                <span
                    className="pi pi-eye ml-3 mr-3 mt-1 cursor-pointer"
                    onClick={() => {
                        setDueIncome(rowData)
                        console.log(rowData)                
                        setDisplayPosition(true);
                    }} 
                />
            </div>
        );
    };

    useEffect(() => {
        listDuedueIncome()
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

    const messageDialog = `El dia ${moment(dueIncome.createdAt).format('DD/MM/YYYY')} debes cobrar $${formatNumber.format(dueIncome.quantity)} a ${dueIncome.userId}.`

    return (
        <div className="grid">
            <div className="col-12">
                <div className="shadow-2 surface-card border-round p-3">
                    <div className="col-12">
                        <Dialog
                            header={header}
                            visible={displayPosition}
                            modal
                            className="col-10 sm:col-10 lg:col-5"
                            onHide={() => setDisplayPosition(false)}
                            draggable={false} resizable={false}
                        >
                            <div className='flex justify-content-center'>
                                <img src="assets/images/blocks/logos/salary.png" alt="hyper" height={100} />
                            </div>
                            <div className="flex justify-content-center">
                                <p className="text-2xl font-medium" style={{'color': '#a7a9be'}}>{messageDialog}</p>
                            </div>
                        </Dialog>
                        <DataTable
                            value={duedueIncomes}
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

export default DuePaymentdueIncome;
