import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'
import Picture from '../Picture'

function Body() {
    const [board, setBoard] = useState([])
    const [{}, drop] = useDrop(() => ({
        accept: 'images',
        drop: (item, monitor) => {
            let toado = monitor.getClientOffset()
            console.log(toado)
            addImageToBoard(item, toado)
        }
    }))
    const addImageToBoard = (item, toado) => {
        setBoard(prev => [...prev, 
            {...iconLibrary[item.id], toado}
        ])
    }
    return (
        <div className={styles.body} ref={drop} style={{border: ""}}>
            {
                board.map((icon, index) => {
                    return <div key={index} className={styles.iconImages} style={{left: icon.toado.x, top:icon.toado.y}}>
                        <Picture url={icon.images} />
                    </div>
                })
            }
        </div>
    )
}

export default Body;