import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";

export function useToastNotification() {
    const currentSavedToastID = useRef<Id | undefined>(undefined);

    const notify = useCallback((msg: string) => {
        if (currentSavedToastID) {
            toast.dismiss(currentSavedToastID.current);
        }
        currentSavedToastID.current = toast(msg, {
            toastId: currentSavedToastID.current,
        });
    }, []);

    return { notify };
}
