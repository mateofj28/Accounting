import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { useEffect, useState } from "react";
import { ExpensesService } from "../../services/ExpensesService";

import moment from "moment";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";


const TapAddEgress = () => {
  const [viewExpense, setViewExpense] = useState({
    id: "",
    name: "",
    createdAt: "",
    quantity: "",
    bank: "",
    receipt: "",
    category: "",
    user: "",
  });
  
  const [total, setTotal] = useState(0);
  const [listExpenses, setListExpenses] = useState([]);
  const formatNumber = new Intl.NumberFormat("en-EU");
  const [displayPosition, setDisplayPosition] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const expenseService = new ExpensesService();

  const body = (rowData) => {
    return (
      <div className="grid flex align-content-center">
        <span
          className="pi pi-eye ml-3 mr-3 mt-1 cursor-pointer"
          onClick={async () => {
            console.log(rowData);

            const itemviewExpense = {
              id: rowData._id,
              name: rowData.name,
              createdAt: moment(rowData.createdAt).format("DD/MM/YYYY"),
              quantity: rowData.quantity,
              bank: rowData.bank,
              receipt: rowData.receipt,
              category: rowData.category,
              user: rowData.userId,
            };

            console.log(itemviewExpense);

            setViewExpense({ ...itemviewExpense });
            setDisplayPosition(true);
          }}
        />
      </div>
    );
  };

  const listExpenseRecurrent = async () => {
    const res = await expenseService.listExpensesRecurrent();
    setListExpenses(res.data);
    getTotalExpensesRecurrent(res.data);
    console.log(res);
  };

  const resetDate = (expense) => {
    return <span>{moment(expense).format("DD/MM/YYYY")}</span>;
  };

  const getTotalExpensesRecurrent = (expensesRecurrent) => {
    let _total = 0;
    let _arrayQuantity = [];
    let x = 0;

    expensesRecurrent.map(({ quantity }) => {
      _arrayQuantity.push(quantity);
    });

    console.log(_arrayQuantity);
    _arrayQuantity.map(() => {
      if (x >= 0 && x <= _arrayQuantity.length) {
        _total = _total + parseFloat(_arrayQuantity[x]);
        x++;
      }
    });
    setTotal(_total);
  };

  const messageTotal = `total: $${formatNumber.format(total)} `;

  useEffect(() => {
    listExpenseRecurrent();
  }, []);

  const categoryBadge = (expense) => {
    return (
      <span className={expense.category && "orange-badge"}>
        {expense.category}
      </span>
    );
  };

  const parseQuantity = (expenseRecurrent) => {
    return <span>{`$${formatNumber.format(expenseRecurrent.quantity)}`}</span>;
  };

  const headerTable = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  )

  const Value = `$${formatNumber.format(viewExpense.quantity)} `;

  return (
    <div className="grid">
      <div className="col-12">
        <div className="shadow-2 surface-card border-round p-3">
          <div className="col-4">
            <div className="col-12 sm:col-12 flex sm:justify-content-start">
              {listExpenses.length > 0 ? (
                <div className="col-6 md:col-4 lg:col-10">
                  <Message
                    severity="error"
                    text={messageTotal}
                    className="p-3 "
                  />
                </div>
              ) : (
                <div className="col-12 md:col-10">
                  <Message
                    severity="info"
                    text="No tienes Egresos Recurrentes"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <Dialog
              header="Egreso Recurrente"
              visible={displayPosition}
              modal
              className="col-10 sm:col-10 lg:col-6"
              onHide={() => setDisplayPosition(false)}
              draggable={false}
              resizable={false}
            >
              <div className="flex justify-content-center">
                <img
                  src="assets/images/blocks/logos/expensesRecurrent.png"
                  alt="hyper"
                  height={100}
                />
              </div>
              <div className="flex justify-content-center">
                <div className="col-10 grid">
                  <div className="col-12 sm:flex justify-content-between">
                    <div>
                      <div className="col-12">
                        <p className="text-3xl mb-0 text-normal font-medium text-primary">Nombre: </p>
                        <p className="text-2xl mt-1">{viewExpense.name}</p>
                      </div>
                      <div className="col-12">
                        <p className="text-3xl mb-0 text-normal font-medium text-primary">Cuenta:</p>
                        <p className="text-2xl mt-1">{viewExpense.bank}</p>
                      </div>
                      <div className="col-12">
                        <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                        <p className="text-2xl mt-1">{viewExpense.receipt}</p>
                      </div>
                    </div>
                    <div>
                      <div className="col-12">
                        <p className="text-3xl mb-0 text-normal font-medium text-primary">Fecha de registro:</p>
                        <p className="text-2xl mt-1">{viewExpense.createdAt}</p>
                      </div>
                      <div className="col-12">
                        <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                        <p className="text-2xl mt-1">{viewExpense.receipt}</p>
                      </div>
                      <div className="col-12">
                        <p className="text-3xl mb-0 text-normal font-medium text-primary">Factura:</p>
                        <p className="text-2xl mt-1">{viewExpense.receipt}</p>
                      </div>
                    </div>
                  </div>


                  {/* <div className="col-12">            
                  <p className="text-3xl mb-0 text-normal font-medium text-primary">Remitente:</p>
                  <p className="text-2xl mt-1">{viewExpense.user}</p>
                  </div> */}



                  <div className="col-12 sm:flex justify-content-between">
                    <p className="text-3xl text-normal mt-0 mb-0 font-medium text-primary">Valor:</p>
                    <p className="text-2xl mt-1 mb-0">{Value}</p>
                  </div>
                </div>
              </div>
            </Dialog>
            <DataTable
              value={listExpenses}
              responsiveLayout="scroll"
              emptyMessage="No hay datos disponibles"
              paginator
              rows={8}
              globalFilter={globalFilter}
              
              rowsPerPageOptions={[8, 16, 24]}
              header={headerTable}
            >
              <Column field="name" header="Descripción"></Column>
              <Column
                field="category"
                header="Categoria"
                body={categoryBadge}
              ></Column>
              <Column header="Valor" body={parseQuantity}></Column>
              <Column
                field="createdAt"
                header="Fecha"
                body={resetDate}
              ></Column>
              <Column header="Acciones" body={body} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapAddEgress;
