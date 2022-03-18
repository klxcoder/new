import React, { memo } from 'react'
import { useDrag } from 'react-dnd'

function Picture({ left, right, pictureId, pictureItem, url }) {
    const [{ }, dragSourceRef] = useDrag(() => ({
        type: 'images',
        item: { left, right, pictureItem, pictureId },
    }));
    return (
        <div>
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
