<?php
require_once("db_config.php");
header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

// Daten der letzten 7 Tage holen
$sql = "
  SELECT 
    DATE(zeit) as datum,
    DATE_FORMAT(zeit, '%a') as wochentag,
    ROUND(SUM(wert)/1000, 2) as summe
  FROM sensordata
  WHERE zeit >= CURDATE() - INTERVAL 6 DAY
  GROUP BY DATE(zeit)
  ORDER BY DATE(zeit)
";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Heute:
$heute = date('Y-m-d');

// Alle 7 Tage erzeugen (letzte 6 + heute)
$daten = [];
for ($i = 6; $i >= 0; $i--) {
    $datum = date('Y-m-d', strtotime("-$i day"));
    $match = array_filter($rows, fn($d) => $d['datum'] === $datum);
    $eintrag = array_values($match)[0] ?? null;

    $daten[] = [
        'wochentag' => strtoupper(date('D', strtotime($datum))),
        'summe' => $eintrag['summe'] ?? 0,
        'is_today' => $datum === $heute
    ];
}

echo json_encode($daten);
