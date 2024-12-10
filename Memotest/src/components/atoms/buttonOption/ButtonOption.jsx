const ButtonOption = ({ name, handleCreateBoard}) => {

    const actionOption = () => {
        handleCreateBoard(name);
    }

    return(
        <button type="button" onClick={actionOption}>{name}</button>
    );
}
export default ButtonOption;