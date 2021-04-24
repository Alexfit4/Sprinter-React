import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
// import Window from "../Window/Window";
import ITEM_TYPE from "../../data/types";

const Item = ({ item, index, moveItem, status }) => {
	const ref = useRef(null);

   
   console.log(item.status);
    var arr = [];

    for(var i = 0; i < 5; i++){
      var obj = {};
      obj.status = status.status;
      arr.push(obj);
    }   
   

   




	const [, drop] = useDrop({
		accept: ITEM_TYPE,
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
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
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [show, setShow] = useState(false);

	const onOpen = () => setShow(true);


	const onClose = () => setShow(false);

	const clicked = (e) =>{
        console.log('clicked');
		console.log(e.target)
    }
   

	drag(drop(ref));

	return (
			
			<Fragment>
				<div
					ref={ref}
					style={{ opacity: isDragging ? 0 : 1 }}
					className={"item"}
					onClick={onOpen}
					onClick={clicked}
				>
					<div
						className={"color-bar"}
						style={{ backgroundColor: status.color }}
					/>
					<p className={"item-title"}>{item.title}</p>
					<p className={"item-content"}>{item.content}</p>
					<p className={"item-status"}>{item.icon}</p>
				</div>
				{/* <Window
                item={item}
                onClose={onClose}
                show={show}
            /> */}
			</Fragment>
		
	);
};

export default Item;
