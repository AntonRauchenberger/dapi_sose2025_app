import React, {
    createContext,
    useContext,
    useState,
    PropsWithChildren,
} from "react";

type RecordContextType = {
    isRecording: boolean;
    setIsRecording: any;
};

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export function useRecord() {
    const context = useContext(RecordContext);
    if (!context) {
        throw new Error("useRecord must be used within a RecordProvider");
    }
    return context;
}

export function RecordProvider({ children }: PropsWithChildren) {
    const [isRecording, setIsRecording] = useState<boolean>(false);

    return (
        <RecordContext.Provider value={{ isRecording, setIsRecording }}>
            {children}
        </RecordContext.Provider>
    );
}
