import React, { useState } from 'react'
import styles from './index.module.scss'
import { useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'
import Picture from '../Picture'

// 
// function getRndInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) ) + min;
// }

const summaryBoard = (board)  => board.map(icon => icon.pictureId);

function Body() {
    const [board, setBoard] = useState([])

    const [{ }, drop] = useDrop(() => ({
        accept: 'images',
        drop: ({pictureItem, pictureId}, monitor) => {
            const initial = monitor.getInitialSourceClientOffset()
            const differ = monitor.getDifferenceFromInitialOffset()
            let toado = {
                x: initial.x + differ.x,
                y: initial.y + differ.y
            }
            addImageToBoard(pictureItem, toado, pictureId)
        }
    }))

    const addImageToBoard = (pictureItem, toado, pictureId) => {
        setBoard(prev => {
            console.log('pictureId = ', pictureId);
            console.log('before filter prev = ', summaryBoard(prev));
            const newBoard = [...prev].filter(icon => icon.pictureId !== pictureId);
            // const newId = getRndInteger(11111, 99999);
            const newId = newBoard.length + 1000;
            console.log('newId = ', newId);
            return [...newBoard,
                { ...iconLibrary[pictureItem.id], toado, pictureId:newId }
            ]
        })
    }

    console.log('when render board = ', summaryBoard(board));

    return (
        <div className={styles.body} ref={drop} style={{ border: "" }}>

            <div>
                {
                    board.map((icon, index) => {
                        console.log('this is icon ', icon.pictureId);
                        return <div key={index} className={styles.iconImages} style={{ left: icon.toado.x, top: icon.toado.y }}>
                            <Picture pictureId={icon.pictureId} pictureItem={icon} url={icon.images} />
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