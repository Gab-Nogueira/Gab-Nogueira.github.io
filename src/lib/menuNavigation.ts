interface MenuActions {
  setOpen: (open: boolean) => void;
  lock: (locked: boolean) => void;
  navigate: (href: string) => void;
  focusTrigger: () => void;
  schedule: (callback: () => void) => number;
  cancel: (frame: number) => void;
}

export function createMenuNavigation(actions: MenuActions) {
  let open = false;
  let locked = false;
  let pendingSection: string | null = null;
  let frame = 0;
  const changeOpen = (next: boolean) => {
    open = next; actions.cancel(frame);
    if (next) { pendingSection = null; locked = true; actions.lock(true); }
    actions.setOpen(next);
  };
  return {
    changeOpen,
    select: (href: string) => { pendingSection = href; changeOpen(false); },
    complete: (next: boolean) => {
      if (next || open || !locked) return;
      locked = false;
      actions.lock(false);
      const href = pendingSection; pendingSection = null;
      actions.cancel(frame);
      frame = actions.schedule(() => { if (!open) { if (href) actions.navigate(href); else actions.focusTrigger(); } });
    },
    dispose: () => { actions.cancel(frame); pendingSection = null; open = false; locked = false; actions.lock(false); },
  };
}
