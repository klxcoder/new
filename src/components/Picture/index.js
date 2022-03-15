import React from 'react'
import { useDrag } from 'react-dnd'

function Picture({ id, url, style }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'images',
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        < img
            ref={drag}
            src={url}
            width='100px'
            height='100px'
        // style={styles}
        />
    )
}

export default Picture;
