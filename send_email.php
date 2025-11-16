<?php
header('Content-Type: application/json');


$to = "andiikapratamaa7@gmail.com";
$subject = "Ada Pesan Baru dari Portfolio Website";

if (isset($_POST['Nama']) && isset($_POST['Email']) && isset($_POST['Pesan'])) {

$name = strip_tags(trim($_POST["Nama"]));
$email_from = filter_var(trim($_POST["Email"]), FILTER_SANITIZE_EMAIL);
$message = trim($_POST["Pesan"]);

if (empty($name) || !filter_var($email_from, FILTER_VALIDATE_EMAIL) || empty($message)) {
echo json_encode(['success' => false, 'message' => 'Mohon lengkapi semua field dengan benar.']);
exit;
}

$email_content = "Kamu menerima pesan baru dari form portfolio:\n\n";
$email_content .= "Nama Pengirim: $name\n";
$email_content .= "Email Pengirim: $email_from\n\n";
$email_content .= "Isi Pesan:\n$message\n";

$email_headers = "From: $name <$email_from>\r\n";
$email_headers .= "Reply-To: $email_from\r\n";
$email_headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $email_content, $email_headers)) {
echo json_encode(['success' => true, 'message' => 'Pesan berhasil terkirim! Saya akan segera balas.']);
} else {
echo json_encode(['success' => false, 'message' => 'Maaf, pesan gagal terkirim. Coba lagi nanti ya.']);
}

} else {
echo json_encode(['success' => false, 'message' => 'Akses tidak valid.']);
}
?>
