import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import {useState} from "react";

const PersonalSteps = ({
  name,
  setName,
  lastName,
  setLastName,
  identification,
  setIdentification,
  email,
  setEmail,
  phone,
  setPhone,
}) => {
  const [emailValid, setEmailValid] = useState(true);
  const validateEmail = (e) => {
    e.preventDefault();

    let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  return (
    <div>
      <h2 style={{ color: '#fffffe'}} >Ingresa tus datos personales basicos.</h2>     

      <div className="grid">
        <div className="col-6">
          <span className="p-input-icon-left w-full mb-3">
            <i className="pi pi-search" />
            <InputText
              className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
              value={name}
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
            />
          </span>
        </div>
        <div className="col-6">
          <span className="p-input-icon-left w-full mb-3">
            <i className="pi pi-search" />
            <InputText
              className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </span>
        </div>
      </div>

      <div className="grid">
        <div className="col-6">
          <span className="p-input-icon-left w-full mb-3">
            <i className="pi pi-id-card" />
            <InputMask
              mask="999-999-99999"
              className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
              placeholder="Cedula"
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
            />
          </span>
        </div>
        <div className="col-6">
          <span className="p-input-icon-left w-full mb-3">
            <i className="pi pi-phone" />
            <InputMask
              maxLength={11}
              mask="(999) 9999999"
              className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </span>
        </div>
      </div>

      <span className="p-input-icon-left w-full mb-3">
        <i className="pi pi-at" />
        <InputText
          className="mt-1 p-inputtext-lg block w-full pr-3 pt-3 pb-3"
          placeholder="Correo"
          onMouseMove={validateEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailValid === false && (
            <label
                htmlFor="email"
                style={{color: "rgb(242, 95, 76)"}}
            >
              <strong>Correo invalido</strong>
            </label>
        )}
      </span>
    </div>
  );
};

export default PersonalSteps;
