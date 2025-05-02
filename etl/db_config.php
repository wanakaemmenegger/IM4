<?php

// Datenbankverbindungsparameter
$db_host = 'kr1sex.myd.infomaniak.com';
$db_name = 'kr1sex_trinkfit';
$db_user = 'kr1sex_admin';
$db_pass = '22Trj2PkBm.D!&';

$db_charset = "utf8";

// DSN (Datenquellenname) für PDO
$dsn = "mysql:host=$db_host;dbname=$db_name;charset=$db_charset";

// Optionen für PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
?>
