import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Avatar } from 'primereact/avatar'
import { UserService } from "../services/UserService"
import { useEffect, useState } from "react"
import moment from "moment"

const Balance = () => {
  const [balances, setBalances] = useState([])

    const formatNumber = new Intl.NumberFormat('es-ES')

    const userService = new UserService()

    const listBalance = async() => {
      const res = await userService.balanceSheet()
      console.log(res.data)
      setBalances(res.data)
    }

    useEffect(()=> {
      listBalance()
    },[])

    const formatDate = (balance) => {
      const { date } = balance
      return (
        <span>{moment(date).format('DD/MM/YYYY')}</span>
      )
    }

    const creditBadge = (balance) => {
        return(
            <span className={balance.credit > 0 && "green-badge"}>{balance.credit > 0 ? `$${formatNumber.format(balance.credit)}` : 0}</span>
        )
    }
    const debitBadge = (balance) => {
        return(
            <span className={balance.debit < 0 && "red-badge"}>{balance.debit < 0 ? `$${formatNumber.format(balance.debit)}` : 0}</span>
        )
    }

    const categoryType = (balance) => {
        return(
            <span className="orange-badge">{balance.category}</span>
        )
    }

    const formatTotal = (balance) => {
        return(
            <span>${formatNumber.format(balance.total)}</span>
        )
    }

  return (
    <div className="shadow-2 surface-card border-round p-3">
        <div className='col-9 sm:col-5 lg:col-2 flex'>
            <Avatar icon="pi pi-chart-line" className="mr-2" size="xlarge" style={{ 'background': '#079020'}} />
            <span className="flex align-items-center text-xl font-medium text-900">Balance</span>
        </div>
          <div className="col-12">
            <DataTable
              value={balances}
              responsiveLayout="scroll"
              emptyMessage="No hay datos disponibles"
              paginator rows={10}
              rowsPerPageOptions={[10, 20, 30]}
            >
              <Column field="description" header="Descripción"></Column>
              <Column field="category" header="Categoria" body={categoryType}></Column>
              <Column field="date" header="Fecha" body={formatDate}></Column>
              <Column field="debit" header="Debito" body={debitBadge}></Column>
              <Column field="credit" header="Credito" body={creditBadge}></Column>
              <Column field="total" header="Total" body={formatTotal}></Column>
            </DataTable>
          </div>
    </div>
  )
}

export default Balance