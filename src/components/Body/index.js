import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'
import Picture from '../Picture'

function Body() {

    const [board, setBoard] = useState([])
    const [element, setElement] = useState([])
    // const [coordinates, setCoordinates] = useState({})

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'images',
        drop: (item, monitor) => {
            let toado = monitor.getClientOffset()
            addImageToBoard(item, toado)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    // let indexElement = 1;
    const addImageToBoard = (item, toado) => {
        
        
        setBoard(prev => [...prev, iconLibrary[item.id-1]])
        // setElement(state => {})
    }
    console.log(element);

    return (

        <div className={styles.body} ref={drop}>
            <div className={styles.iconImages}>
                {
                    board.map(icon => {
                        return <Picture url={icon.images} key={icon.id} />
                    })
                }
            </div>
        </div>
    )
}

export default Body;
