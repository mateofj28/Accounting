import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { TabPanel, TabView } from 'primereact/tabview';
import { useState } from 'react';
import DuePaymentExpenses from '../DuePaymentExpenses';
import TapAddEgress from './TapAddExpenses';
import TapListEgress from './TapListExpenses';

const Egress = () => {

    return (
        <div className='grid'>
            <div className='col-5 lg:col-2 flex justify-content-evenly'>
                <Avatar icon="pi pi-angle-double-down" className="mr-2 lg:mr-0" size="xlarge" style={{ 'background': '#f25f4c'}} />
                <span className=" flex align-items-center text-xl font-medium text-900">Egresos</span>
            </div>       
            <div className='col-12'>
                <TabView>
                    <TabPanel header="Regulares">
                        <TapListEgress />
                    </TabPanel>
                    <TabPanel header="Recurrentes">
                        <TapAddEgress />
                    </TabPanel>
                    <TabPanel header="Por pagar">
                        <DuePaymentExpenses />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )

}

export default Egress