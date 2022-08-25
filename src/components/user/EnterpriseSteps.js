import { InputText } from "primereact/inputtext"

const EnterpriseSteps = ({enterpriseName, setEnterpriseName, licencia, setLicencia}) => {
    return (
        <div>
            <h2 style={{ color: '#fffffe'}}>Ingresa el nombre de la empresa y la licencia.</h2>            

            <span className="p-input-icon-left w-full mb-3">
                <i className="pi pi-building" />
                <InputText className="mt-1 p-inputtext-lg block pr-3 pt-3 pb-3" placeholder='Nombre de la empresa' style={{ width: '100%' }} value={enterpriseName} onChange={(e)=> setEnterpriseName(e.target.value)} />
            </span>
            <span className="p-input-icon-left w-full mb-3">
                <i className="pi pi-key" />
                <InputText className="mt-1 p-inputtext-lg block pr-3 pt-3 pb-3" placeholder='Licencia' style={{ width: '100%' }} value={licencia} onChange={(e)=> setLicencia(e.target.value)} />
            </span>
        </div>
    )
}

export default EnterpriseSteps