/**
 * Site Header Web Component
 * Static template to avoid loading issues during development
 */
class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Navbar: single source of truth -->
            <nav class="navbar navbar-expand-lg navbar-light bg-info">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="/images/image.jpg" height="36">
                        ElmoHikes
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        `;
    }
}
customElements.define('site-navbar', SiteNavbar);