import React from 'react'
import Card from "../Cards/Cards"

const cardData = [
    {
        title: "Summary",
        text: "This is the Summary"
    },
    {
        title: "Employees",
        text: "Employee 1"
    },
    {
        title: "Managers",
        text: "Manager 1"
    },
    {
        title: "Timeline",
        text: "This is our Timeline"
    }
   
]

function Dashboard() {
    return (
        <div className='dashboard'>
            <h1>Dashboard Page</h1>
            {cardData.map((data) => {
                return (
                    <Card title={data.title} text={data.text} /> 
                )
            })}

        </div>
    )
}

export default Dashboard