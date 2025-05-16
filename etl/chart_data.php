<?php
require_once("load.php");

try {
  $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch(PDOException $e){
  http_response_code(500);
  echo json_encode(["error" => "DB-Verbindung fehlgeschlagen"]);
  exit;
}

// Aggregiere Trinkmenge nach Wochentag (0=So ... 6=Sa)
$sql = "
  SELECT 
    DATE_FORMAT(timestamp, '%w') AS wochentag_num,
    DATE_FORMAT(timestamp, '%a') AS wochentag,
    ROUND(SUM(wert)/1000, 2) AS summe
  FROM sensordata
  WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)
  GROUP BY wochentag_num
  ORDER BY wochentag_num ASC
";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Wochentage auffüllen, falls nicht alle vorhanden sind
$tage = ['So','Mo','Di','Mi','Do','Fr','Sa'];
$vollständig = [];
foreach ($tage as $index => $tag) {
  $match = array_values(array_filter($data, fn($d) => $d['wochentag_num'] == $index));
  $vollständig[] = [
    'wochentag' => strtoupper($tag),
    'summe' => $match[0]['summe'] ?? 0
  ];
}

header('Content-Type: application/json');
echo json_encode($vollständig);
