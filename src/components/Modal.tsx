import React from 'react'

import styles from "./Modal.module.css"

interface Props {
    title: string;
    content: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal(props: Props) {
  const { title, content, isOpen, onClose } = props;

  const handleBackdropClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) onClose();
  }

  return (
        <>
            {isOpen && (
            <div className={styles.Backdrop} onClick={handleBackdropClick}>
                <div className={styles.Dialog}>
                    <div className={styles.Title}>{title}</div>
                    <div className={styles.Content}>{content}</div>
                    <button className={styles.CloseDialogButton} onClick={onClose}>❌</button>
                </div>
            </div>
        )}
    </>
  );
}
