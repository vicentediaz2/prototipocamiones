const TOPBAR_CONFIG = {
  trafficDots: ["teal", "red"],
  utilityIcons: ["calendar", "bell"],
  searchIcon: "search",
  dropdownIcon: "chevron"
};

export function Topbar({ header }) {
  return (
    <header className="topbar">
      <div className="topbar__window">
        <div className="topbar__window-meta">
          {TOPBAR_CONFIG.trafficDots.map((tone) => (
            <span key={tone} className={`topbar__dot topbar__dot--${tone}`}></span>
          ))}
          <span>{header.windowTitle}</span>
        </div>
        <div className="topbar__window-controls">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="topbar__main">
        <h1 className="topbar__title">{header.sectionTitle}</h1>
        <div className="topbar__actions">
          <label className="topbar__search">
            <input type="search" placeholder={header.searchPlaceholder} />
            <svg>
              <use href={`#icon-${TOPBAR_CONFIG.searchIcon}`}></use>
            </svg>
          </label>
          <div className="topbar__user">
            <span className="topbar__avatar"></span>
            <div className="topbar__user-copy">
              <strong>{header.userName}</strong>
              <span>({header.userRole})</span>
              <small>{header.scheduleLabel}</small>
            </div>
{/*             <svg className="topbar__dropdown">
              <use href={`#icon-${TOPBAR_CONFIG.dropdownIcon}`}></use>
            </svg> */}
          </div>
{/*           <div className="topbar__utilities">
            {TOPBAR_CONFIG.utilityIcons.map((iconId) => (
              <button key={iconId} className="topbar__utility" type="button" aria-label={iconId}>
                <svg>
                  <use href={`#icon-${iconId}`}></use>
                </svg>
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </header>
  );
}
