import DigitalClock from "./DigitalClock.tsx";

const AuthenticatedLayoutHeader = () => {
    const pageName = 'Gerenciamento de usuários';

    return (
        <header className="flex gap-4 justify-between">
            <h1 className="text-white font-bold">{pageName}</h1>

            <DigitalClock/>
        </header>
    );
}

export default AuthenticatedLayoutHeader;