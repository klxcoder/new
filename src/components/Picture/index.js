import React from 'react'
import { useDrag } from 'react-dnd'

function Picture({ id, url }) {
    const [collected, dragSourceRef, dragPreviewRef] = useDrag(() => ({
        type: 'images',
        item: {id},
        collect: (monitor) => {
            return {
                offset: monitor.getInitialClientOffset()
            }
        }
    }));

    return (
        <div>
            <img
                ref={dragSourceRef}
                src={url}
                width={100}
                height={100}
                style={{border:"1px solid black"}}
            />
            {/* {JSON.stringify(collected)} */}
        </div>
    )
}

export default Picture;
