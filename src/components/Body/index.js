import React, { useState } from 'react'
import styles from './index.module.scss'
import { useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'
import Picture from '../Picture'


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const summaryBoard = (board) => board.map(icon => icon.pictureId);

function Body() {
    const [board, setBoard] = useState([])

    const [{ }, drop] = useDrop(() => ({
        accept: 'images',
        drop: ({ left, right, pictureItem, pictureId }, monitor) => {
            const initial = monitor.getInitialSourceClientOffset()
            const differ = monitor.getDifferenceFromInitialOffset()
            let toado = {
                x: initial.x + differ.x,
                y: initial.y + differ.y
            }
            addImageToBoard(pictureItem, toado, pictureId, left, right)
        }
    }))

    const addImageToBoard = (pictureItem, toado, pictureId, left, right) => {
        setBoard(prev => {
            // if drag from left => will move
            if(left) {
                const newBoard = [...prev].map(icon => {
                    if(icon.pictureId === pictureId) {
                        const newIcon = {...icon};
                        newIcon.toado = toado;
                        return newIcon;
                    }
                    return icon;
                });
                return newBoard;
            }
            // if drag from right => will add
            if (right) {
                const newId = getRndInteger(11111, 99999);
                return [...prev, { ...iconLibrary[pictureItem.id], toado, pictureId: newId }]
            }
            return prev;
        })
    }

    return (
        <div className={styles.body} ref={drop} style={{ border: "" }}>

            <div>
                {
                    board.map((icon, index) => {
                        return <div key={index} className={styles.iconImages} style={{ left: icon.toado.x, top: icon.toado.y }}>
                            <Picture left={true} pictureId={icon.pictureId} pictureItem={icon} url={icon.images} />
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