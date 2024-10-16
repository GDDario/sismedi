type FountItemsProps = {
    items: any[];
    onSelectItem: (item: any) => void;
};

const FoundItems = ({items, onSelectItem}: FountItemsProps) => {
    const handleSelectItem = (item: any): void => {
        console.log('Selected item', item)
    }

    return (
        <div className="absolute top-2 left-0 w-full">
            <ul>
                {
                    items.map((item: any, index: number) => {
                        return (
                            <li onClick={() => handleSelectItem(item)}>{item.text}</li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default FoundItems;