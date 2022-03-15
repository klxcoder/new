import React from 'react'
import { useDrag } from 'react-dnd'

function Picture({ id, url }) {
    const [{}, dragSourceRef, dragPreviewRef] = useDrag(() => ({
        type: 'images',
        item: {id},
    }));

    return (
        <div>
            <img
                ref={dragSourceRef}
                src={url}
            />
        </div>
    )
}

export default Picture;
