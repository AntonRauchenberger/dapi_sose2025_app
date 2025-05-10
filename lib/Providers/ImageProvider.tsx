import { createContext, useContext, useState } from "react";

const ImageContext = createContext(null);

export function ImageProvider({ children }) {
    const [imageUri, setImageUri] = useState(null);
    const [isGaleryMode, setIsGaleryMode] = useState(true);
    const [showCamera, setShowCamera] = useState(false);

    return (
        <ImageContext.Provider
            value={{
                imageUri,
                setImageUri,
                isGaleryMode,
                setIsGaleryMode,
                showCamera,
                setShowCamera,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
}

export const useImageContext = () => useContext(ImageContext);
