// // routes.ts
// function loadPage(route: string) {
//     const contentURL = `${route}.html`;
//     fetch(contentURL)
//         .then((response) => response.text())
//         .then((html) => {
//             document.getElementById('content').innerHTML = html;
//         })
//         .catch(() => {
//             document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
//         });
// }
// function handleRouteChange() {
//     const currentRoute = window.location.pathname;
//     const routeMapping: { [key: string]: string } = {
//         '/': 'index',
//         '/about': '/pages/about',
//         '/work': '/pages/work',
//         '/other': '/pages/other',
//     };
//     const contentFile = routeMapping[currentRoute] || 'not-found';
//     loadPage(contentFile);
// }
// // Handle initial route and changes when back/forward buttons are used.
// window.addEventListener('popstate', handleRouteChange);
// handleRouteChange();
