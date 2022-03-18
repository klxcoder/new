import React, { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getIndex = (title) => {
    for(let index=0; index<iconLibrary.length; index++) {
        if(iconLibrary[index].title === title)
            return index;
    }
    return -1;
}

const getIdAfterCrash = (dragTitle, dropTitle) => {
    // fire + air = energy
    // fire + water = steam
    // fire + earth = lava
    // water + earth = mud
    // water + lava = obsidian
    // water + air = rain
    // air + earth = dust
    const obj = {}
    obj['fire' + 'air'] = 'energy'; obj['air' + 'fire'] = 'energy';
    obj['fire' + 'water'] = 'steam'; obj['water' + 'fire'] = 'steam';
    obj['fire' + 'earth'] = 'lava'; obj['earth' + 'fire'] = 'lava';
    obj['water' + 'earth'] = 'mud'; obj['earth' + 'water'] = 'mud';
    obj['water' + 'lava'] = 'obsidian'; obj['lava' + 'water'] = 'obsidian';
    obj['water' + 'air'] = 'rain'; obj['air' + 'water'] = 'rain';
    obj['air' + 'earth'] = 'dust'; obj['air' + 'earth'] = 'dust';
    const newTitle = obj[dragTitle + dropTitle];
    if(!newTitle) return -1;
    return getIndex(newTitle);
}

function Picture({ left, right, pictureId, pictureItem, url, setBoard }) {
    const [{ }, dragSourceRef] = useDrag(() => ({
        type: 'images',
        item: { left, right, dragPictureItem:pictureItem, dragPictureId:pictureId },
    }));
    const [{ }, drop] = useDrop(() => ({
        accept: 'images',
        drop: ({dragPictureId, dragPictureItem}, monitor) => {
            console.log('drag = ', dragPictureId, dragPictureItem.id, dragPictureItem.title, getIndex(dragPictureItem.title));
            console.log('drop = ', pictureId, pictureItem.id, pictureItem.title, getIndex(pictureItem.title));
            console.log('will = ', getIdAfterCrash(dragPictureItem.title, pictureItem.title));
            const initial = monitor.getInitialSourceClientOffset()
            const differ = monitor.getDifferenceFromInitialOffset()
            if(initial) {
                let toado = {
                    x: initial.x + differ.x,
                    y: initial.y + differ.y
                }
                console.log({toado});
                const idAfterCrash = getIdAfterCrash(dragPictureItem.title, pictureItem.title);
                if(idAfterCrash != -1) { // if collision occurs
                    setBoard(prev => {
                        const newId = getRndInteger(11111, 99999);
                        // add icon after collison to the board
                        const newBoard = [...prev, { ...iconLibrary[idAfterCrash], toado, pictureId: newId }];
                        // remove `drag icon` and remove `drop icon`
                        return newBoard.filter(icon => icon.pictureId !== dragPictureId && icon.pictureId !== pictureId);
                    });
                } else { // if collison not occur
                    // will move drag icon to new toado
                    setBoard(prev => {
                        const newBoard = [...prev].map(icon => {
                            if(icon.pictureId === dragPictureId) {
                                const newIcon = {...icon};
                                // change old toado to new toado
                                newIcon.toado = toado;
                                return newIcon;
                            }
                            return icon;
                        });
                        return newBoard;
                    })
                }
            }
        }
    }));
    return (
        <div ref={drop}>
            <img
                ref={dragSourceRef}
                src={url}
            />
            {pictureId}
            {left?'left':''}
            {right?'right':''}
        </div>
    )
}

export default memo(Picture);
