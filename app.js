(function () {
  const header = document.querySelector('header');

  if (!header || !document.querySelector('main') || !document.querySelector('footer')) {
    return;
  }

  const internalHtmlLink = (anchor) => {
    if (!anchor || !anchor.href) return false;
    const url = new URL(anchor.href, window.location.href);
    return (
      url.origin === window.location.origin &&
      !url.hash &&
      /\.html?$/.test(url.pathname) &&
      !anchor.hasAttribute('download') &&
      anchor.target !== '_blank'
    );
  };

  const closeMobileMenu = () => {
    const navList = document.querySelector('nav ul');
    const toggle = document.querySelector('.menu-toggle');
    if (!navList || !toggle) return;
    navList.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const initMobileMenu = () => {
    const toggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');
    if (!toggle || !navList) return;

    toggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navList.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        closeMobileMenu();
      }
    });
  };

  const setActiveLink = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach((link) => {
      const linkPath = new URL(link.href, window.location.href).pathname.split('/').pop() || 'index.html';
      link.classList.toggle('is-active', linkPath.toLowerCase() === currentPath.toLowerCase());
    });
  };

  const closeLightbox = () => {
    const lightbox = document.querySelector('.image-lightbox');
    if (lightbox) {
      lightbox.classList.remove('open');
    }
  };

  const initCreationGallery = () => {
    const gallery = document.querySelector('.products-grid');
    if (!gallery) return;

    let lightbox = document.querySelector('.image-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'image-lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-frame" role="dialog" aria-modal="true" aria-label="Product image details">
          <div class="lightbox-media">
            <img alt="Expanded product image">
          </div>
          <aside class="lightbox-details">
            <h2 class="lightbox-title"></h2>
            <p class="lightbox-caption">Click outside this panel or press Escape to close.</p>
          </aside>
        </div>
      `;
      document.body.appendChild(lightbox);

      lightbox.addEventListener('click', () => {
        closeLightbox();
      });

      lightbox.querySelector('.lightbox-frame')?.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }

    const lightboxImage = lightbox.querySelector('img');
    const titleField = lightbox.querySelector('.lightbox-title');

    gallery.querySelectorAll('.product-card img').forEach((image) => {
      image.addEventListener('click', () => {
        const card = image.closest('.product-card');
        const cardTitle = card?.querySelector('h3')?.textContent?.trim() || image.alt;
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        if (titleField) {
          titleField.textContent = cardTitle;
        }
        lightbox.classList.add('open');
      });
    });
  };

  const initializePageFeatures = () => {
    setActiveLink();
    initCreationGallery();
    closeMobileMenu();
  };

  const loadPage = async (url, push = true) => {
    const response = await fetch(url, { headers: { 'X-Requested-With': 'spa-nav' } });
    if (!response.ok) throw new Error('Failed to load page');

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const nextMain = doc.querySelector('main');
    const nextFooter = doc.querySelector('footer');
    const nextTitle = doc.querySelector('title');

    if (!nextMain || !nextFooter) {
      window.location.href = url;
      return;
    }

    const currentMain = document.querySelector('main');
    const currentFooter = document.querySelector('footer');

    if (!currentMain || !currentFooter) {
      window.location.href = url;
      return;
    }

    currentMain.replaceWith(nextMain);
    currentFooter.replaceWith(nextFooter);

    if (nextTitle) {
      document.title = nextTitle.textContent;
    }

    if (push) {
      history.pushState({}, '', url);
    }

    initializePageFeatures();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');
    if (!internalHtmlLink(anchor)) return;

    event.preventDefault();
    loadPage(anchor.href).catch(() => {
      window.location.href = anchor.href;
    });
  });


  document.addEventListener('click', (event) => {
    const navList = document.querySelector('nav ul');
    const toggle = document.querySelector('.menu-toggle');
    if (!navList || !toggle) return;
    if (!navList.classList.contains('nav-open')) return;
    if (event.target.closest('nav')) return;
    closeMobileMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMobileMenu();
    closeLightbox();
  });

  window.addEventListener('popstate', () => {
    loadPage(window.location.href, false).catch(() => {
      window.location.reload();
    });
  });

  initMobileMenu();
  initializePageFeatures();
})();
