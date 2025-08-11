<?php
session_start();
if (empty($_SESSION['csrf_token'])) $_SESSION['csrf_token']=bin2hex(random_bytes(32));
$csrf = $_SESSION['csrf_token'];

$defaultReturn = '/';
$return = $_GET['return'] ?? '';
$parsed = parse_url($return);
$sameHost = isset($parsed['host']) ? ($parsed['host'] === $_SERVER['HTTP_HOST']) : true;
$returnSafe = $sameHost ? $return : $defaultReturn;
?>
<!DOCTYPE html><html lang="ja"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>ご連絡・お問い合わせ</title>
<link rel="stylesheet" href="contact.css">
</head><body>
  <h1>ご連絡・お問い合わせ</h1>
  <form id="contactForm" action="send_mail.php" method="post" novalidate>
    <input type="hidden" name="return" value="<?=htmlspecialchars($returnSafe,ENT_QUOTES)?>">
    <input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf,ENT_QUOTES)?>">
    <label>お名前<input id="name" name="name" type="text" maxlength="100" required></label><div id="err_name" class="error"></div>
    <label>メールアドレス<input id="email" name="email" type="email" maxlength="200" required></label><div id="err_email" class="error"></div>
    <label>ご連絡・お問い合わせ内容<textarea id="message" name="message" rows="6" maxlength="4000" required></textarea></label><div id="err_message" class="error"></div>
    <div class="hidden-hp" aria-hidden="true"><label>空欄にしてください<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="g-recaptcha" data-sitekey="6Lcl******************************ujmR"></div>
    <button type="submit">送信</button>
  </form>
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<script src="contact.js" defer></script>
</body></html>
