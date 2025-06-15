<?php
/*
 * Dieses Skript empfängt JSON-Daten vom Microcontroller per HTTP POST
 * und speichert die darin enthaltenen Werte in die Datenbanktabelle "sensordata".
 * 
 * Zusätzlich wird der empfangene JSON-String für Debug-Zwecke in eine Datei geschrieben.
 * Das Skript nutzt die in db_config.php definierten Zugangsdaten zur Herstellung der DB-Verbindung.
 */


require_once("db_config.php");
echo "This script receives HTTP POST messages and pushes their content into the database.";

$inputJSON = file_get_contents('php://input');
file_put_contents("debug.txt", $inputJSON); // Debug-Datei erstellen
$input = json_decode($inputJSON, true);

if (json_last_error() === JSON_ERROR_NONE) {
    file_put_contents("debug.txt", "Dekodiert: " . print_r($input, true), FILE_APPEND);
}

###################################### connect to db
try{
    $pdo = new PDO($dsn, $db_user, $db_pass, $options); 
    echo "</br> DB Verbindung ist erfolgreich";
}
catch(PDOException $e){
    error_log("DB Error: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
}

###################################### Empfangen der JSON-Daten

$inputJSON = file_get_contents('php://input'); // JSON-Daten aus dem Body der Anfrage
$input = json_decode($inputJSON, true); // Dekodieren der JSON-Daten in ein Array



###################################### Prüfen, ob die JSON-Daten erfolgreich dekodiert wurden

###################################### receiving a post request from a HTML form, later from ESP32 C6

$wert = $input["wert"];
# insert new user into db
$sql = "INSERT INTO sensordata (wert) VALUES (?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$wert]);
//$stmt->execute(["42"]);


?>