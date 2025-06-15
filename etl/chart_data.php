<?php
/*
 * Dieses Skript stellt zwei Datenauswertungen aus der Tabelle "sensordata" als JSON bereit:
 * 1. Wochenverlauf: Tageswerte der letzten 7 Tage (inkl. heute) mit Datum, Wochentag und Verbrauchssumme.
 * 2. Tagesfortschritt: Verbrauchsmenge des aktuellen Tages.
 * 
 * Die Daten werden für eine grafische Darstellung aufbereitet.
 */
require_once("db_config.php");
header('Content-Type: application/json');

try {
  $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
  echo json_encode(["status" => "error", "message" => "DB connection failed"]);
  exit;
}

// Wochenverlauf (letzte 7 Tage, inkl. heute)
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

// Tagesfortschritt (heute)
$sql2 = "
  SELECT ROUND(SUM(wert)/1000, 2) AS liter
  FROM sensordata
  WHERE DATE(zeit) = CURDATE()
";
$stmt2 = $pdo->prepare($sql2);
$stmt2->execute();
$row2 = $stmt2->fetch();

$heute = date('Y-m-d');
$tage = [];
for ($i = 6; $i >= 0; $i--) {
  $datum = date('Y-m-d', strtotime("-$i day"));
  $match = array_filter($rows, fn($r) => $r['datum'] === $datum);
  $e = array_values($match)[0] ?? null;
  $tage[] = [
    'wochentag' => strtoupper(date('D', strtotime($datum))),
    'summe' => $e['summe'] ?? 0,
    'is_today' => $datum === $heute
  ];
}

// Ausgabe als ein JSON-Objekt
echo json_encode([
  'wochenverlauf' => $tage,
  'heute' => [
    'menge' => $row2['liter'] ?? 0,
    'ziel' => 2.0
  ]
]);
