const ICON_CONFIG = {
  spriteClassName: "icon-sprite"
};

export function IconSprite() {
  return (
    <svg className={ICON_CONFIG.spriteClassName} aria-hidden="true" focusable="false">
      <symbol id="icon-stack" viewBox="0 0 24 24">
        <path d="M12 3 4 7l8 4 8-4-8-4Z"></path>
        <path d="m4 12 8 4 8-4"></path>
        <path d="m4 16 8 4 8-4"></path>
      </symbol>
      <symbol id="icon-grid" viewBox="0 0 24 24">
        <rect x="4" y="4" width="6" height="6" rx="1"></rect>
        <rect x="14" y="4" width="6" height="6" rx="1"></rect>
        <rect x="4" y="14" width="6" height="6" rx="1"></rect>
        <rect x="14" y="14" width="6" height="6" rx="1"></rect>
      </symbol>
      <symbol id="icon-truck" viewBox="0 0 24 24">
        <path d="M3 7h11v8H3z"></path>
        <path d="M14 10h3l3 3v2h-6z"></path>
        <circle cx="7" cy="18" r="2"></circle>
        <circle cx="17" cy="18" r="2"></circle>
      </symbol>
      <symbol id="icon-wifi" viewBox="0 0 24 24">
        <path d="M4.9 9.4a12 12 0 0 1 14.2 0"></path>
        <path d="M7.8 12.6a8 8 0 0 1 8.4 0"></path>
        <path d="M10.9 15.7a3.5 3.5 0 0 1 2.2 0"></path>
        <circle cx="12" cy="19" r="1.2"></circle>
      </symbol>
      <symbol id="icon-alert" viewBox="0 0 24 24">
        <path d="M12 4 3.8 19h16.4L12 4Z"></path>
        <path d="M12 9v5"></path>
        <circle cx="12" cy="17" r="1"></circle>
      </symbol>
      <symbol id="icon-report" viewBox="0 0 24 24">
        <path d="M6 3h8l4 4v14H6z"></path>
        <path d="M14 3v4h4"></path>
        <path d="M9 12h6"></path>
        <path d="M9 16h4"></path>
      </symbol>
      <symbol id="icon-settings" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9c0 .7.4 1.3 1 1.5h.2a2 2 0 0 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1Z"></path>
      </symbol>
      <symbol id="icon-search" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="6"></circle>
        <path d="m20 20-4.2-4.2"></path>
      </symbol>
      <symbol id="icon-chevron" viewBox="0 0 24 24">
        <path d="m9 6 6 6-6 6"></path>
      </symbol>
      <symbol id="icon-calendar" viewBox="0 0 24 24">
        <rect x="4" y="5" width="16" height="15" rx="2"></rect>
        <path d="M8 3v4"></path>
        <path d="M16 3v4"></path>
        <path d="M4 10h16"></path>
      </symbol>
      <symbol id="icon-bell" viewBox="0 0 24 24">
        <path d="M15 17H5l2-2v-4a5 5 0 1 1 10 0v4l2 2h-4"></path>
        <path d="M10 19a2 2 0 0 0 4 0"></path>
      </symbol>
      <symbol id="icon-menu" viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="1.5"></circle>
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="12" cy="19" r="1.5"></circle>
      </symbol>
    </svg>
  );
}
