import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPE from "../../data/types";
import { RiDeleteBinLine } from "react-icons/ri"
import axios from "axios";


const Item = ({ item, index, moveItem, status, props }) => {
    const ref = useRef(null);
    const [items, setItems] = useState(item);
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;


        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { ...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })


    },
       );

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    drag(drop(ref));

    function deleteProject(projectId) {
        return axios.delete(`https://sprinter-v2.herokuapp.com/projects/${projectId}`)
    }

    async function handleClick(e) {

        var projectId = item.id
       
        const response = await deleteProject(projectId)

    }




    const styleDelete = {
        position: "relative",
        top: "-10",
        left: "140",
    };

    return (
        <Fragment>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
                onClick={onOpen}
            >
                <RiDeleteBinLine className="delete-icon" value={item.id} onClick={handleClick} style={styleDelete} />
                <div className={"color-bar"} style={{ backgroundColor: status.color }} />

                <p className={"item-title"}>{item.title}

                </p>
                <p className={"item-content"}>{item.content}</p>
                <p className={"item-status"}>{item.icon}</p>

            </div>
        </Fragment >
    );
};

export default Item;
