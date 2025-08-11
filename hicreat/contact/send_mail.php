<?php
session_start();
ob_start();
session_start();

// ===== 設定（要変更）=====
$adminTo           = 'r*******@******.**';
$fromAddress       = 'no-reply@*******.*******.***.**';
$fromName          = 'サイトお問い合わせ';
$siteName          = 'ポートフォリオサイト';
$recaptchaSecret   = '6Lc************************************0G';
$useEnvelopeSender = true;
// ==========================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: contact.php'); exit; }

// CSRF
if (empty($_POST['csrf_token']) || empty($_SESSION['csrf_token']) ||
    !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
  http_response_code(400); exit('不正なリクエストです。');
}

// honeypot
if (!empty($_POST['website'])) { http_response_code(400); exit('不正な送信を検出しました。'); }

// return URL（同一ホストのみ）
$defaultReturn = '/';
$return = $_POST['return'] ?? '';
$parsed = parse_url($return);
$sameHost = isset($parsed['host']) ? ($parsed['host'] === $_SERVER['HTTP_HOST']) : true;
$returnSafe = $sameHost ? $return : $defaultReturn;

// 取り出し & バリデーション
$raw_name    = $_POST['name']    ?? '';
$raw_email   = $_POST['email']   ?? '';
$raw_message = $_POST['message'] ?? '';
$name  = trim(mb_substr(preg_replace('/[\x00-\x1F\x7F]/u','',$raw_name),0,100));
$email = filter_var(trim($raw_email), FILTER_SANITIZE_EMAIL);
$msg   = trim(mb_substr($raw_message,0,4000));

$errors=[];
if($name==='') $errors[]='お名前は必須です。';
if(!filter_var($email,FILTER_VALIDATE_EMAIL)) $errors[]='メールアドレスの形式が正しくありません。';
if($msg==='') $errors[]='お問い合わせ内容は必須です。';
if($errors){ http_response_code(400); echo implode('<br>',array_map('htmlspecialchars',$errors)); exit; }

// reCAPTCHA
$recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';
if($recaptchaResponse===''){ http_response_code(400); exit('reCAPTCHA を完了してください。'); }
$verify = recaptchaVerify($recaptchaSecret,$recaptchaResponse);
if(empty($verify['success'])){ http_response_code(400); exit('reCAPTCHA 検証に失敗しました。'); }

// ===== メール作成（文字化け対策を反映）=====
mb_language('Japanese');
mb_internal_encoding('UTF-8');

// From / Reply-To ヘッダ
$fromHeader = 'From: ' . mb_encode_mimeheader($fromName, 'UTF-8') . " <{$fromAddress}>\r\n";
$replyTo    = "Reply-To: {$email}\r\n";

// ヘッダ（UTF-8 + 8bit）
$headers = $fromHeader .
           $replyTo .
           "MIME-Version: 1.0\r\n" .
           "Content-Type: text/plain; charset=UTF-8\r\n" .
           "Content-Transfer-Encoding: 8bit\r\n";

// 件名（MIMEエンコード）
$subject = "【お問い合わせ】{$name} 様より";

// 本文
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$time = date('Y-m-d H:i:s');

$body = <<<TXT
{$siteName} にお問い合わせがありました。

[お名前]
{$name}

[メールアドレス]
{$email}

[内容]
{$msg}

---
送信元IP: {$ip}
送信時刻: {$time}
TXT;

// 送信
$envelope = $useEnvelopeSender ? "-f {$fromAddress}" : null;
$ok = mb_send_mail($adminTo, $subject, $body, $headers, $envelope);

// 結果
if ($ok) {
  unset($_SESSION['csrf_token']);

  // 絶対URLを作る
  $scheme   = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
  $location = $scheme . '://' . $_SERVER['HTTP_HOST']
            . '/hicreat/contact/thanks.php?return=' . rawurlencode($returnSafe);

  // 出力を捨てて、POST→GET の 303 で確実にリダイレクト
  while (ob_get_level()) { ob_end_clean(); }
  header('Location: ' . $location, true, 303);

  // 念のためのフォールバック
  echo '<noscript><meta http-equiv="refresh" content="0;url='
       . htmlspecialchars($location, ENT_QUOTES) . '"></noscript>';
  echo '<script>location.replace(' . json_encode($location) . ')</script>';
  exit;
} else {
  http_response_code(500);
  echo '送信に失敗しました。しばらくしてからもう一度お試しください。';
  exit;
}

// reCAPTCHA verify
function recaptchaVerify(string $secret, string $response): array{
  $ch=curl_init('https://www.google.com/recaptcha/api/siteverify');
  curl_setopt_array($ch,[
    CURLOPT_POST=>true,
    CURLOPT_POSTFIELDS=>http_build_query(['secret'=>$secret,'response'=>$response,'remoteip'=>$_SERVER['REMOTE_ADDR']??null]),
    CURLOPT_RETURNTRANSFER=>true,
    CURLOPT_TIMEOUT=>10,
  ]);
  $res=curl_exec($ch);
  if($res===false) return ['success'=>false];
  $data=json_decode($res,true);
  return is_array($data)?$data:['success'=>false];
}
