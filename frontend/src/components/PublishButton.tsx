interface PublishButtonType {
    isSelected: boolean | undefined;
    handleToggleSelect: (e: React.MouseEvent)=>Promise<void>
}

export const PublishButton = ({isSelected, handleToggleSelect}: PublishButtonType) => {

    return <div>
        <button type="button" onClick={handleToggleSelect} className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${isSelected ? "bg-red-600 hover:bg-red-800" : "bg-green-600 hover:bg-green-800"}`}>{isSelected ? "Private": "Publish"}</button>
    </div>
}