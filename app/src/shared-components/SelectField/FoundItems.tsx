type FountItemsProps = {
    items: any[];
    onSelectItem: (item: any) => void;
};

const FoundItems = ({items, onSelectItem}: FountItemsProps) => {
    return (
        <div className="absolute top-[100%] min-w-[195px] z-10">
            {items.length > 0 &&
                <ul className="py-2 flex flex-col bg-mainBackgroundBlue w-full">
                    {
                        items.map((item: any, index: number) => {
                            return (
                                <li
                                    key={item.uuid}
                                    className="w-full text-mainWhite cursor-pointer hover:bg-mainDarkBlue px-2"
                                    onClick={() => onSelectItem(item)}>{item.label}</li>
                            );
                        })
                    }
                </ul>
            }
        </div>
    );
};

export default FoundItems;