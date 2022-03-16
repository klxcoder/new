import React, { useState } from 'react'
import styles from './index.module.scss'
import { useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'
import Picture from '../Picture'

function Body() {
    const [board, setBoard] = useState([])

    const [{ }, drop] = useDrop(() => ({
        accept: 'images',
        drop: (item, monitor) => {
            const initial = monitor.getInitialSourceClientOffset()
            const differ = monitor.getDifferenceFromInitialOffset()
            let toado = {
                x: initial.x + differ.x,
                y: initial.y + differ.y
            }

            addImageToBoard(item, toado)
        }
    }))

    const addImageToBoard = (item, toado) => {
        setBoard(prev => [...prev,
        { ...iconLibrary[item[0].id], toado }
        ])
    }

    console.log(board);

    return (
        <div className={styles.body} ref={drop} style={{ border: "" }}>

            <div>
                {
                    board.map((icon, index) => {
                        return <div key={index} className={styles.iconImages} style={{ left: icon.toado.x, top: icon.toado.y }}>
                            <Picture url={icon.images} />
                        </div>
                    })
                }
            </div>
            <div className={styles.btnBox}>
                <div className={styles.heading}>
                    <div className={styles.btnFullscreen}></div>
                    <a href="http://j.mp/zQO1Ac" className={styles.title}>Little Alchemy 2 is out nows!</a>
                </div>

                <div className={styles.footer}>
                    <div className={styles.progress}>{board.length}/580</div>
                    <div className={styles.clearWorkspace}></div>
                </div>
            </div>

        </div>
    )
}

export default Body;