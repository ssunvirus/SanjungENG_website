type BrowserTarget = Pick<
  Window,
  "location" | "history" | "addEventListener" | "removeEventListener"
>;

/** Observe committed browser URLs without suspending on router navigation promises. */
export function createBrowserLocationStore(target: BrowserTarget) {
  const listeners = new Set<() => void>();
  let cleanup: (() => void) | null = null;
  let queued = false;
  function notify() {
    if (queued || listeners.size === 0) return;
    queued = true;
    // Next.js may commit history in an insertion effect; notify after that commit.
    queueMicrotask(() => {
      queued = false;
      for (const listener of listeners) listener();
    });
  }
  function attach() {
    const { history } = target;
    const push = history.pushState;
    const replace = history.replaceState;
    function pushState(this: History, ...args: Parameters<History["pushState"]>) {
      const result = push.apply(this, args);
      notify();
      return result;
    }
    function replaceState(this: History, ...args: Parameters<History["replaceState"]>) {
      const result = replace.apply(this, args);
      notify();
      return result;
    }
    history.pushState = pushState;
    history.replaceState = replaceState;
    const events = ["popstate", "hashchange", "pageshow"];
    for (const event of events) target.addEventListener(event, notify);
    return () => {
      for (const event of events) target.removeEventListener(event, notify);
      // Do not replace wrappers installed later by the framework or another consumer.
      if (history.pushState === pushState) history.pushState = push;
      if (history.replaceState === replaceState) history.replaceState = replace;
    };
  }
  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!cleanup) cleanup = attach();
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          cleanup?.();
          cleanup = null;
        }
      };
    },
    pathname: () => target.location.pathname,
    page: () => target.location.pathname + target.location.search,
  };
}

let browserStore: ReturnType<typeof createBrowserLocationStore> | undefined;
function store() {
  return (browserStore ??= createBrowserLocationStore(window));
}
export const subscribeBrowserLocation = (listener: () => void) => store().subscribe(listener);
export const getBrowserPathname = () => store().pathname();
export const getBrowserPage = () => store().page();
export const getServerPathname = () => "/";
export const getServerPage = () => "";
