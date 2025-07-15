import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, rgb(93, 99, 107) 0%, #4a4946 100%);
`;

const ContactCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactFormSection = styled.div`
  padding: 3rem;
`;

const ContactInfoSection = styled.div`
  padding: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;
const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  height: 48px;
  background-color: #fff;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: white;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Icon = styled.div`
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const StatusMessage = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${props => props.error ? '#e74c3c' : '#2ecc71'};
  font-weight: 500;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    department: ''
  });
  const [status, setStatus] = useState({ message: '', error: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: 'Sending...', error: false });

    try {
      //console.log("formData",formData)
      const response = await axios.post('http://localhost:5000/contact', formData);

      if (response.status === 200) {
        setStatus({ message: 'Message sent successfully!', error: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ message: 'Failed to send message.', error: true });
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus({
        message: error.response?.data?.message || 'Server error. Try again later.',
        error: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <ContactCard>
        <ContactFormSection>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title>Get In Touch</Title>
            <Subtitle>Have a question or want to work together?</Subtitle>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                />
              </FormGroup>
        

              <FormGroup>
                <Label htmlFor="message">Your Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                  disabled={isSubmitting}
                />
              </FormGroup>


              <SubmitButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>

              {status.message && (
                <StatusMessage error={status.error}>
                  {status.message}
                </StatusMessage>
              )}
            </form>
          </motion.div>
        </ContactFormSection>

        <ContactInfoSection>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InfoTitle>Contact Information</InfoTitle>

            <InfoItem>
              <Icon>✉️</Icon>
              <span>fekirengida@gmail.com</span>
            </InfoItem>

            <InfoItem>
              <Icon>📱</Icon>
              <span>+251 (994) 949-492</span>
            </InfoItem>

            <InfoItem>
              <Icon>🔗</Icon>
              <span>linkedin.com/in/FekremariamEngida</span>
            </InfoItem>

            <InfoItem>
              <Icon>🐙</Icon>
              <span>github.com/FekremariamE</span>
            </InfoItem>
          </motion.div>
        </ContactInfoSection>
      </ContactCard>
    </ContactContainer>
  );
};

export default Contact;