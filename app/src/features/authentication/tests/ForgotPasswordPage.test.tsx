// @ts-ignore
import {fullyRender} from "../../../../.jest/test-utils";
import {screen} from '@testing-library/react';
import ForgotPasswordPage from "../pages/ForgotPasswordPage.tsx";
import {axe, toHaveNoViolations} from "jest-axe";

expect.extend(toHaveNoViolations);

describe('Forgot password page', () => {
    it('should load correctly', () => {
        fullyRender(<ForgotPasswordPage/>);

        const title = screen.getByRole('heading', {level: 1});
        const emailInput = screen.getByRole('textbox', {name: 'Email'});
        const sendButton = screen.getByRole('button', {name: /Enviar/i});
        const cancelButton = screen.getByRole('button', {name: /Cancelar/i});

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Esqueci minha senha');
        expect(emailInput).toBeInTheDocument();
        expect(emailInput.getAttribute('placeholder')).toBe('exemplo@email.com');
        expect(sendButton).toBeInTheDocument();
        expect(sendButton).toHaveTextContent('Enviar');
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton).toHaveTextContent('Cancelar');
    });

    it('should have no accessibility violations', async () => {
        const {container} = fullyRender(<ForgotPasswordPage/>);

        expect(await axe(container)).toHaveNoViolations();
    });
});