import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextEditor from './TextEditor';
import CustomModal from './Modal';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
    location: Yup.string().required("Required"),
});

const ContactForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', location: '' });
  const [textEditorContent, setTextEditorContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTextEditorChange = (content:string, imageUrls: string[]) => {
    setTextEditorContent(content);
    setImageUrls(imageUrls);
  };

  return (
    <div>
      <h1>Contact form</h1>
      <Formik
        initialValues={{
          name: '',
          mobile: '',
          location: '',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values) => {
          setFormData(values);
          openModal();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>Enter your name: </label>
            <Field name="name" />
            {touched.name && errors.name && <div>{errors.name}</div>}
            <br />
            <br />
            <label>Enter your mobile number: </label>
            <Field name="mobile" />
            {touched.mobile && errors.mobile && <div>{errors.mobile}</div>}
            <br />
            <br />
            <label>Enter your locality: </label>
            <Field name="location" />
            {touched.location && errors.location && <div>{errors.location}</div>}
            <br />
            <br />
            <TextEditor onChange={handleTextEditorChange} />
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} formData={formData} textEditorContent={textEditorContent} imageUrls={imageUrls}/>
    </div>
  );
};

export default ContactForm;
