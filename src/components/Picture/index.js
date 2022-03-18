import React, { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Picture({ left, right, pictureId, pictureItem, url, setBoard }) {
    const [{ }, dragSourceRef] = useDrag(() => ({
        type: 'images',
        item: { left, right, dragPictureItem:pictureItem, dragPictureId:pictureId },
    }));
    const [{ }, drop] = useDrop(() => ({
        accept: 'images',
        drop: ({dragPictureId, dragPictureItem}, monitor) => {
            console.log('drag = ', dragPictureId, dragPictureItem);
            console.log('drop = ', pictureId, pictureItem);
            const initial = monitor.getInitialSourceClientOffset()
            const differ = monitor.getDifferenceFromInitialOffset()
            if(initial) {
                let toado = {
                    x: initial.x + differ.x,
                    y: initial.y + differ.y
                }
                console.log({toado});
                // addImageToBoard(pictureItem, toado, pictureId, left, right)

                // Todo: process idAfterCrash here
                const idAfterCrash = 2;

                setBoard(prev => {
                    const newId = getRndInteger(11111, 99999);
                    return [...prev, { ...iconLibrary[idAfterCrash], toado, pictureId: newId }]
                });
            }
        }
    }));
    return (
        <div ref={drop}>
            <img
                ref={dragSourceRef}
                src={url}
            />
            {pictureId}
            {left?'left':''}
            {right?'right':''}
        </div>
    )
}

export default memo(Picture);
