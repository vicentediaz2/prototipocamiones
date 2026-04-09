const SIDEBAR_CONFIG = {
  brandIcon: "stack",
  itemIconClass: "sidebar__icon",
  itemBaseClass: "sidebar__item",
  activeModifier: "sidebar__item--active"
};

function SidebarItem({ item }) {
  const activeClass = item.active ? SIDEBAR_CONFIG.activeModifier : "";

  return (
    <li>
      <button className={`${SIDEBAR_CONFIG.itemBaseClass} ${activeClass}`.trim()} type="button" onClick={() => item.onSelect(item.id)}>
        <span className={SIDEBAR_CONFIG.itemIconClass}>
          <svg>
            <use href={`#icon-${item.icon}`}></use>
          </svg>
        </span>
        <span>{item.label}</span>
      </button>
    </li>
  );
}

export function Sidebar({ activeItemId, brandName, items, className, onItemSelect }) {
  return (
    <aside className={className}>
      <div className="sidebar__brand">
        <span className="sidebar__brand-icon">
          <svg>
            <use href={`#icon-${SIDEBAR_CONFIG.brandIcon}`}></use>
          </svg>
        </span>
        <span className="sidebar__brand-text">{brandName}</span>
      </div>
      <nav className="sidebar__nav" aria-label="Navegacion principal">
        <ul className="sidebar__list">
          {items.map((item) => (
            <SidebarItem key={item.id} item={{ ...item, active: item.id === activeItemId, onSelect: onItemSelect }} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
