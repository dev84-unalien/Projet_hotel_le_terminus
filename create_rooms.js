$(document).ready(function() {

    let id = null;
    let superficie = null;
    let literie = '';
    let equipement = '';
    let fumeur = '';
    let parking = '';
    let vue = '';
    let bain = '';
    let descriptif = '';
    let photo ='';
    let tarif = null;
    let dispo = '';
    let ausweis = null;
    
        $('#validate').click(function() {

            ausweis = 0;
            superficie = $('#superficie').val();
            literie = $('#literie').val();
            equipement = $('#equipement').val();
            fumeur = $('#fumeur').val();
            parking = $('#parking').val();
            vue = $('#vue').val();
            bain = $('#bain').val();
            descriptif = $('#descriptif').val();
            photo = $('#photo').val();
            tarif = $('#tarif').val();
            dispo = $('#dispo').val();

            if (superficie == '') {$('#superficie').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#superficie').removeClass('badentry');}
            
            if (literie == '') {$('#literie').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#literie').removeClass('badentry');}
            
            if (equipement == '') {$('#equipement').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#equipement').removeClass('badentry');}

            if (fumeur == '') {$('#fumeur').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#fumeur').removeClass('badentry');}

            if (parking == '') {$('#parking').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#parking').removeClass('badentry');}

            if (vue == '') {$('#vue').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#vue').removeClass('badentry');}

            if (bain == '') {$('#bain').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#bain').removeClass('badentry');}

            if (descriptif == '') {$('#descriptif').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#descriptif').removeClass('badentry');}

            if (photo == '') {$('#photo').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#photo').removeClass('badentry');}

            if (tarif == '') {$('#tarif').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#tarif').removeClass('badentry');}

            if (dispo == '') {$('#dispo').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#dispo').removeClass('badentry');}

            if (ausweis == 11) {
                cifammoniacal(superficie, literie, equipement, fumeur, parking, vue, bain, descriptif, photo, tarif, dispo);
            }
                else {alert("Formulaire invalide, wtf, call the police!");}
        });

        function cifammoniacal(cifsup, ciflit, cifequ, ciffum, cifpar, cifvue, cifbai, cifdes, cifpho, ciftar, cifdis) {

            console.log(cifsup);
            console.log(ciflit);
            console.log(cifequ);
            console.log(ciffum);
            console.log(cifpar);
            console.log(cifvue);
            console.log(cifbai);
            console.log(cifdes);
            console.log(cifpho);
            console.log(ciftar);
            console.log(cifdis);

            $.ajax({
                url: "http://localhost/create_rooms.php",
                type: 'POST',
                data: {bcksup: cifsup, bcklit: ciflit, bckequ: cifequ, bckfum: ciffum, bckpar: cifpar, bckvue: cifvue, bckbai: cifbai, bckdes: cifdes, bckpho: cifpho, bcktar: ciftar, bckdis: cifdis},
                success: myHandler,
                error: function () {
                    alert("Something's rotten in the Kingdom... Impossible de créer la chambre...");
                }
            });

            function myHandler (result) {
                alert(result);
            }
        }
});