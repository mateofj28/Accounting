import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { TabPanel, TabView } from 'primereact/tabview';

import { useState } from 'react';
import DuePaymentIncome from '../DuePaymentIncome';

import TapReadIncomeRecurrent from './TapAddIncome';
import TapListEntry from './TapListIncome';

const Entry = () => {

    return (
        <div className='grid'>
            <div className='col-9 sm:col-5 lg:col-2 flex justify-content-evenly'>
                <Avatar icon="pi pi-angle-double-up" className="mr-2 lg:mr-0" size="xlarge" style={{ 'background': '#078080' }} />
                <span className="flex align-items-center text-xl font-medium text-900">Ingresos</span>
            </div>
            <div className="col-12">
                <div className='col-12'>
                    <TabView>
                        <TabPanel header="Regulares">
                            <TapListEntry />
                        </TabPanel>
                        <TabPanel header="Recurrentes">
                            <TapReadIncomeRecurrent />
                        </TabPanel>
                        <TabPanel header="Por cobrar">
                            <DuePaymentIncome />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    )

}

export default Entry

