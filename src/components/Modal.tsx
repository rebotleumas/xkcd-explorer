import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import ReactImageMagnify from '@blacklab/react-image-magnify';

export const Modal = ({ setIsOpen, imgSrc, heading }) => {
  useEffect(() => {
     document.body.style.overflow = 'hidden';
     return () => document.body.style.overflow = 'unset';
  }, []);
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal} data-cy="modal">
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{heading}</h5>
                      <button className={styles.closeBtn} onClick={() => setIsOpen(false)} data-cy="modal-close-button">
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
<path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
</svg>          </button>
          </div>
          <div className={styles.modalContent}>
            {<img src={imgSrc} className={styles.modalImage}/>}
          </div>
        </div>
      </div>
    </>
  );
};