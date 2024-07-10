/* Ajhar-pdfModal.jsx-10-07-2024-lineNo-1-to-28 */


import React from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root'); // Set the root element for accessibility

const PdfModal = ({ isOpen, closeModal, pdfContent }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="PDF Modal"
      className="pdf-modal"
    >
      <div>
        <button onClick={closeModal}>Close</button>
        
        <embed src={pdfContent} type="application/pdf" width="100%" height="500px" />
        
      </div>
    </Modal>
  );
};

export default PdfModal;