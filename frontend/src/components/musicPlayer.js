const Player = () => {
  return (
    <div className="audioPlayer">
      <span className="material-symbols-outlined cursor-pointer">
        skip_previous
      </span>
      <span className="material-symbols-outlined cursor-pointer">
        skip_next
      </span>
      <span className="material-symbols-outlined cursor-pointer">
        play_arrow
      </span>
      <span className="material-symbols-outlined cursor-pointer">pause</span>
      <span className="material-symbols-outlined">volume_up</span>
      <span className="material-symbols-outlined">volume_down_alt</span>
      <span className="material-symbols-outlined">no_sound</span>
      <span className="material-symbols-outlined">volume_off</span>
    </div>
  );
};

export default Player;
