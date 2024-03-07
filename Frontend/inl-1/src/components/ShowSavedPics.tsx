interface ShowSavedPicsProps {
  stateChanger: (value: boolean) => void;
}

export const ShowSavedPics: React.FC<ShowSavedPicsProps> = ({
  stateChanger,
}) => {
  return (
    
    <a onClick={() => stateChanger(true)}>
      <p>Saved Images</p>
    </a>
  );
};
