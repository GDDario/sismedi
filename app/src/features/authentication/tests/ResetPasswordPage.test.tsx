// @ts-ignore
import {fullyRender} from "../../../../.jest/test-utils";
import {screen} from '@testing-library/react';
import {axe, toHaveNoViolations} from "jest-axe";
import ResetPasswordPage from "../pages/ResetPasswordPage.tsx";

expect.extend(toHaveNoViolations);

describe('Reset password page', () => {
    it('should load correctly', () => {
        fullyRender(<ResetPasswordPage />);

        const title = screen.getByRole('heading', {level: 1});
        const newPasswordField = screen.getByLabelText('Nova senha');
        const newPasswordConfirmationField = screen.getByLabelText('Confirmação da nova senha');
        const confirmButton = screen.getByRole('button', {name: /Redefinir/i});
        const cancelButton = screen.getByRole('button', {name: /Cancelar/i});

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Redefinir sua senha');
        expect(newPasswordField).toBeInTheDocument();
        expect(newPasswordField.getAttribute('placeholder')).toBe('*********');
        expect(newPasswordConfirmationField).toBeInTheDocument();
        expect(newPasswordConfirmationField.getAttribute('placeholder')).toBe('*********');
        expect(confirmButton).toBeInTheDocument();
        expect(confirmButton).toHaveTextContent('Redefinir');
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton).toHaveTextContent('Cancelar');
    });

    it('should have no accessibility violations', async () => {
        const {container} = fullyRender(<ResetPasswordPage/>);

        expect(await axe(container)).toHaveNoViolations();
    });
});