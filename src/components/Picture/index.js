import React, { memo } from 'react'
import { useDrag } from 'react-dnd'

function Picture({ canStillDrag, pictureId, pictureItem, url }) {
    const [{}, dragSourceRef] = useDrag(() => ({
        type: 'images',
        item: {pictureItem, pictureId},
    }));
    return (
        <div>
            <img
                ref={dragSourceRef}
                src={url}
            />
            {pictureId}
        </div>
    )
}

export default memo(Picture);
