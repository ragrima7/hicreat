'use strict';

document.addEventListener('DOMContentLoaded', function() {

  // ローディング画面の処理
  const loading = document.getElementById('loading');
  const content = document.getElementById('wrapper');
  if (loading && content) {
    function showLoading() {
      loading.style.display = 'flex';
      content.classList.remove('show_body');
    }

    function hideLoading() {
      loading.style.display = 'none';
      content.classList.add('show_body');
    }

    showLoading();
    setTimeout(hideLoading, 3000);
  }

  // モーダルの処理
  const MODAL_DATA = {
    santai: {
      img: 'images/sentai.gif',
      title: '戦隊レンジャー！',
      description: '動く紙芝居のようでワクワク感あり。テキストで手を動かしながらHTML/CSSを学びつつ、講師ご提供の課題に早速チャレンジ。マークアップの基本、CSSでの重なりを考えつつ組み立て。アニメーションの動きを加える。最初は戸惑うが動きもあるので楽しい演習。',
      hours: [
        '学んだこと',
        'HTML: 基本セット・タグ付け',
        'HTML: 画像リンク',
        'CSS : 要素の重なり',
        'CSS : 各レンジャーの配置',
        'CSS : アニメーション',
        '所要時間：１０時間'
      ]
    },
    kuku: {
      img: 'images/kukuCss.png',
      title: '九九表：HTML/CSSで表現',
      description: 'tableタグを使って九九表の作成。書き方や見出し・列・行・など揃えるための指定方法を練習',
      hours: [
        '学んだこと',
        'HTML: table関連のタグ',
        'HTML: 入力の順番',
        'CSS : 見出し表の揃え方',
        '所要時間：３時間'
      ]
    },
    kukuJs: {
      img: 'images/kukuJs.png',
      title: '九九表をJavaScriptで制作',
      description: 'JavaScriptで九九表を作成。データ数が多くなったり変数対応などあらゆるところで必須なスクリプト。',
      hours: [
        '学んだこと',
        'Javascript: 九九表の計算と返り値のCSS対応',
        'Javascript: for文　for (let i = 1; i <= 9; i++)',
        'jQuery: 上記をライブラリを使用してみる',
        '所要時間：１０時間'
      ]
    },
    cardRF: {
      img: 'images/cardRF.png',
      title: 'カード画像を並べ「ロイヤルストレートフラッシュ！」',
      description: '要素配置について理解を深めた演習。様々な要素、親子関係、配置、大きさなどフレックスやグリッドを「どのように使ったら、どう表示されるか」を学ぶ。',
      hours: [
        '学んだこと',
        'CSS: フレックスボックス',
        'CSS: grid',
        'CSS: スタッキングコンテキスト（重なり順序と支配関係）',
        '所要時間：１８時間'
      ]
    }
  };

  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    const modalImg = overlay.querySelector('.modal-img');
    const modalTitle = overlay.querySelector('.modal-title');
    const modalDesc = overlay.querySelector('.modal-description');
    const modalHours = overlay.querySelector('.modal-hours');
    const closeBtn = overlay.querySelector('.modal-close');

    document.querySelectorAll('.js-modal-trigger').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const key = btn.dataset.modal;
        const d = MODAL_DATA[key];
        if (!d) return;

        modalTitle.textContent = d.title;
        modalImg.src = d.img;
        modalImg.alt = d.title;
        modalDesc.textContent = d.description;
        modalHours.innerHTML = d.hours.map(t => `<li>${t}</li>`).join('');
        overlay.classList.add('active');
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 700);
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if (overlay.classList.contains('active') && e.key === 'Escape') closeModal();
    });
  }

  // ドロワーと「TOPに戻る」ボタンの処理
  const openNav = document.getElementById('open_nav');
  const nav = document.getElementById('nav');
  if (openNav && nav) {
    const closeNav = document.getElementById('batu');
    const close_nav = document.getElementsByClassName('close');

    openNav.addEventListener('click', function() {
      nav.classList.add('show');
      nav.classList.remove('show_reverse');
    });

    closeNav.addEventListener('click', function() {
      nav.classList.remove('show_reverse');
      nav.classList.add('show_reverse');
    });

    Array.from(close_nav).forEach(function(el) {
      el.addEventListener('click', function() {
        nav.classList.remove('show');
        nav.classList.add('show_reverse');
      });
    });

    window.addEventListener('scroll', function() {
      if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        nav.classList.add('show_reverse');
      }
    });
  }

  const backToTopButton = document.querySelector('.back-to-top');
  const footer = document.querySelector('footer');
  if (backToTopButton && footer) {
    const appearanceThreshold = 667;

    function handleScroll() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      const footerRect = footer.getBoundingClientRect();
      const isFooterVisible = footerRect.top < window.innerHeight;

      if (scrollY > appearanceThreshold && !isFooterVisible) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  const stickyHeader = document.querySelector('#stickyHeader');
  if (stickyHeader) {
    const rect = stickyHeader.getBoundingClientRect();
  }
});