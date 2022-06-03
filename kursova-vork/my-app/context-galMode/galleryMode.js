
import React, { createContext, useState } from 'react';

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {

    const [gallery, setGallery] = useState('default');

    const toggleGall = () => {
        if (gallery === 'default') {
            setGallery('galler')
        }
        else {
            setGallery('default')
        }
    }
    return (
        <GalleryContext.Provider
            value={{ gallery, toggleGall }}>
            {children}
        </GalleryContext.Provider>
    )
}
