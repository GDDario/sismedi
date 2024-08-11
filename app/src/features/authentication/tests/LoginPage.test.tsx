import {render, screen} from '@testing-library/react';
import LoginPage from "../pages/LoginPage.tsx";


describe('Login page', () => {
    beforeEach(() => {
        render(<LoginPage/>);
    });

    it('should load correctly', () => {
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
});