import React, {useEffect} from 'react'

export const useOnclickOutside = (ref, handler) => {

    useEffect(() => {
        const listener = (event) => {
            if(!ref.current || ref.current.contains(event.target)){
                return
            }
            handler();
            //handler : () => {setModalOpen(false)}
        }
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)
      return () => {
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

      }
    }, [])
}

export default useOnclickOutside;