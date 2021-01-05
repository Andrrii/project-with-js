<?php
$_POST = json_decode(file_get_contents("php://input"),true); //--- Для роботи з JSON
echo var_dump($_POST); /* бере дані Post запиту,перетворює
 їх в стрічку і показує на клієнті */