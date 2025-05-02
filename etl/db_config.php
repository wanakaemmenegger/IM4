<?php
/***********************************************************************
 * Kapitel 13: Microcontroller -> DB 
 * db_config.php
 * Datenbank-Verbindung
 * Ersetze $db_host, $db_name, $db_user, $db_pass durch deine eigenen Daten. 
 * Lade diese Datei NICHT auf GitHub
 * Beispiel: https://fiessling.ch/im4/13_MC2DB/db_config.php
 * GitHub: https://github.com/Interaktive-Medien/im_physical_computing/blob/main/13_MC2DB/db_config.php_template
 ***********************************************************************/

$db_host = "kr1sex.myd.infomaniak.com";  // Infomaniak z. B. "rv9w2f.myd.infomaniak.com", beim FHGR Edu-Server und xampp steht hier "localhost"
$db_name = "kr1sex_trinkfit";                   // Infomaniak z. B. "rv9w2f_fiessling", Edu-Server: "650665_4_1", xampp: "sensor2website"
$db_user = "kr1sex_admin";               // Infomaniak z. B. "rv9w2f_fiessling", Edu-Server: "650665_4_1", xampp: "root"
$db_pass = "22Trj2PkBm.D!&";               // xampp: ""

$db_charset = "utf8";

$dsn = "mysql:host=$db_host;dbname=$db_name;charset=$db_charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
?>
