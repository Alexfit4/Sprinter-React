
import SprintsForms from '../Forms/FormSprints'
import React, { useState, useEffect } from "react";
import Item from "../Item/Item";
import DropWrapper from "../DropWrapper/DropWrapper";
import SprintsCol from "../Col/SprintsCol";
import { data, statuses } from "../../data/index";
import "./index.css";
import axios from "axios";

const Sprints = () => {

    const [items, setItems] = useState();

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [...newItems];
        });
        console.log("this is", status)
        console.log("this is item", item)
        axios.put(`http://localhost:5000/projects/${item.id}`, {
            title: item.title,
            description: item.content,
            status: status
        }).then(data => { console.log(data) })
            .catch(err => { console.log(err) })
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        });
    };

    const getSprints = () => {

        axios.get("http://localhost:5000/projects")
            .then(sprints => {
                console.log(sprints.data)

                const results = sprints.data.map(sprint => {
                    let description;
                    let status;
                    if (!sprint.description) {
                        description = ""
                    } else {
                        description = sprint.description[0]
                    }

                    if (!sprint.status) {
                        status = "open"
                    } else {
                        status = sprint.status
                    }

                    return {
                        id: sprint._id,
                        // icon: "⭕️",
                        status: status,
                        title: sprint.title,
                        content: description,
                    }
                })
                console.log(results)
                setItems(results)
            }).catch(error => {
                console.log(error)
            })

        console.log(items)
        console.log(statuses)
    }



    useEffect(getSprints, [])




    return (

        <div className='sprints'>
            <SprintsForms getSprints={getSprints} />
            <div className={"row"}>
                {statuses.map(s => {
                    return (
                        <div key={s.status} className={"col-wrapper"}>
                            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                            <DropWrapper onDrop={onDrop} status={s.status}>
                                <SprintsCol>
                                    {items ? items
                                        .filter(i => i.status === s.status)
                                        .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                        : null

                                    }
                                </SprintsCol>
                            </DropWrapper>
                        </div>
                    );
                })}
            </div>













        </div>
    )
};

export default Sprints;