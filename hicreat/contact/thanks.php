<?php
session_start();

$siteName = 'ポートフォリオサイト';
$topUrl   = 'https://ss542909.stars.ne.jp/hicreat/'; // ここだけ直せばOK
?>
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>送信完了 | <?= htmlspecialchars($siteName, ENT_QUOTES, 'UTF-8') ?></title>
</head>
<body>
  <main>
    <h1>送信が完了しました</h1>
    <p>ご連絡・お問い合わせありがとうございました。</p>
    <p><a href="<?= htmlspecialchars($topUrl, ENT_QUOTES, 'UTF-8') ?>">トップへ戻る</a></p>
  </main>
</body>
</html>
