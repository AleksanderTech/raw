export function navigateTo(url) {
    history.pushState(null, null, url);
    handleRoute(url);
}

function handleRoute(route) {
    const appElement = document.getElementById('app');

    if (route == '/') {
        appElement.innerHTML = '<home-page></home-page>';
        return
    }

    if (route == '/about') {
        appElement.innerHTML = '<about-page></about-page>';
        return
    }

    if(route.endsWith('index.html')) {
        appElement.innerHTML = '<home-page></home-page>';
        return
    }
      
    appElement.innerHTML = '<lost-page></lost-page>';
}

export function router() {
    window.onpopstate = () => {
        handleRoute(window.location.pathname);
    }

    handleRoute(window.location.pathname);
}

router()
