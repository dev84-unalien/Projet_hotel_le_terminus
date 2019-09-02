$(document).ready(function() {

    let mail = '';
    let pass1 = '';
    let pass2 = '';
    let ausweis = 0;

        $('#validate').click(function() {

            ausweis = 0;
            mail = $('#usermail:text').val();
            pass1 = $('#userpass1:text').val();
            pass2 = $('#userpass2:text').val();

            if (mail == '') {$('#usermail').addClass('badentry'); ausweis = 0;}
            else {ausweis++; $('#usermail').removeClass('badentry');}
            if (pass1 == '') {$('#userpass1').addClass('badentry'); ausweis = 0;}
            else {ausweis++; $('#userpass1').removeClass('badentry');}
            if (pass2 == '') {$('#userpass2').addClass('badentry'); ausweis = 0;}
            else {ausweis++; $('#userpass2').removeClass('badentry');}

            if (ausweis == 3) {
                if (pass1 == pass2) {ausweis++}
                else {alert('Les deux Mdp ne sont pas identiques!');}
            }
            if (ausweis == 4) {
                cifammoniacal(mail, pass1, pass2);
            }
        });

    function cifammoniacal(cifemail, cifpassword, cifconfirmpwd) {

        $.ajax({
            url: "http://localhost/sign.php",
            type: 'POST',
            data: {email: cifemail, password: cifpassword, confirmPassword: cifconfirmpwd},
            success: monHandler,
            error: function () {
                alert("Something's rotten in the Kingdom... Cannot sign...");
            }
        });

        function monHandler (result) {
        alert(result);
        }
    }
});