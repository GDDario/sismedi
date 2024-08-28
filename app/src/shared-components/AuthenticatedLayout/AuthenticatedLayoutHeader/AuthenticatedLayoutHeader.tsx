import DigitalClock from "./DigitalClock.tsx";

const AuthenticatedLayoutHeader = () => {
    const pageName = 'Gerenciamento de usuários';

    return (
        <header className="sticky top-0 w-full pr-20 bg-mainBackgroundBlue h-[13vh]">
            <div className="flex gap-4 justify-between items-end h-[13vh] pb-[3vh]">
                <h1 className="text-white font-bold">{pageName}</h1>

                <DigitalClock/>
            </div>
        </header>
    );
}

export default AuthenticatedLayoutHeader;