<?php

// Récupération des données de la requête AJAX du formulaire de 'create_rooms.html'

$superficie = $_POST['bcksup'];
$literie = $_POST['bcklit'];
$equipement = $_POST['bckequ'];
$fumeur = $_POST['bckfum'];
$parking = $_POST['bckpar'];
$vue = $_POST['bckvue'];
$bain = $_POST['bckbai'];
$descriptif = $_POST['bckdes'];
$photo = $_POST['bckpho'];
$tarif = $_POST['bcktar'];
$dispo = $_POST['bckdis'];

// Vérification de ce que toutes les données ont été transmises

if (!$superficie || !$literie || !$equipement || !$fumeur || !$parking || !$vue
 || !$bain || !$descriptif || !$photo || !$tarif || !$dispo) {
    echo "Il manque des éléments dans le formulaire de création des chambres!";
    exit(); // Le programme prend fin
}

// Vérification de ce que $superficie contient bien une valeur numérique dans la bonne tranche

if (!filter_var($superficie, FILTER_VALIDATE_INT) || filter_var($superficie, FILTER_VALIDATE_INT) < 10 
|| filter_var($superficie, FILTER_VALIDATE_INT) > 200) {
    echo "La superficie doit être comprise en 10 et 200 m2, pour mémoire!";
    exit(); // Le programme prend fin
}

// Vérification de ce que $tarif contient bien une valeur numérique dans la bonne tranche

if (!filter_var($tarif, FILTER_VALIDATE_INT) || filter_var($tarif, FILTER_VALIDATE_INT) < 1 
|| filter_var($tarif, FILTER_VALIDATE_INT) > 9999) {
    echo "Le tarif doit être compris entre 1 et 9999 €, poisson rouge!";
    exit(); // Le programme prend fin
}

// Vérification de ce que $fumeur contient bien 'oui' ou 'non', et rien d'autre

if (!$fumeur === 'oui' || !$fumeur === 'non') {
    echo "Chambre fumeur, c'est 'oui' ou 'non', et rien d'autre, fouchtra!";
    exit(); // Le programme prend fin
}

// Vérification de ce que $parking contient bien 'oui' ou 'non', et rien d'autre

if (!$parking === 'oui' || !$parking === 'non') {
    echo "Parking présent, c'est 'oui' ou 'non', et rien d'autre, cuistre!";
    exit(); // Le programme prend fin
}

// Vérification de ce que $dispo contient bien 'oui' ou 'non', et rien d'autre

if (!$dispo === 'oui' || !$dispo === 'non') {
    echo "Chambre disponible, c'est 'oui' ou 'non', et rien d'autre, vilain(e)!";
    exit(); // Le programme prend fin
}

// Vérification et nettoyage de $photo, qui doit contenir une url valide

$photo = filter_var($photo, FILTER_SANITIZE_URL);
if (!filter_var($photo, FILTER_VALIDATE_URL)) {
    echo "L'url pour la photo de la chambre n'est pas valide, 'bécile!";
    exit(); // Le programme prend fin
}

// Nettoyage des variables contenant du texte libre

$literie = filter_var($literie, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
$equipement = filter_var($equipement, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
$vue = filter_var($vue, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
$bain = filter_var($bain, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
$descriptif = filter_var($descriptif, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

// Etablissement d'une connexion à la base de données

$connex = new mysqli("localhost", "root", "", "terminus");

// Préparation de la requête SQL

$requete = $connex->prepare("INSERT INTO room (superficie, literie, equipement, fumeur, 
parking, vue, bain, descriptif, photo, tarif, dispo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

// Renseignement des valeurs dynamiques de la requête

$requete->bind_param("issssssssis", $superficie, $literie, $equipement, $fumeur, $parking, 
$vue, $bain, $descriptif, $photo, $tarif, $dispo);

// Exécution de la requête

$requete->execute();

// Fermeture de la requête et de la connexion

$requete->close();
$connex->close();

echo "La nouvelle chambre a bien été enregistrée dans la base de données!";

?>