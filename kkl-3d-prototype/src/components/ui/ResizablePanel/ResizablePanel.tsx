// npm install --save react-resizable
// npm install --save @types/react-resizable

import React, { useState } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import cn from 'classnames';
import styles from './ResizablePanel.module.scss';
import { toggleIsResizedContentClosed, useDebugStore } from '../../../store/useDebugStore';

type ResizablePanelType = {
	children: React.ReactNode;
};

const ResizablePanel = ({ children }: ResizablePanelType) => {
	const { width, height } = useWindowDimensions();

	const resizeContentClosedHeight = 40;
	const resizeContentAutoCloseOrOpenBreakPoint = 230;
	const [dim, setDim] = useState({ width: 0, height: resizeContentAutoCloseOrOpenBreakPoint });
	const [resizeHandleTouched, setResizeHandleTouched] = useState(false);
	const isResizedContentClosed = useDebugStore((state) => state.isResizedContentClosed);

	const onResize = (event: React.SyntheticEvent, { node, size, handle }: ResizeCallbackData) => {
		setDim({ width: size.width, height: size.height });
	};
	const onResizeStart = (event: React.SyntheticEvent, { node, size, handle }: ResizeCallbackData) => {
		setResizeHandleTouched(true);
		// start resizing from the closed state
		if (size.height === resizeContentClosedHeight) {
			toggleIsResizedContentClosed(false);
		}
	};
	const onResizeStop = (event: React.SyntheticEvent, { node, size, handle }: ResizeCallbackData) => {
		setResizeHandleTouched(false);

		if (size.height < resizeContentAutoCloseOrOpenBreakPoint) {
			toggleIsResizedContentClosed(true);
			setDim({ width: size.width, height: resizeContentClosedHeight });
		} else setDim({ width: size.width, height: size.height });
	};
	return (
		<Resizable
			height={dim.height}
			width={dim.width}
			onResize={onResize}
			onResizeStart={onResizeStart}
			onResizeStop={onResizeStop}
			// handleSize={[10, 10]}
			// heightConstraints, widthConstraints
			minConstraints={[0, resizeContentClosedHeight]}
			maxConstraints={[0, height]}
			axis='y'
			handle={
				width <= 1440 && (
					<div className={cn([styles.resizeHandle], { [styles['resizeHandle--touched']]: resizeHandleTouched })} />
				)
			}
		>
			<div
				className={styles.resizeContent}
				style={{
					height: dim.height + 'px',
					transition: isResizedContentClosed ? 'all 0.2s' : '',
				}}
			>
				<div className={styles.resizeHandleBlurGradient} />
				{children}
			</div>
		</Resizable>
	);
};

export default ResizablePanel;
