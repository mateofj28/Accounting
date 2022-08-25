import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { BankService } from "../../services/bankServices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExpensesService } from "../../services/ExpensesService";
import { Toast } from "../layout/Toast";
import { Message } from "primereact/message";
import moment from "moment";

const TapListExpenses = () => {
    let _expense = {
        name: "",
        category: "",
        bank: "",
        receipt: "",
        type: 0,
        quantity: "",
        recurrentDate: null,
    };

    const [headerDialog, setHeader] = useState("");
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [users, setUsers] = useState(null);
    const [buttonLabel, setButtonLabel] = useState("Agregar");
    const expenseService = new ExpensesService();

    const formatNumber = new Intl.NumberFormat('en-EU')
    const navigate = useNavigate();
    const [expense, setExpense] = useState(_expense);
    const [expenses, setExpenses] = useState([]);
    const [iconButton, setIconButton] = useState("pi pi-save");
    const [bank, setBanks] = useState("");
    const bankService = new BankService();
    const [loadTable, setLoadTable] = useState(true);
    const [total, setTotal] = useState(0);
    const [displayPosition, setDisplayPosition] = useState(false)
    const [globalFilter, setGlobalFilter] = useState(null);

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _expense = { ...expense };
        _expense[`${name}`] = val;
        //change state user
        setExpense(_expense);
    };

    const getExpenses = async () => {
        const res = await expenseService.listExpenses();
        console.log(res.data);
        setExpenses(res.data);
        getTotalExpenses(res.data)
        setLoadTable(false);
    };

    const getBank = async () => {
        const res = await bankService.getBanks();
        console.log(res.data);
        const banks = res.data.map((item) => {
            return { label: item.name, value: item._id };
        });
        setBanks(banks)

        return banks
    };

    useEffect(() => {
        getExpenses();
    }, []);

    const category = [
        { label: "Salario", value: "SALARIO" },
        { label: "Casa", value: "CASA" },
        { label: "Internet", value: "INTERNET" },
        { label: "Instalacion", value: "INSTALACION" },
        { label: "Servicios", value: "SERVICIOS" },
        { label: "Otros", value: "OTROS" },
    ];

    const type = [
        { label: "EGRESO REGULAR", value: 1 },
        { label: "EGRESO RECURRENTE", value: 2 },
        { label: "EGRESO POR PAGAR", value: 3 },
    ];

    const days = [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
        { label: "12", value: 12 },
        { label: "13", value: 13 },
        { label: "14", value: 14 },
        { label: "15", value: 15 },
        { label: "16", value: 16 },
        { label: "17", value: 17 },
        { label: "18", value: 18 },
        { label: "19", value: 19 },
        { label: "20", value: 20 },
        { label: "21", value: 21 },
        { label: "22", value: 22 },
        { label: "23", value: 23 },
        { label: "24", value: 24 },
        { label: "25", value: 25 },
        { label: "26", value: 26 },
        { label: "27", value: 27 },
        { label: "28", value: 28 },
        { label: "29", value: 29 },
        { label: "30", value: 30 },
        { label: "31", value: 31 },
    ];

    const getTotalExpenses = (expenses) => {
        let _total = 0
        let _arrayQuantity = []
        let x = 0

        expenses.map(({ quantity }) => {
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

    const body = (rowData) => {
        return (
            <div className="grid flex align-content-center">
                <span
                    className="pi pi-pencil ml-3 mr-3 mt-1 cursor-pointer"
                    onClick={async () => {
                        const res = await expenseService.getExpensesById(rowData._id);
                        console.log(res.data);

                        const itemExpenses = {
                            id: rowData._id,
                            name: rowData.name,
                            type: rowData.type,
                            quantity: rowData.quantity,
                            bank: res.data.bank,
                            receipt: rowData.receipt,
                            category: rowData.category,
                            recurrentDate: rowData.recurrentDate,
                        };

                        console.log(rowData.bank);
                        await getBank()
                        setExpense({ ...itemExpenses });
                        setHeader("Editar Egreso");
                        setButtonLabel("Editar");
                        setDisplayResponsive(true);
                    }}
                />
                <span
                    className="pi pi-eye ml-3 mr-3 mt-1 cursor-pointer"
                    onClick={async () => {

                        const itemExpense = {
                            id: rowData._id,
                            name: rowData.name,
                            createdAt: moment(rowData.createdAt).format('DD/MM/YYYY'),
                            quantity: rowData.quantity,
                            bank: rowData.bank,
                            receipt: rowData.receipt,
                            category: rowData.category,
                            user: rowData.userId
                        };

                        console.log(itemExpense);
                        setExpense({ ...itemExpense });
                        setDisplayPosition(true)
                    }}
                />
            </div>
        );
    };

    const footer = () => {
        return (
            <div className="col-12 flex justify-content-end">
                {/** button to add expense */}
                <Button
                    label={buttonLabel}
                    icon={iconButton}
                    className="ml-2 p-3"
                    onClick={async () => {

                        if (bank.length === 0) {

                            navigate('../bank', { replace: true })

                        } else {

                            if (
                                expense.name === "" ||
                                expense.category === "" ||
                                expense.quantity === "" ||
                                expense.bank === "" ||
                                expense.type === 0
                            ) {
                                Toast.fire({
                                    icon: "error",
                                    title: "Adjunta todos los datos.",
                                });
                            } else {
                                console.log(expense);

                                if (expense.type === 2 && expense.recurrentDate === null) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Seleccione un dia.",
                                    });
                                    return;
                                }

                                if (buttonLabel === "Agregar") {
                                    const addExpenses = {
                                        name: expense.name,
                                        type: expense.type,
                                        quantity: expense.quantity,
                                        bank: expense.bank,
                                        receipt: expense.receipt,
                                        category: expense.category,
                                        recurrentDate:
                                            expense.type === 2 ? expense.recurrentDate : null,
                                    };

                                    console.log(addExpenses);
                                    const res = await expenseService.createExpenses(addExpenses);
                                    console.log(res);

                                    if (res.status === 201) {
                                        Toast.fire({
                                            icon: "error",
                                            title: "Se produjo un error, intentaló de nuevo.",
                                        });
                                        return;
                                    }

                                    if (res.status === 203) {
                                        sessionStorage.setItem("logged", false);
                                        navigate("../login", { replace: true });
                                        return;
                                    }
                                } else if (buttonLabel === "Editar") {
                                    console.log("Ventana de edición.");

                                    const editExpenses = {
                                        id: expense.id,
                                        name: expense.name,
                                        quantity: expense.quantity,
                                        bank: expense.bank,
                                        category: expense.category,
                                        receipt: expense.receipt,
                                        type: expense.type,
                                        recurrentDate:
                                            expense.type === 2 ? expense.recurrentDate : null,
                                    };

                                    console.log(editExpenses);
                                    const res = await expenseService.updateExpenses(editExpenses);
                                    console.log(res.data);

                                    if (res.status === 201) {
                                        Toast.fire({
                                            icon: "error",
                                            title: "Error al editar el Egreso.",
                                        });
                                        return;
                                    }

                                    if (res.status === 203) {
                                        sessionStorage.setItem("logged", false);
                                        navigate("../login", { replace: true });
                                        return;
                                    }
                                } else {
                                    console.log("vamos a eliminar");
                                    console.log(expense._id);
                                }

                                setTimeout(() => {
                                    getExpenses();
                                }, 1000)
                                setDisplayResponsive(false);
                            }
                        }

                    }}
                />
            </div>
        );
    };

    const ContentDialog = () => {
        if (
            headerDialog === "Registrar Egreso" ||
            headerDialog === "Editar Egreso"
        ) {
            return (
                <div>
                    {headerDialog === "Registrar Egreso" && (
                        <Dropdown
                            value={expense.type}
                            options={type}
                            onChange={(e) => onInputChange(e, "type")}
                            className="w-full mt-2 mb-3"
                            optionLabel="label"
                            placeholder="Tipo"
                        />
                    )}

                    <span className="p-input-icon-left w-full mb-3">
                        <i className="pi pi-align-justify" style={{ color: "aliceblue" }} />
                        <InputText
                            className="w-full"
                            placeholder="Descripción"
                            value={expense.name}
                            onChange={(e) => onInputChange(e, "name")}
                        />
                    </span>
                    <span className="p-input-icon-left w-full mb-3">
                        <i className="pi pi-file" style={{ color: "aliceblue" }} />
                        <InputText
                            className="w-full"
                            placeholder="Numero de Factura."
                            value={expense.receipt}
                            onChange={(e) => onInputChange(e, "receipt")}
                        /></span>
                    <Dropdown
                        value={expense.category}
                        options={category}
                        onChange={(e) => onInputChange(e, "category")}
                        className="w-full mb-3"
                        optionLabel="label"
                        placeholder="Categoria"
                    />
                    <Dropdown
                        value={expense.bank}
                        options={bank}
                        onChange={(e) => onInputChange(e, "bank")}
                        className="w-full mb-3"
                        optionLabel="label"
                        placeholder="Banco"
                    />
                    {expense.type === 2 && (
                        <Dropdown
                            value={expense.recurrentDate}
                            options={days}
                            onChange={(e) => onInputChange(e, "recurrentDate")}
                            className="w-full mb-3"
                            optionLabel="label"
                            placeholder="Dia de pago"
                        />
                    )}

                    <InputNumber
                        inputId="currency-us"
                        placeholder="Valor"
                        mode="currency"
                        currency="USD"
                        className="w-full"
                        value={expense.quantity}
                        onValueChange={(e) => onInputChange(e, "quantity")}
                        locale="en-US"
                        minFractionDigits={2}
                    />
                </div>
            );
        } else if (headerDialog === "Advertencia") {
            return (
                <div className="flex justify-content-round">
                    <i className="pi pi-info-circle mr-3 flex align-items-center" style={{ 'fontSize': '2em' }}></i>
                    <p style={{ color: "#a7a9be", fontSize: '17px' }}>
                        No puedes registrar un Egreso porque no tienes cuentas, crea una.
                    </p>
                </div>
            )
        }

    };

    const categoryBadge = (expense) => {
        return (
            <span className={expense.category && "orange-badge"}>
                {expense.category}
            </span>
        );
    };

    const parseQuantity = (expense) => {
        return (
            <span >{`$${formatNumber.format(expense.quantity)}`}</span>
        )
    }

    const bankBagde = (expense) => {
        return <span className={expense.bank && "purpe-badge"}>{expense.bank}</span>;
    };

    const headerTable = (
        <div className="table-header">
             <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    )

    const messageTotal = `total: $${formatNumber.format(total)}`
    const Value = `$${formatNumber.format(expense.quantity)} `

    return (
        <div className="grid">
            <Dialog
                header={headerDialog}
                visible={displayResponsive}
                className="col-11 ms:col-4 lg:col-4"
                footer={footer}
                onHide={() => setDisplayResponsive(false)}
                breakpoints={{ "960px": "75vw" }}
                baseZIndex={99}
            >
                {ContentDialog()}
            </Dialog>

            <div className="col-12">
                <div className="flex justify-content-between align-items-center">
                    {expenses.length > 0 ? (
                        <div className="col-4 md:col-2 lg:col-4">
                            <Message severity="error" text={messageTotal} className="p-3 " />
                        </div>
                    ) : (
                        <div className="col-5 md:col-2">
                            <Message severity="info" text="No tienes Egresos" />
                        </div>
                    )}
                    <Button
                        label="Agregar Egreso"
                        icon="pi pi-cloud-upload"
                        className="ml-2 mb-2 p-2 sm:p-3"
                        onClick={async () => {
                            const _banks = await getBank()
                            if (_banks.length === 0) {
                                setIconButton("pi pi-arrow-right")
                                setHeader("Advertencia")
                                setButtonLabel("Crear cuenta")
                                setDisplayResponsive(true);
                                return
                            }

                            setExpense(_expense);
                            setHeader("Registrar Egreso");
                            setButtonLabel("Agregar");
                            setDisplayResponsive(true);
                        }}
                    />
                </div>
                <div className="shadow-2 surface-card border-round p-3">
                    <div className="col-12">
                        <Dialog
                            header="Egreso Regular"
                            visible={displayPosition}
                            modal
                            className="col-10 sm:col-10 lg:col-6"
                            onHide={() => setDisplayPosition(false)}
                            draggable={false} resizable={false}
                        >
                            <div className='flex justify-content-center'>
                                <img src="assets/images/blocks/logos/expenses.png" alt="hyper" height={100} />
                            </div>
                            <div className="flex justify-content-center">
                                <div className="col-10 grid">
                                    <div className="col-12 sm:flex justify-content-between">
                                        <div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Nombre: </p>
                                                <p className="text-2xl mt-1">{expense.name}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Cuenta:</p>
                                                <p className="text-2xl mt-1">{expense.bank}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                                                <p className="text-2xl mt-1">{expense.receipt}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Fecha de registro:</p>
                                                <p className="text-2xl mt-1">{expense.createdAt}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                                                <p className="text-2xl mt-1">{expense.receipt}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                                                <p className="text-2xl mt-1">{expense.receipt}</p>
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
                            value={expenses}
                            responsiveLayout="scroll"
                            emptyMessage="No hay datos disponibles"
                            loading={loadTable}
                            paginator rows={8}
                            globalFilter={globalFilter}
                            rowsPerPageOptions={[8, 16, 24]}
                            header={headerTable}
                        >
                            <Column field="name" header="Descripción"></Column>
                            <Column field="bank" header="Banco" body={bankBagde}></Column>
                            <Column header="Valor" body={parseQuantity}></Column>
                            <Column
                                field="category"
                                header="Categoria"
                                body={categoryBadge}
                            ></Column>
                            <Column header="Acciones" body={body} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TapListExpenses;
