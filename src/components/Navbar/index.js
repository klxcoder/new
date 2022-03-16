import React, { useEffect, useState } from 'react';
import styles from './index.styles.module.scss';
import { characters } from '../../services/characters';
import { iconLibrary } from '../../services/iconLibrary';
import Picture from '../Picture'

function Navbar() {
   
    
    return (
        <div className={styles.navbar}>
           
            <ul className={styles.boxCharacters}>
                {characters.map((character, index) => (
                    <li key={index} className={styles.character}>
                        {character}
                    </li>
                ))}
            </ul>

            <ul className={styles.libraryIconBox}>
                {iconLibrary.map((icon) => (
                    <li key={icon.id}>
                        <div className={styles.iconImages}>
                            <Picture url={icon.images} item={icon} />
                        </div>
                        <span className={styles.title}>{icon.title}</span>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Navbar;
