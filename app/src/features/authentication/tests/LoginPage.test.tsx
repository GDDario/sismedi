import {render, screen} from '@testing-library/react';
import LoginPage from "../pages/LoginPage.tsx";
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Login page', () => {
    it('should load correctly', () => {
        render(<LoginPage/>);

        const title = screen.getByRole('heading', {level: 1})
        const loginInput = screen.getByRole('textbox', {name: 'Email ou RG'});
        const passwordInput = screen.getByLabelText(/Senha/i);
        const submitButton = screen.getByRole('button', {name: /Entrar/i});
        const forgotPasswordLink = screen.getByRole('link');

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Login');
        expect(loginInput).toBeInTheDocument();
        expect(loginInput.getAttribute('placeholder')).toBe('exemplo@email.com');
        expect(passwordInput.getAttribute('placeholder')).toBe('*******');
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveTextContent('Entrar');
        expect(forgotPasswordLink).toBeInTheDocument();
        expect(forgotPasswordLink).toHaveTextContent('Esqueci minha senha');
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(<LoginPage />);

        expect(await axe(container)).toHaveNoViolations();
    });
});