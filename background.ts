import browser from "webextension-polyfill";

browser.webNavigation.onBeforeNavigate.addListener((details) => {
  let _uri = new URL(details.url)

  console.log(details, _uri)

  /** 
    hash: ""​
    host: "staging.bsky.app"​
    hostname: "staging.bsky.app"​
    href: "https://staging.bsky.app/profile/hikango.bsky.social"​
    origin: "https://staging.bsky.app"​
    password: ""​
    pathname: "/profile/hikango.bsky.social"​
    port: ""​
    protocol: "https:"​
    search: "?x=1&y=2"​
    searchParams: URLSearchParams(0)
    username: ""
  */

  if(details.parentFrameId === -1 && _uri.hostname === 'bsky.app') {
    console.log('Matched!', _uri)

    browser.tabs.update(details.tabId, {
        url: `${_uri.protocol}//staging.${_uri.hostname}${_uri.pathname}`
    });
  }
});