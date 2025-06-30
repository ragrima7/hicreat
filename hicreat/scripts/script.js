'use strict';

//loading　佐藤さん提供
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('wrapper')

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
});

//モーダルここから　台南ページでの流用も考慮。とりあえず、配列風オブジェクトでマッピング（エクセル表みたいな考えで）みたいに格納。
//町田先生からのご教示をヒント（流用できる部分は別ファイル化）にテキストも.jsファイルに記載。
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

// 画面の開閉を定義
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('modal-overlay');
  const modalImg = overlay.querySelector('.modal-img');
  const modalTitle = overlay.querySelector('.modal-title');
  const modalDesc = overlay.querySelector('.modal-description');
  const modalHours = overlay.querySelector('.modal-hours');
  const closeBtn = overlay.querySelector('.modal-close');

  // 開く動作
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

  // 閉じる動作
  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 700);
  }


  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) closeModal();
  });
  
  // Escキーでも閉じる（だれかのネット情報から流用）
  document.addEventListener('keydown', function(e){
    if(overlay.classList.contains('active') && e.key === 'Escape') closeModal();
  });
});

//ドロワーnavi　佐藤さんご提供
// ドロワー
document.addEventListener('DOMContentLoaded', function () {
  const openNav = document.getElementById('open_nav');
  const nav = document.getElementById('nav');
  const closeNav = document.getElementById('batu');
  const close_nav = document.getElementsByClassName('close');

  openNav.addEventListener('click', function () {
    nav.classList.add('show');
    nav.classList.remove('show_reverse');
  });

  closeNav.addEventListener('click', function () {
    nav.classList.remove('show_reverse');
    nav.classList.add('show_reverse');
  });

  Array.from(close_nav).forEach(function (el) {
    el.addEventListener('click', function () {
      nav.classList.remove('show');
      nav.classList.add('show_reverse');
    });
  });

  window.addEventListener('scroll', function () {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
      nav.classList.add('show_reverse');
    }
  });
});

//TOPに戻るボタンの出現と消滅
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    const footer = document.querySelector('footer'); // footerが表示され始めたら消滅。

    // ボタンの出現位置（ページ上部からHero画像の高さ667pxスクロールしたら出現）
    const appearanceThreshold = 667;

    function handleScroll() {
        // 現在のスクロール位置
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // フッターの位置情報
        // getBoundingClientRect() はビューポートを基準とした要素の位置とサイズを返す。
        // top は要素の上端からの縦位置Y。
        // footer.getBoundingClientRect().top が window.innerHeight を超えている間はフッターは画面の外。
        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible = footerRect.top < window.innerHeight;

        // ボタンの表示/非表示ロジック
        if (scrollY > appearanceThreshold && !isFooterVisible) {
            // スクロール位置が出現値を超えてからフッターが画面内に出てくるまで
            backToTopButton.style.display = 'block'; // 表示の指示
        } else {
            // スクロール位置が閾値以下、またはフッターが画面内にある場合
            backToTopButton.style.display = 'none';
        }
    }

    // ページ読み込み時とスクロール時に実行
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期表示の状態を設定するため、ページ読み込み時にも一度実行
});

