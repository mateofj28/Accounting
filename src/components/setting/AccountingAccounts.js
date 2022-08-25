import { Avatar } from "primereact/avatar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { BankService } from "../../services/bankServices";
import { Toast } from "../layout/Toast";
import { Navigate } from "react-router-dom";

const AccountingAccounts = () => {

    const [header, setheader] = useState("Agregar Banco");
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [bankName, setBankName] = useState("");
    const [bankId, setBankId] = useState("");
    const [banks, setBanks] = useState("");
    const [iconsButton, setIconsButton] = useState("pi pi-user-plus");
    const [colorButton, setColorButton] = useState("#3da9fc")
    const [colorBorderButton, setColorBorderButton] = useState("#3da9fc")
    const [buttonLabel, setButtonLabel] = useState("Agregar");
    const [loadTable, setLoadTable] = useState(true);
    const bankService = new BankService();

    const getBanks = async () => {
        const res = await bankService.getBanks();
        console.log(res.data);
        setBanks(res.data);
        setLoadTable(false)
    };

    useEffect(() => {
        getBanks();
    },[]);

    const body = (rowData) => {
        return (
            <div className="grid flex align-content-center">
                <span
                    className="pi pi-pencil ml-3 mr-3 mt-1 cursor-pointer"
                    onClick={() => {
                        setheader("Editar Cuenta");
                        setButtonLabel("Editar");
                        setColorButton("#3da9fc")
                        setColorBorderButton("#3da9fc")
                        setIconsButton("pi pi-pencil")
                        setBankName(rowData.name);
                        setBankId(rowData._id);
                        setDisplayResponsive(true);
                    }}
                />
                <span
                    className="pi pi-trash ml-3 mr-3 mt-1 cursor-pointer"
                    onClick={() => {
                        setheader("Confirmar Eliminación");
                        setIconsButton("pi pi-trash")
                        setColorButton("#fa5246")
                        setColorBorderButton("#fa5246")
                        setButtonLabel("Eliminar");
                        setBankName(rowData.name);
                        setBankId(rowData._id);
                        setDisplayResponsive(true);
                    }} />
            </div>
        );
    };

    const state = (rowData) => {
        return (
            <span className={rowData.status === 0 ? "green-badge" : "red-badge"}>
                {rowData.status === 0 ? "Activo" : "Inactivo"}
            </span>
        );
    };

    const bodyTemplate = () => {

        console.log(header)

        if (header === 'Registrar Cuenta' || header === 'Editar Cuenta') {
            return (
                <div>
                    <p style={{ color: "#a7a9be" }}>Ingresa el nombre de la Cuenta Bancaria.</p>
                    <InputText
                        id="password4"
                        type="text"
                        className="w-full mb-3 p-3 mt-3"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Cuenta Bancaria"
                    />
                </div>
            )
        } else {
            return (
                <div className="flex justify-content-round">
                    <i className="pi pi-info-circle mr-3 flex align-items-center" style={{'fontSize': '2em'}}></i>
                    <p style={{ color: "#a7a9be", fontSize: '17px'}}>
                        ¿Seguro que quieres Eliminarlo?
                    </p>
                </div>
            )
        }   
    }

    const footer = () => {
        return (
            <div className="col-12 flex justify-content-end">
                <Button
                    label={buttonLabel}
                    icon={iconsButton}
                    className="ml-2 p-3"
                    style={{background: colorButton, borderColor: colorBorderButton }}
                    onClick={async () => {
                        if (bankName === "") {
                            Toast.fire({
                                icon: "error",
                                title: "Anexa todos los datos.",
                            });
                        } else {
                            if (buttonLabel === "Agregar") {
                                //camino de egregar

                                const res = await bankService.createBank({
                                    name: bankName,
                                });

                                if (res.status === 201) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Error al Agregar el banco.",
                                    });
                                }

                                if (res.status === 203) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Credenciales invalidas.",
                                    });
                                    Navigate('../login', {replace: true})
                                    return
                                }
                                

                                setBankName("");
                            } else if (buttonLabel === 'Editar') {

                                const editBank = {
                                    name: bankName,
                                    id: bankId,
                                };

                                const res = await bankService.updateBank(editBank);

                                // falta capturar el error 203

                                if (res.status === 201) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Error al editar el banco.",
                                    });
                                }

                                if (res.status === 203) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Credenciales invalidas.",
                                    });
                                    Navigate('../login', {replace: true})
                                    return
                                }

                                console.log(res);
                            } else {
                                
                                console.log(bankId)
                                const res = await bankService.delete({ id: bankId })
                                console.log(res)

                                if (res.status === 201) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Error al eliminar el banco.",
                                    });
                                }

                                if (res.status === 203) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Credenciales invalidas.",
                                    });
                                    Navigate('../login', {replace: true})
                                    return
                                }
                            }
                        }
                        getBanks()
                        setDisplayResponsive(false);
                    }}
                />
            </div>
        );
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-2 sm:col-6 flex justify-content-evenly">
                <Avatar
                    icon="pi pi-credit-card"
                    className="mr-2 lg:mr-0"
                    size="xlarge"
                    style={{ background: "#272343", color: "#ffffff" }}
                />
                <span className="flex align-items-center text-xl font-medium text-900">
                    Cuentas
                </span>
            </div>

            <Dialog
                header={header}
                visible={displayResponsive}
                className="col-11 ms:col-4 lg:col-3"
                footer={footer}
                onHide={() => setDisplayResponsive(false)}
                breakpoints={{ "960px": "75vw" }}
            >
                {bodyTemplate()}
            </Dialog>

            <div className="col-12">
                <div className="shadow-2 surface-card border-round p-3">
                    <Button
                        label="Agregar Cuenta"
                        icon="pi pi-plus"
                        className="ml-2 p-3"
                        onClick={() => {
                            setheader('Registrar Cuenta')
                            setIconsButton("pi pi-plus")
                            setButtonLabel("Agregar")
                            setColorButton("#3da9fc")
                            setColorBorderButton("#3da9fc")
                            setDisplayResponsive(true)
                        }}
                    />
                    <div className="col-12">                                               
                        <DataTable value={banks} responsiveLayout="scroll" loading={loadTable} emptyMessage="No hay datos Disponibles">
                            <Column field="name" header="Nombre"></Column>
                            <Column header="Estado" body={state} />
                            <Column header="Acciones" body={body} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountingAccounts;
