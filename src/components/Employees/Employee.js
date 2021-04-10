import React from 'react';
import TableComponents from "../Table"
import {FormEmployeeData} from '../Forms/FormEmployeeData.js'
import Forms from '../Forms/Form'

function Employee() {
    return (
        <div className='employee'>
            <h1>Employee Page</h1>
            <TableComponents/>
            {FormEmployeeData.map((data) => {
                return (
                    <Forms
                     first={data.first}
                     last={data.last}
                     role={data.title} 
                     project={data.project}
                     email={data.email}
                     password={data.password}                    
                     />
                )
            })}
        </div>
    )
}

export default Employee