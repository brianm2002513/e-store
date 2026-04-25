import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out forwards;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const FormBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid rgba(0,0,0,0.03);
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(0,0,0,0.02);
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}20;
    outline: none;
  }

  ${({ $invalid, theme }) => $invalid && `
    border-color: ${theme.colors.danger};
    background: ${theme.colors.surface};
    &:focus { box-shadow: 0 0 0 3px ${theme.colors.danger}20; }
  `}
`;

const CheckboxWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;

  input {
    accent-color: ${({ theme }) => theme.colors.accent};
    width: 1rem;
    height: 1rem;
  }
  
  label {
    margin-bottom: 0;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.smooth};
`;

const PrimaryBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecondaryBtn = styled(Button)`
  background: rgba(0,0,0,0.05);
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: rgba(0,0,0,0.1);
  }
`;

const Checkout = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        shippingAddress1: '',
        touched: { name: false, email: false, shippingAddress1: false }
    });

    const navigate = useNavigate();

    const errors = {
        name: form.name.length === 0,
        email: form.email.length === 0,
        shippingAddress1: form.shippingAddress1.length === 0
    };

    const disabled = Object.keys(errors).some((x) => errors[x]);

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleBlur = (ev) => {
        const { name } = ev.target;
        setForm(prev => ({
            ...prev,
            touched: { ...prev.touched, [name]: true }
        }));
    }

    const showError = field => errors[field] ? form.touched[field] : false;

    const handleSubmit = (ev) => {
        if (disabled) {
            ev.preventDefault();
            return;
        }
        navigate('/orderconfirmation');
    }

    return (
        <Container>
            <Title>Secure Checkout</Title>
            <form onSubmit={handleSubmit}>
                <FormBox>
                    <SectionTitle>Contact Details</SectionTitle>
                    <FormGroup>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            $invalid={showError("name")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="John Doe"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            $invalid={showError("email")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="john@example.com"
                        />
                    </FormGroup>

                    <SectionTitle style={{marginTop: '3rem'}}>Shipping</SectionTitle>
                    <CheckboxWrap>
                        <input type="checkbox" id="sameBilling" defaultChecked />
                        <label htmlFor="sameBilling">Billing address is same as shipping</label>
                    </CheckboxWrap>

                    <FormGroup>
                        <Label htmlFor="shippingAddress1">Address Line 1</Label>
                        <Input
                            id="shippingAddress1"
                            type="text"
                            name="shippingAddress1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            $invalid={showError("shippingAddress1")}
                            placeholder="123 Standard Way"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>City</Label>
                        <Input type="text" name="shippingCity" placeholder="London" />
                    </FormGroup>

                    <ActionRow>
                        <SecondaryBtn type="button" onClick={() => navigate("/basket")}>
                            Back to Cart
                        </SecondaryBtn>
                        <PrimaryBtn type="submit" disabled={disabled}>
                            Place Order
                        </PrimaryBtn>
                    </ActionRow>
                </FormBox>
            </form>
        </Container>
    )
}

export default Checkout;
