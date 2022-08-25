import {Avatar} from "primereact/avatar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Toast} from "../layout/Toast";
import {UserService} from "../../services/UserService";
import {InputMask} from "primereact/inputmask";
import {useNavigate} from "react-router-dom";


const UserCompany = ({companyId}) => {

    let userCompany = {
        name: "",
        lastName: "",
        identification: "",
        phoneNumber: "",
        email: "",
        companyId: companyId,
    };

    const [header, setheader] = useState("Agregar usuario");
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [users, setUsers] = useState(null);
    const [buttonLabel, setButtonLabel] = useState("Agregar");
    const userService = new UserService();
    const [user, setUser] = useState(userCompany);
    const [loadTable, setLoadTable] = useState(true);
    const navigate = useNavigate()
    const [emailValid, setEmailValid] = useState(true);
    const [idUser, setIdUser] = useState("");
    const [iconButtonDialog, setIconButtonDialog] = useState("pi pi-user-plus");


    console.log(user.companyId)
    const getUsers = async () => {
        const res = await userService.getUsersWithCompany();
        setUsers(res.data);
        setLoadTable(false)
    };

    const validateEmail = (e) => {
        e.preventDefault();

        var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (user.email.match(validRegex)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };

    useEffect(() => {
        if (!companyId) {
            Toast.fire({
                icon: "error",
                title: "Error en la identificación de la empresa, intenta de nuevo.",
            });
            navigate('../setting', {replace: true})
            return
        }
        getUsers();
    }, []);


    const onInputChange = (e, name) => {
        let val = ''
        if (name != 'phoneNumber') {
            val = (e.target && e.target.value) || "";
        } else {
            val = e.value
        }

        let _user = {...user};
        _user[`${name}`] = val;
        //change state user
        setUser(_user);
    };

    const body = (rowData) => {
        return (
            <div className="grid flex align-content-center">
        <span
            className="pi pi-user-edit ml-3 mr-3 mt-1 cursor-pointer"
            onClick={() => {

                setUser({...rowData});
                setEmailValid(true)
                setIconButtonDialog("pi pi-pencil")
                setheader("Editar Usuario");
                setButtonLabel("Editar");
                setDisplayResponsive(true);
            }}
        />
                <span className="pi pi-trash ml-3 mr-3 mt-1 cursor-pointer"
                      onClick={() => {
                          setEmailValid(false)
                          setIdUser(rowData._id)
                          setIconButtonDialog("pi pi-trash")
                          setheader("Confirmar eliminación");
                          setButtonLabel("Eliminar");
                          setDisplayResponsive(true);
                      }}/>
            </div>
        );
    };

    const footer = () => {
        return (
            <div className="col-12 flex justify-content-end">
                {/** button to add user */}
                <Button
                    label={buttonLabel}
                    icon={iconButtonDialog}
                    className="ml-2 p-3"
                    onClick={async () => {
                            if (header === 'Confirmar eliminación'){
                                console.log("eliminando usuario")
                                const res = await userService.deleteUser(idUser)

                                if (res.status === 203) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Error al eliminar el usuario.",
                                    });
                                    sessionStorage.setItem('logged', false)
                                    navigate('../login', {replace: true})
                                }
                            }else {
                                if (
                                    user.name === "" ||
                                    user.lastName === "" ||
                                    user.identification === "" ||
                                    user.phoneNumber === "" ||
                                    user.email === ""
                                ) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Adjunta todos los datos.",
                                    });
                                    return
                                } else {

                                    console.log(emailValid)

                                    if (emailValid === true) {
                                        if (buttonLabel === "Añadir") {
                                            console.log(user);
                                            const res = await userService.createUserWithCompany(user);
                                            console.log(res);

                                            if (res.status === 201) {
                                                Toast.fire({
                                                    icon: "error",
                                                    title: "No puedes registrar más Usuarios.",
                                                });
                                            }

                                            if (res.status === 203) {
                                                Toast.fire({
                                                    icon: "error",
                                                    title: "Error al Crear el usuario.",
                                                });
                                                sessionStorage.setItem('logged', false)
                                                navigate('../login', {replace: true})
                                            }

                                        } else if (buttonLabel === "Editar") {


                                            const userEdit = {
                                                id: user._id,
                                                name: user.name,
                                                lastName: user.lastName,
                                                identification: user.identification,
                                                phoneNumber: user.phoneNumber,
                                                email: user.email
                                            }

                                            const res = await userService.updateUser(userEdit);
                                            console.log(res);

                                            console.log("editando usuario")

                                            if (res.status === 201) {
                                                Toast.fire({
                                                    icon: "error",
                                                    title: "Error al editar el usuario.",
                                                });
                                                return;
                                            }

                                            if (res.status === 203) {
                                                Toast.fire({
                                                    icon: "error",
                                                    title: "Error al editar el usuario.",
                                                });
                                                sessionStorage.setItem('logged', false)
                                                navigate('../login', {replace: true})
                                            }

                                        }
                                    } else {
                                        return
                                    }
                                }
                            }

                        await getUsers()
                        setDisplayResponsive(false);
                    }}
                />
            </div>
        );
    };

    const GetContentDialog = () => {
        if (header === 'Editar Usuario' || header === 'Agregar usuario') {
            return (
                <div>
                    <span className="p-input-icon-left w-full mb-3">
                        <i className="pi pi-search"/>
                    <InputText
                        id="password4"
                        type="text"
                        className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
                        value={user.name}
                        onChange={(e) => onInputChange(e, "name")}
                        placeholder="Nombre"
                    />
                    </span>
                    <span className="p-input-icon-left w-full mb-3">
                        <i className="pi pi-user"/>
                    <InputText
                        id="password4"
                        type="text"
                        className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
                        value={user.lastName}
                        onChange={(e) => onInputChange(e, "lastName")}
                        placeholder="Apellido"
                    /></span>
                    <span className="p-input-icon-left w-full mb-3">
                        <i className="pi pi-id-card"/>
                        <InputMask
                            mask="999-9999999-9"
                            className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
                            placeholder="Cedula"
                            value={user.identification}
                            onChange={(e) => onInputChange(e, "identification")}
                        />
                    </span>
                    <span className="p-input-icon-left w-full mb-3">
                        <i className="pi pi-phone"/>
                    <InputMask
                        maxLength={11}
                        mask="(999) 9999999"
                        className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
                        placeholder="Teléfono"
                        value={user.phoneNumber}
                        onComplete={(e) => onInputChange(e, "phoneNumber")}
                    /></span>
                    <span className="p-input-icon-left w-full mb-3">
                        <i className="pi pi-at"/>
                    <InputText
                        id="password4"
                        type="text"
                        className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
                        value={user.email}
                        onMouseMove={validateEmail}
                        onChange={(e) => onInputChange(e, "email")}
                        placeholder="Correo"
                    /></span>
                    {emailValid === false && (
                        <label
                            htmlFor="email"
                            style={{color: "rgb(242, 95, 76)"}}
                        >
                            <strong>Correo invalido</strong>
                        </label>
                    )}
                </div>
            )
        } else {
            return (
                <div className="flex justify-content-round">
                    <i className="pi pi-info-circle mr-3 flex align-items-center" style={{'fontSize': '2em'}}></i>
                    <p style={{color: "#a7a9be", fontSize: '17px'}}>
                        ¿Seguro que quieres Eliminarlo?
                    </p>
                </div>
            )
        }
    }

    return (
        <div className="grid">
            <div className="col-12 lg:col-3 sm:col-6 flex justify-content-evenly">
                <Avatar icon="pi pi-user" className="mr-2 lg:mr-0" size="xlarge"/>
                <span className="flex align-items-center text-xl font-medium text-900">
          Usuarios de la compañia
        </span>
            </div>

            <Dialog
                header={header}
                visible={displayResponsive}
                className="col-11 ms:col-4 lg:col-4"
                footer={footer}
                onHide={() => setDisplayResponsive(false)}

            >
                {GetContentDialog()}
            </Dialog>

            <div className="col-12">
                <div className="shadow-2 surface-card border-round p-3">
                    <Button
                        label="Agregar usuario  "
                        icon="pi pi-user-plus"
                        className="ml-2 p-3"
                        onClick={() => {
                            setEmailValid(true)
                            setIconButtonDialog("pi pi-user-plus")
                            setheader('Agregar usuario')
                            setButtonLabel('Añadir')
                            setUser(userCompany)
                            setDisplayResponsive(true)
                        }}
                    />

                    <div className="col-12">
                        <DataTable value={users} responsiveLayout="scroll" loading={loadTable}>
                            <Column field="name" header="Nombre"></Column>
                            <Column field="lastName" header="Apellido"></Column>
                            <Column field="phoneNumber" header="Teléfono"></Column>
                            <Column field="email" header="Correo"></Column>
                            <Column header="Acciones" body={body}/>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCompany;
