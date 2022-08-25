import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password';
import { useState } from "react";

const CredentialSteps = ({password, setPassword, axiPassword, setAxiPassword, setEqualsPassword}) => {


    return (
        <div>
            <h2 style={{ color: '#fffffe'}}>Crea una contraseña para ingresar.</h2>

            <div className="grid">
                <div className="col-6">
                    <Password className="mt-1 p-inputtext-lg block" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Contraseña' style={{ width: '100%'}} />
                </div>
                <div className="col-6">
                    <Password className="mt-1 p-inputtext-lg block" placeholder='Validar contraseña' value={axiPassword} onChange={(e)=> setAxiPassword(e.target.value)} style={{ width: '100%'}} />
                </div>
            </div>
        </div>
    )
}

export default CredentialSteps