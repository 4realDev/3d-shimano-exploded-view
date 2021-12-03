import React, { useEffect, useState } from 'react';
import styles from './AccordionItem.module.css';
import cn from 'classnames';

type AccordionItem = {
	id: number;
	title: string;
	seats: number;
	area: number;
	height: number;
	children: React.ReactNode;
	selectedMeshes: string[];
	onClick: (id: number) => void;
	executeScroll: (id: number) => void;
	ref: any;
};

const AccordionItem = React.forwardRef<HTMLInputElement, AccordionItem>(
	({ id, title, seats, area, height, children, selectedMeshes, onClick, executeScroll }, ref) => {
		const [isActive, setIsActive] = useState<boolean>(false);
		// const myRef = useRef<null | HTMLDivElement>(null);

		const handleOnClick = (id: number) => {
			// setIsActive(!isActive);
			// executeScroll(ref);
			onClick(id);
		};

		// TODO: Find out why this is triggered as well on "handleOnClick"
		useEffect(() => {
			selectedMeshes.includes(`room_${id}`) && setIsActive(!isActive);
			// executeScroll(ref);
		}, [selectedMeshes]);

		return (
			<div ref={ref} className={styles.accordion_item}>
				{/* whenever we click on the link, it will navigate to what it matches as id */}
				<div className={styles.accordion_link} onClick={() => handleOnClick(id)}>
					<h4 className={styles.roomTitle}>{title}</h4>
					<h5 className={styles.roomDetail}>{seats}</h5>
					<h5 className={styles.roomDetail}>{area}</h5>
					<h5 className={styles.roomDetail}>{height}</h5>
				</div>
				<div
					className={cn(styles.answer, {
						[styles.answer_open]: isActive,
					})}
				>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nemo voluptates ratione nam minima sed ea
						voluptas natus laudantium, vel accusamus obcaecati aliquam nobis adipisci. Reiciendis tempora dolores vero
						a.
					</p>

					{children}
				</div>
			</div>
		);
	}
);

export default AccordionItem;
