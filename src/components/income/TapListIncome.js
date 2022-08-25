import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

import { InputText } from "primereact/inputtext";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
import { Toast } from "../layout/Toast";

import { Dropdown } from "primereact/dropdown";

import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { BankService } from "../../services/bankServices";
import { IncomeService } from "../../services/IncomeService";
import { Message } from "primereact/message";
import moment from "moment";

const TapListIncome = () => {
  let income = {
    name: "",
    category: "",
    bank: "",
    receipt: "",
    type: 0,
    quantity: "",
    recurrentDate: "",
  };

  const [headerDialog, setheader] = useState("");
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [users, setUsers] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Agregar");
  const userService = new UserService();
  const bankService = new BankService();
  const navigate = useNavigate();
  const formatNumber = new Intl.NumberFormat('en-EU')
  const incomeService = new IncomeService();
  const [Income, setIncome] = useState(income);
  const [_incomes, set_Incomes] = useState([]);
  const [bank, setBanks] = useState([]);
  const [iconButton, setIconButton] = useState("pi pi-save");
  
  const [loadTable, setLoadTable] = useState(true);
  const [total, setTotal] = useState(0);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [displayPosition, setDisplayPosition] = useState(false)

  const getBank = async () => {
    const res = await bankService.getBanks();
    console.log(res.data);
    const banks = res.data.map((item) => {
      return { label: item.name, value: item._id };
    });
    setBanks(banks);
    return banks
  };

  const ListIncomes = async () => {
    const res = await incomeService.listIncome();
    console.log(res.data);
    set_Incomes(res.data);
    getTotalIncome(res.data)
    setLoadTable(false)
  };

  useEffect(() => {
    ListIncomes();
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
    { label: "INGRESO REGULAR", value: 1 },
    { label: "INGRESO RECURRENTE", value: 2 },
    { label: "INGRESO POR COBRAR", value: 3 },
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

  const getTotalIncome = (income) => {
    let _total = 0
    let _arrayQuantity = []
    let x = 0

    income.map(({ quantity }) => {
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

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _income = { ...Income };
    _income[`${name}`] = val;
    //change state user
    setIncome(_income);
  };

  const body = (rowData) => {
    return (
      <div className="grid flex align-content-center">
        <span
          className="pi pi-pencil ml-3 mr-3 mt-1 cursor-pointer"
          onClick={async () => {

            const itemIncome = {
              id: rowData._id,
              name: rowData.name,
              type: rowData.type,
              quantity: rowData.quantity,
              bank: rowData.bank,
              receipt: rowData.receipt,
              category: rowData.category,
              recurrentDate: rowData.recurrentDate,
            };

            console.log(itemIncome);
            await getBank()
            setIncome({ ...itemIncome });
            setheader("Editar Ingreso");
            setIconButton("pi pi-pencil")

            setButtonLabel("Editar");
            setDisplayResponsive(true);
          }}
        />
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

  const footer = () => {
    return (
      <div className="col-12 flex justify-content-end">
        {/** button to add income */}
        <Button
          label={buttonLabel}
          icon={iconButton}
          className="ml-2 p-3 "
          onClick={async () => {
            if (bank.length === 0) {

              navigate('../bank', { replace: true })

            } else {
              if (
                Income.name === "" ||
                Income.category === "" ||
                Income.quantity === "" ||
                Income.bank === "" ||
                Income.type === 0
              ) {
                Toast.fire({
                  icon: "error",
                  title: "Adjunta todos los datos.",
                });
              } else {

                if (Income.type === 2 && Income.recurrentDate === "") {
                  Toast.fire({
                    icon: "error",
                    title: "Seleccione un dia.",
                  });
                  return;
                }

                if (buttonLabel === "Agregar") {

                  const addIcome = {
                    name: Income.name,
                    type: Income.type,
                    quantity: Income.quantity,
                    bank: Income.bank,
                    receipt: Income.receipt,
                    category: Income.category,
                    recurrentDate: Income.type === 2 ? (Income.recurrentDate) : (null),
                  };

                  console.log(addIcome);
                  const res = await incomeService.createIncome(addIcome);
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

                  if (Income.type === 2 && Income.recurrentDate === "") {
                    Toast.fire({
                      icon: "error",
                      title: "Seleccione un dia.",
                    });
                    return;
                  }

                  const uddate = {
                    id: Income.id,
                    type: Income.type,
                    name: Income.name,
                    quantity: Income.quantity,
                    bank: Income.bank,
                    category: Income.category,
                    receipt: Income.receipt,
                    recurrentDate: Income.type === 2 ? (Income.recurrentDate) : (null),
                  };

                  console.log(uddate);

                  const res = await incomeService.updateIncome(uddate);
                  console.log(res);

                  if (res.status === 201) {
                    Toast.fire({
                      icon: "error",
                      title: "Error al editar el Ingreso.",
                    });
                    return;
                  }

                  if (res.status === 203) {
                    sessionStorage.setItem("logged", false);
                    navigate("../login", { replace: true });
                    return;
                  }
                }

                await ListIncomes();
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
      headerDialog === "Registrar Ingreso" ||
      headerDialog === "Editar Ingreso"
    ) {
      return (
        <div>
          {headerDialog === "Registrar Ingreso" && (
            <Dropdown
              value={Income.type}
              options={type}
              onChange={(e) => onInputChange(e, "type")}
              className="w-full mt-2"
              optionLabel="label"
              placeholder="Tipo"
            />
          )}
          <span className="p-input-icon-left w-full mb-3 mt-3">
            <i className="pi pi-align-justify" style={{ color: "aliceblue" }} />
            <InputText
              className="w-full"
              placeholder="Descripción"
              value={Income.name}
              onChange={(e) => onInputChange(e, "name")}
            />
          </span>
          <span className="p-input-icon-left w-full mb-3">
            <i className="pi pi-file" style={{ color: "aliceblue" }} />
            <InputText
              className="w-full"
              placeholder="Numero de Factura."
              value={Income.receipt}
              onChange={(e) => onInputChange(e, "receipt")}
            />
          </span>
          <Dropdown
            value={Income.category}
            options={category}
            onChange={(e) => onInputChange(e, "category")}
            className="w-full mb-3"
            optionLabel="label"
            placeholder="Categoria"
          />
          <Dropdown
            value={Income.bank}
            options={bank}
            onChange={(e) => onInputChange(e, "bank")}
            className="w-full mb-3"
            optionLabel="label"
            placeholder="Banco"
          />
          {Income.type === 2 && (
            <Dropdown
              value={Income.recurrentDate}
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
            value={Income.quantity}
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
            No puedes registrar un ingreso porque no tienes cuentas, crea una.
          </p>
        </div>
      )
    }
  };

  const headerTable = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  )

  const messageTotal = `total: $${formatNumber.format(total)} `

  const categoryBadge = (income) => {
    return (
      <span className={income.category && 'orange-badge'}>{income.category}</span>
    )
  }

  const parseQuantity = (income) => {
    return (
      <span >{`$${formatNumber.format(income.quantity)}`}</span>
    )
  }

  const bankBagde = (income) => {
    return (
      <span className={income.bank && 'purpe-badge'}>{income.bank}</span>
    )
  }

  const Value = `$${formatNumber.format(Income.quantity)} `

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

      <Dialog
        header="Ingreso Regular"
        visible={displayPosition}
        modal
        className="col-10 sm:col-10 lg:col-6"
        onHide={() => setDisplayPosition(false)}
        draggable={false} resizable={false}
      >
        <div className='flex justify-content-center'>
          <img src="assets/images/blocks/logos/getMoney.png" alt="hyper" height={100} />
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

      <div className="col-12">
        <div className="flex justify-content-between align-items-center">

          {_incomes.length > 0 ? (
            <div className="col-4 md:col-2 lg:col-5">
              <Message severity="success" text={messageTotal} className="p-3" />
            </div>
          ) : (
            <div className="col-12 md:col-2">
              <Message severity="info" text="No tienes ingresos" />
            </div>
          )}

          <Button
            label="Agregar Ingreso"
            icon="pi pi-cloud-upload"
            className="ml-2 p-3 mb-2"
            onClick={async () => {
              const res = await getBank()

              if (res.length === 0) {
                setIconButton("pi pi-arrow-right")
                setheader("Advertencia")
                setButtonLabel("Crear cuenta")
                setDisplayResponsive(true);
                return
              }
              setIconButton("pi pi-save")
              setIncome(income);
              setheader("Registrar Ingreso");
              setButtonLabel("Agregar");
              setDisplayResponsive(true);
            }}
          />
        </div>
        <div className="shadow-2 surface-card border-round p-3">
          <div className="col-12">
            <DataTable
              value={_incomes}
              responsiveLayout="scroll"
              emptyMessage="No hay datos disponibles"
              loading={loadTable}
              paginator rows={10}
              globalFilter={globalFilter}
              rowsPerPageOptions={[10, 20, 30]}
              header={headerTable}
            >
              <Column field="name" header="Descripción"></Column>
              <Column field="bank" header="Banco" body={bankBagde}></Column>
              <Column header="Valor" body={parseQuantity}></Column>
              <Column field="category" header="Categoria" body={categoryBadge}></Column>
              <Column header="Acciones" body={body} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapListIncome;
