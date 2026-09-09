(() => {

      /* -------------------------------------------------------
         Mobile Navbar
      ------------------------------------------------------- */

      const toggleBtn = document.querySelector('.notion-navbar-toggle');
      const menu = document.querySelector('.notion-navbar-menu');
      const iconMenu = document.querySelector('.icon-menu');
      const iconClose = document.querySelector('.icon-close');
      const navLinks = document.querySelectorAll('.notion-nav-link');

      const closeMobileMenu = () => {
        if (!toggleBtn || !menu) return;

        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Buka navigasi');
        menu.classList.remove('is-open');

        if (iconMenu) iconMenu.style.display = 'block';
        if (iconClose) iconClose.style.display = 'none';
      };

      if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
          const isOpen =
            toggleBtn.getAttribute('aria-expanded') === 'true';

          toggleBtn.setAttribute(
            'aria-expanded',
            String(!isOpen)
          );

          toggleBtn.setAttribute(
            'aria-label',
            isOpen ? 'Buka navigasi' : 'Tutup navigasi'
          );

          menu.classList.toggle('is-open', !isOpen);

          if (iconMenu) {
            iconMenu.style.display = isOpen ? 'block' : 'none';
          }

          if (iconClose) {
            iconClose.style.display = isOpen ? 'none' : 'block';
          }
        });

        navLinks.forEach(link => {
          link.addEventListener('click', closeMobileMenu);
        });

        window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
            closeMobileMenu();
          }
        });
      }


      /* -------------------------------------------------------
         Scroll Reveal
      ------------------------------------------------------- */

      const revealElements =
        document.querySelectorAll('.reveal-element');

      if (!('IntersectionObserver' in window)) {
        revealElements.forEach(element => {
          element.classList.add('is-visible');
        });
      } else {
        const revealObserver = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
              }
            });
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
          }
        );

        revealElements.forEach(element => {
          revealObserver.observe(element);
        });
      }


      /* -------------------------------------------------------
         Back To Top
      ------------------------------------------------------- */

      const backToTopBtn =
        document.querySelector('.footer-back-to-top');

      if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }


      /* -------------------------------------------------------
         Active Navbar Link
      ------------------------------------------------------- */

      const sections = document.querySelectorAll('section[id]');
      const sectionLinks =
        document.querySelectorAll('.notion-nav-link');

      if ('IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) return;

              sectionLinks.forEach(link => {
                link.classList.toggle(
                  'active',
                  link.getAttribute('href') === `#${entry.target.id}`
                );
              });
            });
          },
          {
            rootMargin: '-35% 0px -55% 0px',
            threshold: 0
          }
        );

        sections.forEach(section => {
          navObserver.observe(section);
        });
      }

    })();

(() => {

  /* -------------------------------------------------------
     Project Modal — Studi Kasus dengan Copywriting Sales
  ------------------------------------------------------- */

  const projectData = {
    'chillmrkt2nd': {
      title: 'Platform E-Commerce & Sistem Verifikasi chillmrkt2nd',
      image: 'img/chillmrkt2nd.jpeg',
      problem: 'Membangun kepercayaan pelanggan pada keaslian produk barang bekas/vintage dan mempermudah proses negosiasi.',
      solution: 'Sistem verifikasi keaslian unik (nomor tag khusus), integrasi negosiasi via WhatsApp untuk konversi instan, dan UI/UX berkonsep streetwear.'
    },
    'beauty-consultation': {
      title: 'Sistem Manajemen Booking & Konsultasi',
      image: 'img/color.jpeg',
      problem: 'Penjadwalan konsultasi manual yang rentan bentrok dan pelacakan status pembayaran yang tidak efisien.',
      solution: 'Dashboard interaktif untuk manajemen jadwal otomatis, pelacakan status pembayaran real-time, dan antarmuka pengguna yang meningkatkan retensi klien.'
    },
    'kedai-woeloeng': {
      title: 'Website E-Menu & Sistem Delivery Kedai Woeloeng',
      image: 'img/kw.jpeg',
      problem: 'Membutuhkan platform digital mandiri untuk memfasilitasi pesanan delivery langsung guna menghindari potongan komisi aplikasi pihak ketiga.',
      solution: 'Desain UI appetizing (menggugah selera), sistem pemesanan terintegrasi, dan kalkulasi promo gratis ongkir berdasarkan radius.'
    },
    'kawungan-coffee': {
      title: 'Website Reservasi & Brand Storytelling Kawungan Coffee',
      image: 'img/kawungan.jpeg',
      problem: 'Kebutuhan untuk mengomunikasikan filosofi brand secara digital sekaligus menyederhanakan alur reservasi meja.',
      solution: 'Desain elegan yang menonjolkan elemen budaya lokal, fitur reservasi online mandiri, dan etalase menu premium.'
    },
    'banter-express': {
      title: 'Dashboard Operasional & Analitik Banter Express',
      image: 'img/banter.jpeg',
      problem: 'Kesulitan memantau performa kurir harian dan melacak pesanan serta alur kas secara real-time.',
      solution: 'Visualisasi data analitik (grafik order & pendapatan), live tracking metrik kurir, dan sistem rekapitulasi data otomatis.'
    },
    'jasun-marju': {
      title: 'Profil Digital & Portofolio Musisi Jasun Marju',
      image: 'img/jasun.jpeg',
      problem: 'Membutuhkan pusat informasi digital (EPK/Electronic Press Kit) yang profesional untuk menarik promotor dan label musik.',
      solution: 'Integrasi pemutar lagu Spotify langsung di website, galeri portofolio responsif, dan arsitektur informasi yang menonjolkan pencapaian karier.'
    }
  };

  const modalOverlay = document.querySelector('.project-modal-overlay');
  const modalImage = document.querySelector('.project-modal-image-wrapper img');
  const modalTitle = document.querySelector('.project-modal-title');
  const modalProblem = document.querySelector('.project-modal-problem');
  const modalSolution = document.querySelector('.project-modal-solution');
  const modalCloseBtn = document.querySelector('.project-modal-close');
  const projectCards = document.querySelectorAll('.portfolio-card[data-project]');

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !modalOverlay) return;

    if (modalImage) {
      modalImage.src = data.image;
      modalImage.alt = data.title;
    }
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalProblem) modalProblem.textContent = data.problem;
    if (modalSolution) modalSolution.textContent = data.solution;

    modalOverlay.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  const closeProjectModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      openProjectModal(card.getAttribute('data-project'));
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(card.getAttribute('data-project'));
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeProjectModal();
  });

})();
