import React, { memo } from 'react'
import { useDrag } from 'react-dnd'

function Picture({ item, url }) {
    const [{}, dragSourceRef] = useDrag(() => ({
        type: 'images',
        item: [item],
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

export default memo(Picture);
