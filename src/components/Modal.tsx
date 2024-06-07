import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    formData: { name: string; mobile: string; location: string };
    textEditorContent: string;
    imageUrls: string[];
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, formData, textEditorContent, imageUrls }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Form Data</h2>
            <p>Name: {formData.name}</p>
            <p>Mobile: {formData.mobile}</p>
            <p>Location: {formData.location}</p>
            <p>Description: {textEditorContent}</p>
            {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} />
            ))}
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default CustomModal;