type FormSectionheadingProps = {
    text: string;
};

const FormSectionHeading = ({text}: FormSectionheadingProps) => {
    return (
        <div className="w-full border-b-[1px] border-black pb-1 mb-2">
            <h2>{text}</h2>
        </div>
    );
}

export default FormSectionHeading;