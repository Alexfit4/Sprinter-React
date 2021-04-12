
import SprintsForms from '../Forms/FormSprints'
import React, { useState } from "react";
import Item from "../Item/Item";
import DropWrapper from "../DropWrapper/DropWrapper";
import SprintsCol from "../Col/SprintsCol";
import { data, statuses } from "../../data/index";
import "./index.css";
const Sprints = () => {

    const [items, setItems] = useState(data);

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [...newItems];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        });
    };



    return (

        <div className='sprints'>
            <SprintsForms />
            <div className={"row"}>
                {statuses.map(s => {
                    return (
                        <div key={s.status} className={"col-wrapper"}>
                            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                            <DropWrapper onDrop={onDrop} status={s.status}>
                                <SprintsCol>
                                    {items
                                        .filter(i => i.status === s.status)
                                        .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
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